"use server";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import User from "@/app/utils/models/Users";
import DbConnection from "@/app/utils/config/DbConnection";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await DbConnection();
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return NextResponse.json({ error: "Token not found" });

    const decoded = jwt.verify(token, process.env.NEXT_JWT_KEY);
    const user = await User.findById(decoded.id);
    if (!user) return NextResponse.json({ error: "User not found" });

    const { facebook, instagram, linkedin, telegram, whatsapp, github } =
      await req.json();

    const updates = {
      facebook,
      instagram,
      linkedin,
      telegram,
      whatsapp,
      github,
    };

    for (const [key, value] of Object.entries(updates)) {
      if (value) {
        user[key] = value;
      }
    }

    await user.save();

    return NextResponse.json({ success: "Updated Successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" });
  }
}