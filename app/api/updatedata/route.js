"use server";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import User from "@/app/utils/models/Users";
import DbConnection from "@/app/utils/config/DbConnection";
import { NextResponse } from "next/server";
import deleteUploadFile from "@/app/utils/cloudinary/deleteCloudinary";
import uploadToCloudinary from "@/app/utils/cloudinary/uploadtoCloudinary";

export async function POST(req) {


  try {
    DbConnection();
    const formData = await req.formData();
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return NextResponse.json({ error: "Token not found" });

    const decoded = jwt.verify(token, process.env.NEXT_JWT_KEY);
    const user = await User.findById(decoded.id);
    if (!user) return NextResponse.json({ error: "User not found" });

    const name = formData.get("name");
    const email = formData.get("email");
    const mobile = formData.get("mobile");
    const designation = formData.get("designation");
    const profile = formData.get("profile");
    const resume = formData.get("resume");

    let profileResult;
    if (profile && profile !== "null") {
      if (user.profilePublic_id) {
        await deleteUploadFile(user.profilePublic_id);
      }
      profileResult = await uploadToCloudinary(profile);
    }



    let resumeResult;
    if (resume && resume !== "null") {
      if (user.resumePublic_id) {
        await deleteUploadFile(user.resumePublic_id, 'raw');
      }
      resumeResult = await uploadToCloudinary(resume);
    }

    const address = formData.get("address");
    const summary = formData.get("summary");

    const educationData = [];
    let educationIndex = 0;
    while (formData.has(`education[${educationIndex}].school`)) {
      const school = formData.get(`education[${educationIndex}].school`) || "";
      const degree = formData.get(`education[${educationIndex}].degree`) || "";
      const field = formData.get(`education[${educationIndex}].field`) || "";
      const grade = formData.get(`education[${educationIndex}].grade`) || "";
      const start = formData.get(`education[${educationIndex}].start`) || "";
      const end = formData.get(`education[${educationIndex}].end`) || "";
      const image = formData.get(`education[${educationIndex}].image`) || null;

      let imageResult;
      if (image) {
        if (user.education[educationIndex]?.imagePublic_id) {
          await deleteUploadFile(user.education[educationIndex].imagePublic_id);
        }
        imageResult = await uploadToCloudinary(image);
        educationData.push({
          school,
          degree,
          field,
          grade,
          start: start ? new Date(start) : "",
          end: end ? new Date(end) : "",
          imageURL: imageResult?.secure_url,
          imagePublic_id: imageResult?.public_id,
        });
      } else {
        educationData.push({
          school,
          degree,
          field,
          grade,
          start: start ? new Date(start) : "",
          end: end ? new Date(end) : "",
          imageURL: user.education[educationIndex]?.imageURL || "",
          imagePublic_id: user.education[educationIndex]?.imagePublic_id || "",
        });
      }

      educationIndex++;
    }

    const experienceData = [];
    let experienceIndex = 0;
    while (formData.has(`experience[${experienceIndex}].title`)) {
      const title = formData.get(`experience[${experienceIndex}].title`) || "";
      const name = formData.get(`experience[${experienceIndex}].name`) || "";
      const start = formData.get(`experience[${experienceIndex}].start`) || "";
      const end = formData.get(`experience[${experienceIndex}].end`) || "";
      const present =
        formData.get(`experience[${experienceIndex}].present`) || "";

      experienceData.push({
        title,
        name,
        start: start ? new Date(start) : "",
        end: end ? new Date(end) : "",
        present,
      });

      experienceIndex++;
    }

    const certificationData = [];
    let certificationIndex = 0;
    while (formData.has(`certifications[${certificationIndex}].name`)) {
      const name =
        formData.get(`certifications[${certificationIndex}].name`) || "";
      const organization =
        formData.get(`certifications[${certificationIndex}].organization`) ||
        "";
      const issued =
        formData.get(`certifications[${certificationIndex}].issued`) || "";
      const image =
        formData.get(`certifications[${certificationIndex}].image`) || null;

      let certificationResult;
      if (image) {
        if (user.certifications[certificationIndex]?.imagePublic_id) {
          await deleteUploadFile(
            user.certifications[certificationIndex].imagePublic_id
          );
        }
        certificationResult = await uploadToCloudinary(image);
        certificationData.push({
          name,
          organization,
          issued: issued ? new Date(issued) : "",
          imageURL: certificationResult?.secure_url,
          imagePublic_id: certificationResult?.public_id,
        });
      } else {
        certificationData.push({
          name,
          organization,
          issued: issued ? new Date(issued) : "",
          imageURL: user.certifications[certificationIndex]?.imageURL || "",
          imagePublic_id:
            user.certifications[certificationIndex]?.imagePublic_id || "",
        });
      }

      certificationIndex++;
    }

    (user.name = name || user.name),
      (user.email = email || user.email),
      (user.mobile = mobile || user.mobile),
      (user.designation = designation || user.designation),
      (user.profileURL = profileResult?.secure_url || user.profileURL),
      (user.profilePublic_id =
        profileResult?.public_id || user.profilePublic_id),
      (user.resumePublic_id = resumeResult?.public_id || user.resumePublic_id),
      (user.resumeURL = resumeResult?.secure_url || user.resumeURL),
      (user.address = address || user.address),
      (user.summary = summary || user.summary),
      (user.education = educationData || user.education),
      (user.experience = experienceData || user.experience),
      (user.certifications = certificationData || user.certifications),
      (user.skills = formData.getAll("skills") || user.skills),
      (user.facebook = formData.get("facebook") || user.facebook),
      (user.instagram = formData.get("instagram") || user.instagram),
      (user.linkedin = formData.get("linkedin") || user.linkedin),
      (user.github = formData.get("github") || user.github),
      (user.telegram = formData.get("telegram") || user.telegram),
      (user.technologies =
        formData.getAll("technologies") || user.technologies),
      await user.save();

    return NextResponse.json({ success: user });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" });
  }
}
