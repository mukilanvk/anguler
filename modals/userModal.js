import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ['admin', 'customer'], default: 'customer' }
})

export const userModal =mongoose.model.userModal || mongoose.model("user", userSchema);

