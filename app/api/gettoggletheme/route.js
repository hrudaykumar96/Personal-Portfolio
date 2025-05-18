import DbConnection from "@/app/utils/config/DbConnection";
import Effects from "@/app/utils/models/Effects";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await DbConnection();

    const effects = await Effects.findOne();

    const hour = parseInt(
      new Date().toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "numeric",
        hour12: false,
      })
    );

    const isDay = hour >= 6 && hour < 18;
    const mode = isDay ? "light" : "dark";

    if (effects) {
      effects.mode = mode;
      await effects.save();
    } else {
      await Effects.create({ mode });
    }

    return NextResponse.json({ success: mode });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" });
  }
};
