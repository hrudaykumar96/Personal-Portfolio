import { MongoClient } from 'mongodb';
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await MongoClient.connect(process.env.NEXT_MONGO_URI);
    const db = client.db("admin");
    const stats = await db.command({ serverStatus: 1 });
    await client.close();
    return NextResponse.json({ success: stats });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}