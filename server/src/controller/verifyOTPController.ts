import UserOTPVerification from "../models/UserOTPVerification";
import bcrypt from 'bcrypt';
import User from "../models/User";

export async function verifyOTPController(req : any, res : any) {
    try {
        let { userId, otp } = req.body;

        if(!userId || !otp) {
            throw new Error("Empty code details are not allowed");
        } else {
            const UserOTPVerificationRecords = await UserOTPVerification.find({
                userId,
            });
            if(await UserOTPVerificationRecords.length <= 0) {
                throw new Error(
                    "Account record doesn't exist or has been verified already. Please sign up or log in"
                );
            } else {
                const { expiresAt } = UserOTPVerificationRecords[0];

                const hashedOTP = UserOTPVerificationRecords[0].otp;

                if(expiresAt!.getTime() <  Date.now()) {
                    await UserOTPVerification.deleteMany({ userId });
                    throw new Error("Code has expired. Please request again.");
                } else {
                    const validOTP = await bcrypt.compare(otp, hashedOTP!.toString());

                    if(!validOTP) {
                        throw new Error("Invalid code passed. Check your inbox");
                    } else {
                        await User.updateOne({ _id: userId }, { verified: true });
                        UserOTPVerification.deleteMany({ userId });
                        res.json({
                            status: "VERIFIED",
                            message: "User email verified successfully.",
                        })
                    }
                }
            }
        }

    } catch (error) {
        res.json({
            status: "FAILED",
            message: "Email verification failed. Please try again!",
        })
    }
}