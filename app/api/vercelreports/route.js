import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {

  const url = 'https://api.vercel.com/v2/projects';
  const auth = process.env.NEXT_VERCEL_TOKEN;

  try {
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${auth}` },
    });

    return NextResponse.json({ success: response.data });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' });
  }
}