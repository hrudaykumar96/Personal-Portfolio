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

    const { technologies } = await req.json();

    if (typeof technologies === "string") {
      const techLower = technologies.toLowerCase();

      if (
        !user.technologies.map((t) => t.name.toLowerCase()).includes(techLower)
      ) {
        user.technologies.push({ name: techLower });
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
        return NextResponse.json({
          technologyError: "Technology Already Added",
        });
      }
    } else {
      return NextResponse.json({ error: "Technologies must be a string" });
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

    user.technologies = user.technologies.filter(
      (tech) => tech._id.toString() !== id
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
    if (!token) {
      return NextResponse.json({ error: "Token not found" });
    }

    const decoded = jwt.verify(token, process.env.NEXT_JWT_KEY);
    const user = await User.findById(decoded.id);
    if (!user) {
      return NextResponse.json({ error: "User not found" });
    }

    const { id, name } = await req.json();

    if (!id || typeof name !== "string") {
      return NextResponse.json({ error: "Missing or invalid data" });
    }

    const techLower = name.toLowerCase();

    if (
      !user.technologies.map((t) => t.name.toLowerCase()).includes(techLower)
    ) {
      const techIndex = user.technologies.findIndex(
        (t) => t._id.toString() === id
      );

      if (techIndex === -1) {
        return NextResponse.json({ error: "Technology not found" });
      }

      user.technologies[techIndex].name = techLower;
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
      return NextResponse.json({
        technologyError: "Technology Already Added",
      });
    }
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" });
  }
}