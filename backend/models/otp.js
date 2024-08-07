const mongoose = require("mongoose");

const userOTPSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        otp: { type: String, required: true },
        createdAt: { type: Date, required: true },
        expiresAt: { type: Date, required: true },
    }
);

const UserOTP = mongoose.model("UserOTP", userOTPSchema);
module.exports = UserOTP;