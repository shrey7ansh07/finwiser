import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserAssets = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    monthlyincome: {
        type: Number,
        required: true,
        default: 0,
    },
    currentbankamount: {
        type: Number,
        required: true,
        default: 0,
    },
    currentsavings: {
        type: Number,
        required: true,
        default: 0,
    },
    assettype: {
        type: String,
        enum: ['Cash', 'Investments', 'Real Estate', 'Personal Property', 'Retirement Accounts', 'Business Ownership', 'Bitcoin', 'Others']
    },
    amount: {
        type: Number,
        default: 0,
    }
})

UserAssets.pre("save", async function (next) {
    if (!this.isModified("monthlyincome")) return next();
    try {
        this.monthlyincome = await bcrypt.hash(this.monthlyincome, 10);
        next();
    }
    catch (error) {
        next(error)
    }
})

UserAssets.pre("save", async function (next) {
    if (!this.isModified("currentbankamount")) return next();
    try {
        this.currentbankamount = await bcrypt.hash(this.currentbankamount, 10);
        next();
    }
    catch (error) {
        next(error)
    }
})

UserAssets.pre("save", async function (next) {
    if (!this.isModified("currentsavings")) return next();
    try {
        this.currentsavings = await bcrypt.hash(this.currentsavings, 10);
        next();
    }
    catch (error) {
        next(error)
    }
})

export const Assets = mongoose.model("Assets", UserAssets)

