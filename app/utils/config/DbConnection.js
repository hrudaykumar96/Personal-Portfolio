"use server"

import mongoose from "mongoose"

const DbConnection = async() => {
    try {
        await mongoose.connect(process.env.NEXT_MONGO_URI);
        console.log('Database connected')
    } catch (error) {
        console.log(error);
    }
}

export default DbConnection;