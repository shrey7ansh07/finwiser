import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";

const UserSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            index: true,
            trim: true
        },
        email: {
            type: String,
            trim: true,
            lowercase: true
        },
        fullname: {
            type: String,
            lowercase: true,
            trim: true
        },
        //* these consist of the id's of the blogs he read
        password: {
            type: String, //* because we will decrypt the password before storing it 
            required: [true, "password is required"],

        },
        familysize: {
            type: Number,
            default: 1,
        },
        contactno: {
            type: Number,
        },
        dateofbirth: {
            type: String,
        },
        refreshToken: {
            type: String,
        }
    },
    {
        timestamps: true
    }
)

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    }
    catch (error) {
        next(error)
    }
})
UserSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}
UserSchema.methods.generateAccessToken = function () {
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullname: this.fullname
    },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    )
}
UserSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    )
}

export const User = mongoose.model("User", UserSchema)