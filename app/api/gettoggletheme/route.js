import DbConnection from "@/app/utils/config/DbConnection";
import Effects from "@/app/utils/models/Effects";
import { NextResponse } from "next/server";


export const GET = async()=>{
    try {
        await DbConnection();
        const effects = await Effects.findOne();
        return NextResponse.json({ success: effects.mode });
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' });
    }
};