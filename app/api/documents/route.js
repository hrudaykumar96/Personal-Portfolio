"use server";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import User from "@/app/utils/models/Users";
import DbConnection from "@/app/utils/config/DbConnection";
import { NextResponse } from "next/server";
import uploadToCloudinary from "@/app/utils/cloudinary/uploadtoCloudinary";
import deleteUploadFile from "@/app/utils/cloudinary/deleteCloudinary";

export async function POST(req) {
  try {
    await DbConnection();
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return NextResponse.json({ error: "Token not found" });

    const decoded = jwt.verify(token, process.env.NEXT_JWT_KEY);
    const user = await User.findById(decoded.id);
    if (!user) return NextResponse.json({ error: "User not found" });

    const formData = await req.formData();

    const resume = formData.get("file");

    let resumeResult;
    if (resume && resume !== "null") {
      if (user.resumePublic_id) {
        await deleteUploadFile(user.resumePublic_id, 'raw');
      }
      resumeResult = await uploadToCloudinary(resume);
    }

    user.resumePublic_id = resumeResult?.public_id || user.resumePublic_id;
    user.resumeURL = resumeResult?.secure_url || user.resumeURL;

    await user.save();
    return NextResponse.json({ success: user });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" });
  }
}