import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserOTPVerificationSchema = new Schema({
    userId: String,
    otp: String,
    createdAt: Date,
    expiresAt: Date,
});

export default mongoose.model("UserOTPVerification", UserOTPVerificationSchema);