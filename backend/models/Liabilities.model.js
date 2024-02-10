import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserLiabilities = mongoose.Schema({
    user:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    loantype:
    {
        type: String,
        enum: ['Personal', 'Home', 'Auto', 'Student', 'Small Business', 'Payday', 'Mortgage', 'Others']
    },
    loansource:
    {
        type: String,
        enum: ['Banks', 'Credit Unions', 'Online Lenders', 'Peer-to-Peer Lenders', 'Family', 'Friends', 'Others']
    },
    amount:
    {
        type: Number,
        default: 0,
    },
    startdate:
    {
        type: String,
    },
    enddate:
    {
        type: String,
    },
    interestrate:
    {
        type: Number,
    },
    emi:
    {
        type: Number
    },
},
    {
        timestamps: true
    })

UserLiabilities.pre("save", async function (next) {
    if (!this.isModified("loantype")) return next();
    try {
        this.loantype = await bcrypt.hash(this.loantype, 10);
        next();
    }
    catch (error) {
        next(error)
    }
})
UserLiabilities.pre("save", async function (next) {
    if (!this.isModified("loansource")) return next();
    try {
        this.loansource = await bcrypt.hash(this.loansource, 10);
        next();
    }
    catch (error) {
        next(error)
    }
})
UserLiabilities.pre("save", async function (next) {
    if (!this.isModified("amount")) return next();
    try {
        this.amount = await bcrypt.hash(this.amount, 10);
        next();
    }
    catch (error) {
        next(error)
    }
})
UserLiabilities.pre("save", async function (next) {
    if (!this.isModified("interestrate")) return next();
    try {
        this.interestrate = await bcrypt.hash(this.interestrate, 10);
        next();
    }
    catch (error) {
        next(error)
    }
})
UserLiabilities.pre("save", async function (next) {
    if (!this.isModified("emi")) return next();
    try {
        this.emi = await bcrypt.hash(this.emi, 10);
        next();
    }
    catch (error) {
        next(error)
    }
})
export const Liabilities = mongoose.model("Liabilities", UserLiabilities)


