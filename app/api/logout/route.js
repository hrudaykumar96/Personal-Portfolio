import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import DbConnection from "@/app/utils/config/DbConnection";

export const POST=async(req)=>{
    try {
        DbConnection();
        const token = req.cookies.get('token');
        const cookieStore = await cookies();
        if(!token) return NextResponse.json({ error:'Token not found'})
        cookieStore.delete('token', token,{
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 24 * 60 * 60,
                path: '/', 
                sameSite:'strict'
            });
        return NextResponse.json({ success: 'You are logged out successfully'})
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error'})
    }
};