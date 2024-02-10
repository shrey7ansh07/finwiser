import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserLiabilities = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
})

