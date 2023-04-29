import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { regGmail, regPassword } from '../constants/regex';

import User from '../models/User';
import UserOTPVerification from '../models/UserOTPVerification';

import { config } from 'dotenv';
config();

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});

transporter.verify((error :  any, success : any) => {
    if(error) {
        console.log(error)
    }
});

export const signin = async (req : any, res : any) => {
    const { email, password } = req.body;
    
    try {
        const existingUser = await User.findOne({ email });

        if(!existingUser) {
            return res.status(404).json({ message: `User doesn't exist.` });
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid password.' });
        }

        const secret = process.env.OAUTH_SECRET;
        
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, secret!, { expiresIn: '1h' });

        res.status(200).json({ result: existingUser, token })
    } catch(error) {
        res.status(500).json({ message: 'Something went wrong.' });
    }
}

export const signup = async (req : any, res : any) => {
    const { email, password, confirmPassword, firstName, lastName} = req.body;

    try {
        const existingUser = await User.findOne({ email });
        
        
        if(existingUser) {
            return res.status(400).json({ message: `User already exist.` });
        }
        
        if(!regGmail.test(email)) {
            return res.status(400).json({ message: 'Invalid email' })
        }

        if(!regPassword.test(password)) {
            return res.status(400).json({ message: 'Invalid password' })
        }

        if(password !== confirmPassword) {
            return res.status(400).json({ message: `Passwords don't match.` });
        }


        const hashPassword = await bcrypt.hash(password, 12);

        const result = await User.create({ email, password: hashPassword, name: `${firstName} ${lastName}`, verified: false});


        sendOTPVerificationEmail(result._id, result.email, result.name, res);

        const secret = process.env.OAUTH_SECRET;
        
        const token = jwt.sign({ email: result.email, id: result._id }, secret!, { expiresIn: '1h' });

        res.status(200).json({ result, token });
    } catch(error) {
        res.status(500).json({ message: 'Something went wrong.' });
    }
};

export const sendOTPVerificationEmail = async (_id : any, email : any, name : any, res : any) => {
    try {
        const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

        const mailOptions = {
            from: process.env.AUTH_EMAIL,
            to: email,
            subject: "Verify Your Email",
            html: `<html>
                        <head>
                            <style>
                                .banner-color {
                                background-color: #eb681f;
                                }
                                .title-color {
                                color: #0066cc;
                                }
                                .button-color {
                                background-color: #0066cc;
                                }
                                @media screen and (min-width: 500px) {
                                .banner-color {
                                background-color: #0066cc;
                                }
                                .title-color {
                                color: #eb681f;
                                }
                                .button-color {
                                background-color: #eb681f;
                                }
                                }
                            </style>
                        </head>
                        <body>
                            <div style="background-color:#ececec;padding:0;margin:0 auto;font-weight:200;width:100%!important">
                                <table align="center" border="0" cellspacing="0" cellpadding="0" style="table-layout:fixed;font-weight:200;font-family:Helvetica,Arial,sans-serif" width="100%">
                                    <tbody>
                                    <tr>
                                        <td align="center">
                                            <center style="width:100%">
                                                <table bgcolor="#FFFFFF" border="0" cellspacing="0" cellpadding="0" style="margin:0 auto;max-width:512px;font-weight:200;width:inherit;font-family:Helvetica,Arial,sans-serif" width="512">
                                                <tbody>
                                                    <tr>
                                                        <td bgcolor="#F3F3F3" width="100%" style="background-color:#f3f3f3;padding:12px;border-bottom:1px solid #ececec">
                                                            <table border="0" cellspacing="0" cellpadding="0" style="font-weight:200;width:100%!important;font-family:Helvetica,Arial,sans-serif;min-width:100%!important" width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td align="left" valign="middle" width="50%"><span style="margin:0;color:#4c4c4c;white-space:normal;display:inline-block;text-decoration:none;font-size:12px;line-height:20px"><b>Listener</b></span></td>
                                                                    <td width="1">&nbsp;</td>
                                                                </tr>
                                                            </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td align="left">
                                                            <table border="0" cellspacing="0" cellpadding="0" style="font-weight:200;font-family:Helvetica,Arial,sans-serif" width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td width="100%">
                                                                        <table border="0" cellspacing="0" cellpadding="0" style="font-weight:200;font-family:Helvetica,Arial,sans-serif" width="100%">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td align="center" bgcolor="#8BC34A" style="padding:20px 48px;color:#ffffff" class="banner-color">
                                                                                    <table border="0" cellspacing="0" cellpadding="0" style="font-weight:200;font-family:Helvetica,Arial,sans-serif" width="100%">
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td align="center" width="100%">
                                                                                                <h1 style="padding:0;margin:0;color:#ffffff;font-weight:500;font-size:20px;line-height:24px">Verify your email</h1>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td align="center" style="padding:20px 0 10px 0">
                                                                                    <table border="0" cellspacing="0" cellpadding="0" style="font-weight:200;font-family:Helvetica,Arial,sans-serif" width="100%">
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td align="center" width="100%" style="padding: 0 15px;text-align: justify;color: rgb(76, 76, 76);font-size: 12px;line-height: 18px;">
                                                                                                <h3 style="font-weight: 600; padding: 0px; margin: 0px; font-size: 16px; line-height: 24px; text-align: center;" class="title-color">Hi ${name},</h3>
                                                                                                <p style="margin: 20px 0 30px 0;font-size: 15px;text-align: center;">You're trying to register on our platform, please enter code below into our website so we can verify it's you!</b>!</p>
                                                                                                <div style="font-weight: 200; text-align: center; margin: 25px;"><a style="padding:0.6em 1em;border-radius:600px;color:#ffffff;font-size:14px;text-decoration:none;font-weight:bold" class="button-color">${otp}</a></div>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                            </tr>
                                                                            <tr>
                                                                            </tr>
                                                                        </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td align="left">
                                                            <table bgcolor="#FFFFFF" border="0" cellspacing="0" cellpadding="0" style="padding:0 24px;color:#999999;font-weight:200;font-family:Helvetica,Arial,sans-serif" width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td align="center" width="100%">
                                                                        <table border="0" cellspacing="0" cellpadding="0" style="font-weight:200;font-family:Helvetica,Arial,sans-serif" width="100%">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td align="center" valign="middle" width="100%" style="border-top:1px solid #d9d9d9;padding:12px 0px 20px 0px;text-align:center;color:#4c4c4c;font-weight:200;font-size:12px;line-height:18px">Regards,
                                                                                    <br><b>The Awesome Team</b>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td align="center" width="100%">
                                                                        <table border="0" cellspacing="0" cellpadding="0" style="font-weight:200;font-family:Helvetica,Arial,sans-serif" width="100%">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td align="center" style="padding:0 0 8px 0" width="100%"></td>
                                                                            </tr>
                                                                        </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                                </table>
                                            </center>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </body>
                    </html>`
        }

        const saltRounds = 10;

        const hashedOTP = await bcrypt.hash(otp, saltRounds);
        const newOTPVerification = await new UserOTPVerification({
            userId: _id,
            otp: hashedOTP,
            createdAt: Date.now(),
            expiresAt: Date.now() + 360000,
        });

        await newOTPVerification.save();
        await transporter.sendMail(mailOptions);
    } catch(error) {
        console.log(error);
    }
};