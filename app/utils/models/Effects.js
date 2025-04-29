"use server";

import mongoose from "mongoose";

const EffectsSchema = new mongoose.Schema({
    mode:{
        type: String,
        required: true,
        default: 'dark',
        enum: ['light', 'dark'],
    },
},{ timestamps: true});


const Effects = mongoose.models.Effects || mongoose.model("Effects", EffectsSchema);
export default Effects;