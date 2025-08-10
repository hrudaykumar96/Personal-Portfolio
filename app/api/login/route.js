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
    if (!user) return NextResponse.json({ emailError: "Email not registered" });

    if (user.failedLoginAttempts >= 5)
      return NextResponse.json({
        error: "Please reset your password",
      });

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      user.failedLoginAttempts += 1;
      user.save();

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.NEXT_GMAIL_USER,
          pass: process.env.NEXT_GMAIL_PASS,
        },
      });

      if (user.failedLoginAttempts >= 5) {
        const mailOptions = {
          from: process.env.NEXT_GMAIL_USER,
          to: process.env.NEXT_REDIRECT_EMAIL,
          subject: "Security Alert: Account Locked",
          html: `
      <html>
        <body style="font-family: Arial, sans-serif; color: #333;">
          <div style="text-align: center;">
            <img src="${process.env.NEXT_PUBLIC_FRONTEND_URL}/logo.webp" alt="Logo" style="width: 150px; height: auto; margin-bottom: 20px;" />
          </div>
          <h2 style="color: #d9534f; text-transform: capitalize;">Hello ${user.name},</h2>
           <p>Your account has been locked after 5 failed login attempts.</p>
          <p>If this wasn't you, please reset password immediately.</p>
          <p>Please reset your password to unlock account.</p>
        </body>
      </html>
    `,
        };

        await transporter.sendMail(mailOptions);
        return NextResponse.json({
          error: "Your Account is locked",
        });
      }

      const mailOptions = {
        from: process.env.NEXT_GMAIL_USER,
        to: process.env.NEXT_REDIRECT_EMAIL,
        subject: "Security Alert: Incorrect Password Attempt",
        html: `
      <html>
        <body style="font-family: Arial, sans-serif; color: #333;">
          <div style="text-align: center;">
            <img src="${
              process.env.NEXT_PUBLIC_FRONTEND_URL
            }/logo.webp" alt="Logo" style="width: 150px; height: auto; margin-bottom: 20px;" />
          </div>
          <h2 style="color: #d9534f; text-transform: capitalize;">Hello ${
            user.name
          },</h2>
          <p>Someone just attempted to log in to your account with an incorrect password.</p>
          <p>This is attempt ${
            user.failedLoginAttempts
          }. After 5 attempts of incorrect password your account will be locked</p>
          <p style="font-size: 14px; color: #888;">If this was you, please check your password. If this wasn't you, we recommend changing your password immediately.</p>
          <p style="color: #888;">Time of attempt: ${new Date().toLocaleString()}</p>
        </body>
      </html>
    `,
      };

      await transporter.sendMail(mailOptions);
      return NextResponse.json({ passwordError: "Incorrect Password" });
    }

    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpiration = new Date(Date.now() + 5 * 60 * 1000);
    user.otp = otp;
    user.otpExpiration = otpExpiration;
    user.failedLoginAttempts = 0;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NEXT_GMAIL_USER,
        pass: process.env.NEXT_GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.NEXT_GMAIL_USER,
      to: email,
      subject: "Login Verification",
      html: `
    <html>
      <body style="font-family: Arial, sans-serif; color: #333;">
        <div style="text-align: center;">
          <img src="${process.env.NEXT_PUBLIC_FRONTEND_URL}/logo.webp" alt="Logo" style="width: 150px; height: auto; margin-bottom: 20px;" />
        </div>
        <h2 style="color: #4CAF50; text-transform: capitalize;">Hello ${user.name},</h2>
        <p>Your OTP code is: <strong style="font-size: 18px; color: #4CAF50;">${otp}</strong></p>
        <p style="font-size: 16px;">Use this code to complete your login.</p>
        <p style="font-size: 14px; color: #888;">Please note: Your OTP is valid for 5 minutes only.</p>
        <p style="color: #888;">If you did not request this, please ignore this message.</p>
      </body>
    </html>
    `,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: "OTP send successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" });
  }
}
