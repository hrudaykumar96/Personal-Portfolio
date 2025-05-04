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

    const name = formData.get("name");
    const image = formData.get("image");

    const techLower = name.toLowerCase();

    let imageResult;

    const skillExists = user.skills.some(
      (s) => s.name.toLowerCase() === techLower
    );

    if (!skillExists) {
      if (image) {
        imageResult = await uploadToCloudinary(image);
      }

      user.skills.push({
        name: techLower,
        imageURL: imageResult?.secure_url || null,
        imagePublic_id: imageResult?.public_id || null,
      });

      await user.save();

      const sortArrayByIdDesc = (arr) =>
        arr?.sort((a, b) => b._id.toString().localeCompare(a._id.toString()));

      user.skills = sortArrayByIdDesc(user.skills);
      user.technologies = sortArrayByIdDesc(user.technologies);
      user.education = sortArrayByIdDesc(user.education);
      user.experience = sortArrayByIdDesc(user.experience);

      return NextResponse.json({ success: user });
    } else {
      return NextResponse.json({ nameError: "Skill already exists" });
    }
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" });
  }
}

export async function DELETE(req) {
  try {
    await DbConnection();
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) return NextResponse.json({ error: "Token not found" });

    const decoded = jwt.verify(token, process.env.NEXT_JWT_KEY);
    const user = await User.findById(decoded.id);

    if (!user) return NextResponse.json({ error: "User not found" });

    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: "Id not found" });

    const skillToDelete = user.skills.find(
      (tech) => tech._id.toString() === id
    );

    if (skillToDelete?.imagePublic_id) {
      await deleteUploadFile(skillToDelete.imagePublic_id);
    }

    user.skills = user.skills.filter((tech) => tech._id.toString() !== id);
    await user.save();

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
}

export async function PUT(req) {
  try {
    await DbConnection();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return NextResponse.json({ error: "Token not found" });

    const decoded = jwt.verify(token, process.env.NEXT_JWT_KEY);
    const user = await User.findById(decoded.id);
    if (!user) return NextResponse.json({ error: "User not found" });

    const formData = await req.formData();
    const name = formData.get("name");
    const id = formData.get("id");
    const image = formData.get("image");

    if (!id || typeof name !== "string") {
      return NextResponse.json({ error: "Missing or invalid data" });
    }

    const techLower = name.toLowerCase();

    const isDuplicate = user.skills.some(
      (t) => t.name.toLowerCase() === techLower && t._id.toString() !== id
    );
    if (isDuplicate) {
      return NextResponse.json({ skillError: "Skill Already Added" });
    }

    const techIndex = user.skills.findIndex((t) => t._id.toString() === id);
    if (techIndex === -1) {
      return NextResponse.json({ error: "Skill not found" });
    }

    if (image && image !== "null") {
      if (user.skills[techIndex].imagePublic_id) {
        await deleteUploadFile(user.skills[techIndex].imagePublic_id);
      }
      const imageResult = await uploadToCloudinary(image);
      user.skills[techIndex].imageURL = imageResult?.secure_url;
      user.skills[techIndex].imagePublic_id = imageResult?.public_id;
    }

    user.skills[techIndex].name = techLower || user.skills[techIndex].name;

    await user.save();

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
}