import User from "@/app/utils/models/Users";
import { NextResponse } from "next/server";
import DbConnection from "@/app/utils/config/DbConnection";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req) {

  try {
    DbConnection();
    const { email, otp } = await req.json();
    const user = await User.findOne({ email });

    if (!user) return NextResponse.json({ error: 'User not found' });

    if (user.otp !== otp) {
      return NextResponse.json({ otperror: 'Invalid OTP' });
    }

    if (new Date() > new Date(user.otpExpiration)) {
      user.otp = null; 
      user.otpExpiration = null;
      await user.save();
      return NextResponse.json({otperror: 'OTP has expired' });
    }

    const token = jwt.sign({ id: user.id }, process.env.NEXT_JWT_KEY);

    const cookieStore = await cookies();
    cookieStore.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60,
      path: '/',
      sameSite: 'strict',
    });

    user.otp = null;
    user.otpExpiration = null;
    await user.save();

    return NextResponse.json({ success: 'You logged in successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' });
  }
}
