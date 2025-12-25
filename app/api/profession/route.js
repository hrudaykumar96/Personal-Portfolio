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

    const title = formData.get("title");
    const name = formData.get("name");
    const start = formData.get("start");
    const end = formData.get("end");
    const image = formData.get("image");
    const present = formData.get('present');

    const techLower = name.toLowerCase();

    let imageResult;

    const educationExists = user.experience.some(
      (s) => s.name.toLowerCase() === techLower
    );

    if (!educationExists) {
      if (image) {
        imageResult = await uploadToCloudinary(image);
      }

      user.experience.push({
        title,
        name,
        start,
        end,
        present,
        imageURL: imageResult?.secure_url || null,
        imagePublic_id: imageResult?.public_id || null,
      });

      await user.save();

      const sortArrayByIdDesc = (arr) =>
        arr?.sort((a, b) => b._id.toString().localeCompare(a._id.toString()));

      user.skills = sortArrayByIdDesc(user.skills);
      user.technologies = sortArrayByIdDesc(user.technologies);
      user.education = sortArrayByIdDesc(user.education);
      user.certifications = sortArrayByIdDesc(user.certifications);
      user.experience = sortArrayByIdDesc(user.experience);

      return NextResponse.json({ success: user });
    } else {
      return NextResponse.json({ nameError: "Profession already exists" });
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

    const educationToDelete = user.experience.find(
      (edu) => edu._id.toString() === id
    );

    if (educationToDelete?.imagePublic_id) {
      await deleteUploadFile(educationToDelete.imagePublic_id);
    }

    user.experience = user.experience.filter(
      (edu) => edu._id.toString() !== id
    );
    await user.save();

    const sortArrayByIdDesc = (arr) =>
      arr?.sort((a, b) => b._id.toString().localeCompare(a._id.toString()));

    user.skills = sortArrayByIdDesc(user.skills);
    user.technologies = sortArrayByIdDesc(user.technologies);
    user.education = sortArrayByIdDesc(user.education);
    user.certifications = sortArrayByIdDesc(user.certifications);
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

    const title = formData.get("title");
    const name = formData.get("name");
    const start = formData.get("start");
    const image = formData.get("image");
    const id = formData.get("id");
    const present = formData.get("present");
    const end = formData.get("end");

    if (!id || typeof name !== "string") {
      return NextResponse.json({ error: "Missing or invalid data" });
    }

    const techLower = name.toLowerCase();

    const isDuplicate = user.experience.some(
      (t) => t.name.toLowerCase() === techLower && t._id.toString() !== id
    );
    if (isDuplicate) {
      return NextResponse.json({ nameError: "Profession already exists" });
    }

    const techIndex = user.experience.findIndex((t) => t._id.toString() === id);
    if (techIndex === -1) {
      return NextResponse.json({ error: "Profession not found" });
    }

    if (image && image !== "null") {
      if (user.experience[techIndex].imagePublic_id) {
        await deleteUploadFile(user.experience[techIndex].imagePublic_id);
      }
      const imageResult = await uploadToCloudinary(image);
      user.experience[techIndex].imageURL = imageResult?.secure_url;
      user.experience[techIndex].imagePublic_id = imageResult?.public_id;
    }

    user.experience[techIndex].title =
      title || user.experience[techIndex].title;
    user.experience[techIndex].name = name || user.experience[techIndex].name;
    user.experience[techIndex].start =
      start || user.experience[techIndex].start;
    user.experience[techIndex].end = end || user.experience[techIndex].end;
    user.experience[techIndex].present = present || user.experience[techIndex].present;

    await user.save();

    const sortArrayByIdDesc = (arr) =>
      arr?.sort((a, b) => b._id.toString().localeCompare(a._id.toString()));

    user.skills = sortArrayByIdDesc(user.skills);
    user.technologies = sortArrayByIdDesc(user.technologies);
    user.education = sortArrayByIdDesc(user.education);
    user.certifications = sortArrayByIdDesc(user.certifications);
    user.experience = sortArrayByIdDesc(user.experience);

    return NextResponse.json({ success: user });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" });
  }
}