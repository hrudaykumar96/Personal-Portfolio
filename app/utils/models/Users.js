"use server";

import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
        unique: false
    },
    mobile: {
        type: String,
        required: false,
        unique: false
    },
    designation: {
        type: String,
        required: false,
    },
    profileURL: {
        type: String,
        required: false,
    },
    profilePublic_id: {
        type: String,
        required: false,
    },
    address: {
        type: String,
        required: false,
    },
    summary: {
        type: String,
        required: false,
    },
    education: [
        {
            school: {
                type: String,
                required: false,
            },
            degree: {
                type: String,
                required: false,
            },
            field: {
                type: String,
                required: false,
            },
            grade: {
                type: String,
                required: false,
            },
            start: {
                type: Date,
                required: false,
            },
            end: {
                type: Date,
                required: false,
            },
            imageURL: { 
                type: String,
                required: false,
            },
            imagePublic_id:{
                type: String,
                required: false,
            }
        },
    ],
    certifications:[
        {
            name:{
                type: String,
                required: false,
            },
            organization:{
                type: String,
                required: false
            },
            issued: {
                type: Date,
                required: false,
            },
            imageURL: { 
                type: String,
                required: false,
            },
            imagePublic_id:{
                type: String,
                required: false,
            }
        }
    ],
    experience:[
        {
            title:{
                type: String,
                required: false, 
            },
            name:{
                type: String,
                required: false,
            },
            start: {
                type: Date,
                required: false,
            },
            end: {
                type: Date,
                required: false,
            },
            present: { 
                type: String,
                required: false,
            },
        }
    ],
    skills:[
        {
            type: String,
            required: false
        }

    ],
    facebook:{
        type: String,
        required: false
    },
    instagram:{
        type: String,
        required: false
    },
    linkedin:{
        type: String,
        required: false
    },
    telegram:{
        type: String,
        required: false
    },
    github:{
        type: String,
        required: false
    },
    resumePublic_id:{
        type: String,
        required: false
    },
    resumeURL:{
        type: String,
        required: false
    },
    technologies:[
        {
            type: String,
            required: false
        }
    ],
    password:{
        type: String,
        required: false
    },
    otp:{ 
        type: String,
        default: null,
        required: false
    },
    otpExpiration: { 
        type: Date, 
        default: null, 
        required: false 
    },
},{ timestamps: true});


const User = mongoose.models.User || mongoose.model("User", UsersSchema);
export default User;