"use server"

import mongoose from "mongoose"

const DbConnection = () => {
    try {
        mongoose.connect(process.env.NEXT_MONGO_URI);
        console.log('Database connected')
    } catch (error) {
        console.log(error)
    }
}

export default DbConnection