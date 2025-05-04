import DbConnection from "@/app/utils/config/DbConnection";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import User from "@/app/utils/models/Users";

export const GET = async (req) => {
  try {
    await DbConnection();

    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Token not found" });
    }

    const userId = jwt.verify(token, process.env.NEXT_JWT_KEY);
    const user = await User.findById(userId.id).lean();

    if (!user) {
      return NextResponse.json({ error: "User not found" });
    }

    const sortArrayByIdDesc = (arr) =>
      arr?.sort((a, b) => b._id.toString().localeCompare(a._id.toString()));

    user.skills = sortArrayByIdDesc(user.skills);
    user.technologies = sortArrayByIdDesc(user.technologies);
    user.education = sortArrayByIdDesc(user.education);
    user.experience = sortArrayByIdDesc(user.experience);

    return NextResponse.json({ success: user });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" });
  }
};