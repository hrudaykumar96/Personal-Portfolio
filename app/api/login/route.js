import DbConnection from "@/app/utils/config/DbConnection";
import User from "@/app/utils/models/Users";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import crypto from "crypto";

export async function POST(req) {
  try {
    await DbConnection();
    const { email, password } = await req.json();

    const user = await User.findOne({ email });
    if (!user) return NextResponse.json({ emailError: 'Email not registered' });

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) return NextResponse.json({ passwordError: 'Incorrect Password' });

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
      subject: 'Login Verification',
      html: `
    <html>
      <body style="font-family: Arial, sans-serif; color: #333;">
        <div style="text-align: center;">
          <img src="${process.env.NEXT_PUBLIC_FRONTEND_URL}/logo.webp" alt="Logo" style="width: 150px; height: auto; margin-bottom: 20px;" />
        </div>
        <h2 style="color: #4CAF50;">Hello ${user.name},</h2>
        <p>Your OTP code is: <strong style="font-size: 18px; color: #4CAF50;">${otp}</strong></p>
        <p style="font-size: 16px;">Use this code to complete your login.</p>
        <p style="font-size: 14px; color: #888;">Please note: Your OTP is valid for 5 minutes only.</p>
        <p style="color: #888;">If you did not request this, please ignore this message.</p>
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