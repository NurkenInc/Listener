import UserOTPVerification from "../models/UserOTPVerification";
import bcrypt from 'bcrypt';
import User from "../models/User";
import { sendOTPVerificationEmail } from './user';

async function resendOTPVerificationCode(req : any, res : any) {
  try {
      let { userId, email, name } = req.body;

      if(!userId || !email) {
          throw new Error("Empty code details are not allowed");
      } else {
          await UserOTPVerification.deleteMany({ userId });
          sendOTPVerificationEmail(userId, email, name, res);
      }
  } catch(error) {
      res.json({
          status: "FAILED",
          message: "Email verification failed. Please try again!",
      });
  }
}

export default resendOTPVerificationCode;