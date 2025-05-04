import DbConnection from "@/app/utils/config/DbConnection";
import Effects from "@/app/utils/models/Effects";
import { NextResponse } from "next/server";


export const POST = async(req)=>{
    try {
        await DbConnection();
        const { mode } = await req.json();
        const effects = await Effects.findOne();

        if(effects){
            effects.mode = mode;
            await effects.save();
        }else{
            const newEffect = await Effects.create({ mode });
            await newEffect.save();
        }
        
        
        return NextResponse.json({ success: mode === 'light' ? 'Light Theme Enabled' : 'Dark Theme Enabled'});
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' });
    }
}