import DbConnection from "@/app/utils/config/DbConnection";
import User from "@/app/utils/models/Users";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";


export async function POST(req){

    try {
        DbConnection();
        const { email, password } = await req.json();
        const user = await User.findOne({email});

        if(!user) return NextResponse.json({ error: 'Email not registered'});

        const hashpassword = await bcrypt.hash(password,10);
        user.password = hashpassword;

        await user.save();
        return NextResponse.json({ success: 'Password updated successfully'});
    } catch (error) {
        return NextResponse.json({ error : 'Internal server error'})
    }
}
