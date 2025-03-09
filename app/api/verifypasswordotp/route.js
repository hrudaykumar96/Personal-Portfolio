import User from "@/app/utils/models/Users";
import { NextResponse } from "next/server";
import DbConnection from "@/app/utils/config/DbConnection";

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
      return NextResponse.json({ otperror: 'OTP has expired' });
    }

    user.otp = null;
    user.otpExpiration = null;
    await user.save();

    return NextResponse.json({ success: 'OTP verified successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' });
  }
}
