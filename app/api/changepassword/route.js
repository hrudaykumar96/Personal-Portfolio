import DbConnection from "@/app/utils/config/DbConnection";
import User from "@/app/utils/models/Users";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    await DbConnection();
    const { email, password } = await req.json();
    const user = await User.findOne({ email });

    if (!user) return NextResponse.json({ error: "Email not registered" });

    const hashpassword = await bcrypt.hash(password, 10);
    user.password = hashpassword;
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
      subject: "Password Changed Successfully",
      html: `
        <html>
          <body style="font-family: Arial, sans-serif; color: #333;">
            <div style="text-align: center;">
              <img src="${
                process.env.NEXT_PUBLIC_FRONTEND_URL
              }/logo.webp" alt="Logo" style="width: 150px; height: auto; margin-bottom: 20px;" />
            </div>
            <h2 style="color: #4CAF50; text-transform: capitalize;">Hello ${
              user.name
            },</h2>
            <p>Your account password has been successfully updated.</p>
            <p>If you did not make this change, please reset your password.</p>
            <p style="font-size: 14px; color: #888;">Time of change: ${new Date().toLocaleString()}</p>
          </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: "Password updated successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" });
  }
}
