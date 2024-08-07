const User = require("../models/user");
const express = require("express")
const multer = require("multer");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const UserOTP = require("../models/otp");
const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
const storageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images")
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1]
        cb(null, `user-${Date.now()}.${ext}`)
    }
})
const filterObj = (obj, ...allowedFields) => {
    const newObj = {}
    Object.keys(obj).forEach((el) => {
        if (allowedFields.includes(el)) newObj[el] = obj[el]
    })
    return newObj
}
const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true)
    } else {
        cb(new AppError("Not an image! Please upload only images", 400), false)
    }
}
const upload = multer({
    storage: storageEngine,
    fileFilter: multerFilter
})

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.json({ data: users, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/signup", async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }
        const newUser = await User.create(req.body);
        // await sendSignupEmail(sanitizedName, sanitizedEmail, sanitizedRole, sanitizedPassword);
        res.status(201).json({ data: newUser, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email }).select("+password");
        if (!user) {
            return res.status(404).json({ error: "User with the specified email not registered" });
        }
        if (!user.is_active) {
            return res.status(403).json({ error: "User account is not active!" });
        }
        const passwordMatch = await bcrypt.compare(req.body.password, user.password || "");
        if (!passwordMatch) {
            return res.status(401).json({ error: "Incorrect password" });
        }
        req.session.authenticated = true;
        req.session.user = user;
        res.json(req.session);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

router.get("/logout", async (req, res) => {
    try {
        if (!req.session.authenticated) {
            return res.json({ message: "No active session to logout from" });
        }
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ error: "Failed to logout" });
            }
            res.json({ message: "Logout successful" });
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.route("/getSessionData", async (req, res) => {
    try {
        const user = req.session.user;
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const sendSignupEmail = async (name, email, role, password) => {
    let message = `
        Subject: Welcome to Legal Aid Center - Account Created Successfully

        Dear ${name},

        We are delighted to welcome you to the Legal Aid Center (LAC), where our mission is to provide accessible and professional legal support to those in need.

        Your account has been successfully created, and you are now ready to access our platform. Here, you can manage your cases, communicate with your assigned legal advisor, and track the progress of your legal matters.

        ${role === 'lawyer' ? `
        As a legal advisor, you will have access to tools and features designed to assist you in providing expert legal counsel. Please find your login details below:

            Email: ${email}
            Password: ${password}
            ` : ''}

        Please ensure that you keep your account details secure and do not share your password with anyone.

        If you have any questions or require assistance, our support team is here to help. You can reach us at support@legalcenter.com.

        Thank you for joining the Legal Aid Center. We look forward to supporting you in your legal endeavors.

        Best regards,

        The Legal Aid Center Team
    `;
    if (role === 'lawyer') {
        message += `\n\nYour login details:\nEmail: ${email}\nPassword: ${password}`;
    }
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Account Created',
        text: message
    };
    await transporter.sendMail(mailOptions);
};

const sendOTPMail = async (id, email) => {
    try {
        const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "OTP verification for logging in to MedShield",
            html: `<p>Enter <b>${otp}</b> in the website to verify your email address.</p><p>This code expires in <b>5 minutes</b></p>`
        };
        const hashedOTP = await bcrypt.hash(otp, 10);
        const OTPVerification = await new UserOTP({
            user: id,
            otp: hashedOTP,
            createdAt: Date.now(),
            expiresAt: Date.now() + 300000
        });
        await OTPVerification.save();
        await transporter.sendMail(mailOptions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

router.route("/verifyOTP", async (req, res) => {
    try {
        let { user, otp } = req.body;
        if (!user || !otp) throw Error("Empty otp details not allowed!");
        const userOTP = await UserOTP.find({ user });
        if (userOTP.length <= 0) throw new Error("Account record does not exist or has been verified already!");
        const { expiresAt } = userOTP[0].expiresAt;
        const hashedOTP = userOTP[0].otp;
        if (expiresAt < Date.now()) {
            await UserOTP.deleteMany({ user });
            throw new Error("Code has expired. Please login again!");
        } else {
            const valid = await bcrypt.compare(otp, hashedOTP);
            if (!valid) throw new Error("Invalid OTP. Check your email!")
            await UserOTP.deleteMany({ user });
            res.json({ message: "OTP verified successfully" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.route("/:id")
    .get(async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            res.json({ data: user, status: "success" })
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    })
    .put(upload.single("photo"), async (req, res) => {
        try {
            const filteredBody = filterObj(req.body, "name", "email", "password", "phone", "role", "is_active", "cases", "location")
            if (req.file) {
                filteredBody.photo = req.file.path
            }
            const updatedUser = await User.findByIdAndUpdate(req.params.id, filteredBody, { new: true, runValidators: true })
            res.json({ data: updatedUser, status: "success" })
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    })
    .delete(async (req, res) => {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            res.json({ data: user, status: "success" })
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    });

module.exports = router