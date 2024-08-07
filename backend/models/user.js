const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const validator = require("validator")
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        required: [true, "Please provide your email!"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email"]
    },
    password: {
        type: String,
        required: [true, "Please provide a password!"],
        minlength: 8,
        select: false
    },
    phone: { type: String, required: true },
    role: { type: String, enum: ["client", "laywer", "admin"], default: "client" },
    is_active: { type: Boolean, default: true },
    specialization: {
        type: String,
        required: function () {
            return this.role === 'laywer';
        }
    },
    location: {
        type: String,
        required: function () {
            return this.role === 'laywer';
        }
    },
    photo: { type: String, default: "images\\profile.jpg" },
    cases: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Case',
        validate: {
            validator: async function (v) {
                const casee = await mongoose.model('Case').findById(v);
                return casee !== null;
            },
            message: props => `${props.value} is not a valid case ID`
        }
    }],
}, { timestamps: true })
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 12)
    next()
})
userSchema.pre("findOneAndUpdate", async function (next) {
    if (!this._update.password) return next(); // If password is not modified, skip hashing
    try {
        const hashedPassword = await bcrypt.hash(this._update.password, 12);
        this._update.password = hashedPassword; // Replace plain password with hashed password
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword)
}

module.exports = mongoose.model("User", userSchema)
