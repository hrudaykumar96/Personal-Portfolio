import DbConnection from "@/app/utils/config/DbConnection";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import User from "@/app/utils/models/Users";


export const GET = async(req)=>{
    try {
        DbConnection();
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value
        
        if(!token) return NextResponse.json({ error: 'Token not Found'})

        const userId = jwt.verify(token, process.env.NEXT_JWT_KEY);
        const userdata = await User.findById(userId.id);

        if(!userdata) return NextResponse({error:'User not Found'});

        return NextResponse.json({ success: userdata });
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error'});
    }
};