import { asyncHandler } from "../additionels/asyncHandler.js"
import { ErrorDealer } from "../additionels/errorHandler.js"
import jwt from "jsonwebtoken"
import { User } from "../models/User.model.js"
const verifyUser = asyncHandler(async (req, res, next) => {

    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        if (!token) { throw new ErrorDealer(401, "Unauthorized request") }
        const decodedToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decodedToken?._id).select("-password -refreshtoken")
        if (!user) { throw new ErrorDealer(401, "Invalid access token") }
        req.user = user
        next()
    } catch (error) {
        next(error)
    }
})

export { verifyUser }