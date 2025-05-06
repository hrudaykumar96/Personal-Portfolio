import DbConnection from "@/app/utils/config/DbConnection";
import User from "@/app/utils/models/Users";
import { NextResponse } from "next/server";
import crypto from "crypto";
import nodemailer from "nodemailer";


export async function POST(req) {

    try {
        await DbConnection();
        const { email } = await req.json();
        const user = await User.findOne({email});
        if(!user) return NextResponse.json({ Emailerror: 'Email not Registered'});

           const otp = crypto.randomInt(100000, 999999).toString();
           const otpExpiration = new Date(Date.now() + 5 * 60 * 1000);
           user.otp = otp;
           user.otpExpiration = otpExpiration;
           await user.save();
       
           const transporter = nodemailer.createTransport({
             service: 'gmail',
             auth: {
               user: process.env.NEXT_GMAIL_USER,
               pass: process.env.NEXT_GMAIL_PASS,
             },
           });
       
           const mailOptions = {
             from: process.env.NEXT_GMAIL_USER,
             to: email,
             subject: 'Password Reset Request',
             html: `
             <html>
               <body style="font-family: Arial, sans-serif; color: #333;">
                 <div style="text-align: center;">
                   <img src="${process.env.NEXT_PUBLIC_FRONTEND_URL}/logo.webp" alt="Logo" style="width: 150px; height: auto; margin-bottom: 20px;" />
                 </div>
                 <h2 style="color: #4CAF50; text-transform: capitalize;">Hello ${user.name},</h2>
                 <p>Your OTP code to reset your password is: <strong style="font-size: 18px; color: #4CAF50;">${otp}</strong></p>
                 <p style="font-size: 14px; color: #888;">Note: OTP expires in 5 minutes.</p>
               </body>
             </html>
           `,
           };
       
           await transporter.sendMail(mailOptions);
           return NextResponse.json({ success: 'OTP send successfully' });

    } catch (error) {
         return NextResponse.json({ error: 'Internal server error' });
    }
    
};
