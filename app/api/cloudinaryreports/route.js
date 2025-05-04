import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/usage`;
  const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");

  try {
    const response = await axios.get(url, {
      headers: { Authorization: `Basic ${auth}` },
    });

    return NextResponse.json({ success: response.data });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' });
  }
}