import DbConnection from "@/app/utils/config/DbConnection";
import Effects from "@/app/utils/models/Effects";
import { NextResponse } from "next/server";


export const GET = async()=>{
    try {
        await DbConnection();
        const effects = await Effects.findOne();
        const hour = new Date().getHours();
        const isDay = hour >= 6 && hour < 18;
        const mode = isDay ? 'light' : 'dark';
        effects.mode = mode;
        await effects.save();
        return NextResponse.json({ success: effects.mode });
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' });
    }
};