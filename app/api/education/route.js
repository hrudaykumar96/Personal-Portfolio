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

    const school = formData.get("school");
    const degree = formData.get("degree");
    const field = formData.get("field");
    const grade = formData.get("grade");
    const start = formData.get("start");
    const end = formData.get("end");
    const image = formData.get("image");

    const techLower = degree.toLowerCase();

    let imageResult;

    const educationExists = user.education.some(
      (s) => s.degree.toLowerCase() === techLower
    );

    if (!educationExists) {
      if (image) {
        imageResult = await uploadToCloudinary(image);
      }

      user.education.push({
        school,
        degree,
        field,
        grade,
        start,
        end,
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
      return NextResponse.json({ nameError: "Qualification already exists" });
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

    const educationToDelete = user.education.find(
      (edu) => edu._id.toString() === id
    );

    if (educationToDelete?.imagePublic_id) {
      await deleteUploadFile(educationToDelete.imagePublic_id);
    }

    user.education = user.education.filter((edu) => edu._id.toString() !== id);
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

    const school = formData.get("school");
    const degree = formData.get("degree");
    const field = formData.get("field");
    const grade = formData.get("grade");
    const start = formData.get("start");
    const end = formData.get("end");
    const image = formData.get("image");
    const id = formData.get("id");

    if (!id || typeof degree !== "string") {
      return NextResponse.json({ error: "Missing or invalid data" });
    }

    const techLower = degree.toLowerCase();

    const isDuplicate = user.education.some(
      (t) => t.degree.toLowerCase() === techLower && t._id.toString() !== id
    );
    if (isDuplicate) {
      return NextResponse.json({ nameError: "Qualification already exists" });
    }

    const techIndex = user.education.findIndex((t) => t._id.toString() === id);
    if (techIndex === -1) {
      return NextResponse.json({ error: "Qualification not found" });
    }

    if (image && image !== "null") {
      if (user.education[techIndex].imagePublic_id) {
        await deleteUploadFile(user.education[techIndex].imagePublic_id);
      }
      const imageResult = await uploadToCloudinary(image);
      user.education[techIndex].imageURL = imageResult?.secure_url;
      user.education[techIndex].imagePublic_id = imageResult?.public_id;
    }

    user.education[techIndex].school =
      school || user.education[techIndex].school;
    user.education[techIndex].degree =
      degree || user.education[techIndex].degree;
    user.education[techIndex].field = field || user.education[techIndex].field;
    user.education[techIndex].grade = grade || user.education[techIndex].grade;
    user.education[techIndex].start = start || user.education[techIndex].start;
    user.education[techIndex].end = end || user.education[techIndex].end;

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