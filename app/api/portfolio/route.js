import DbConnection from "@/app/utils/config/DbConnection";
import User from "@/app/utils/models/Users";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        DbConnection();
        const data = await User.findOne();
        
        data.education.sort((a, b) => new Date(b.start) - new Date(a.start));
        data.experience.sort((a, b) => new Date(b.start) - new Date(a.start));
        data.certifications.sort((a, b) => {
            if (!a.issued && !b.issued) {
                return 0;
            } else if (!a.issued) {
                return 1;
            } else if (!b.issued) {
                return -1;
            }
            return new Date(b.issued) - new Date(a.issued);
        });
        
        return NextResponse.json({ success: data });
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' });
    }
}
