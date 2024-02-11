import { User } from "../models/User.model.js"
import jwt from "jsonwebtoken"
import { asyncHandler } from "../additionels/asyncHandler.js"
import { ErrorDealer } from "../additionels/errorHandler.js"
import { APIresponse } from "../additionels/apiResponse.js"

const generateAccessAndRefereshTokens = async (userId) => {
    try {
        // console.log(userId)
        const user = await User.findById(userId)

        const accessToken = await user.generateAccessToken()
        const refreshToken = await user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }


    } catch (error) {
        throw new ErrorDealer(500, "Something went wrong while generating referesh and access token")
    }
}

const registerUser = asyncHandler(async (req, res) => {
    //* get the user details from the frontend
    //* validate it as no required feilds are left empty
    //* check if user already exist or not ( username || email )
    //* images are provided or not as 
    //* upload it to cloudinary
    //* images are uploaded or not on cloudinary
    //* create an user object and save it in the db (User)
    //* response to be received back by removing the password and refresh token
    console.log("reached here");
    const { username, password } = req.body //* step 1
    // console.log("email : ", email)
    if ([username, password].some((feild) => feild?.trim() === undefined)) { throw new ErrorDealer(400, "All feilds are necessary") } //* step 2

    console.log(username, password);
    const existingUser = await User.findOne({ username })
    if (existingUser) { throw new ErrorDealer(409, "User with email or username already exists") }
    //* step 3

    //* step 4
    const user = await User.create({
        fullname: "",
        email: "",
        password: password,
        username: username,
    })
    //* step 5

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    //* step 6

    if (!createdUser) {
        throw new ErrorDealer(400, "There was some issue while registering the user")
    }
    return res.status(201).json(
        new APIresponse(200, createdUser, "User registered Successfully")
    )
})

const loginUser = asyncHandler(async (req, res, next) => {
    //* get the data from the frontend
    //* check whether required feilds are present
    //* check if the user exist in the db if not then send an message
    //* check if the password entered is correct 
    //* if correct create refresh and access token
    //* check whether they are created and if so update them on the db 
    //* return an response to the user 

    const { username, password } = req.body  //* step 1
    if (username === undefined) { throw new ErrorDealer(418, "Enter email or username") } //* step 2


    const user = await User.findOne({ username })
    if (!user) { throw new ErrorDealer(404, "User not found") } //* step 3

    const existingUser = await user.isPasswordCorrect(password)

    if (!existingUser) { throw new ErrorDealer(500, "Invalid Credentials") } //* step 4

    const { refreshToken, accessToken } = await generateAccessAndRefereshTokens(user._id) //* step 5 and 6

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options1 = {
        httpOnly: true,
        secure: true,
        maxAge: 900000
    }
    const options2 = {
        httpOnly: true,
        secure: true,
        maxAge: 10800000
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options1)
        .cookie("refreshToken", refreshToken, options2)
        .json(
            new APIresponse(
                200,
                {
                    user: loggedInUser
                },
                "User logged In Successfully"
            )
        )
})

const logOutUser = asyncHandler(async (req, res) => {
    // const newuser = await User.findByIdAndUpdate(req.user._id,{$set: {refreshToken: undefined}},{new : true})
    // console.log(newuser)
    const user = await User.findById(req.user._id)
    user.refreshToken = undefined
    await user.save({ validateBeforeSave: false })
    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new APIresponse(200, "Logout Successfully"))
})

const refreshAccessToken = asyncHandler(async (req, res, next) => {
    const { refreshToken: refreshTokenUser } = req.cookies;
    if (!refreshTokenUser) {
        throw new ErrorDealer(402, "unauthorized request : refreshtoken is invalid")
    }
    try {
        const decodedToken = jwt.verify(refreshTokenUser, process.env.REFRESH_TOKEN_SECRET)
        //* since i have only id as an attribute provided to the refreh token for a user we can use it 
        const user = await User.findById(decodedToken?._id)
        if (!user) { throw new ErrorDealer(401, "user does not exist") }
        if (refreshTokenUser !== user.refreshToken) {
            throw new ErrorDealer(402, "refresh token is expired")
        }
        const options1 = {
            httpOnly: true,
            secure: true,
            maxAge: 900000
        }
        const options2 = {
            httpOnly: true,
            secure: true,
            maxAge: 10800000
        }
        const { accessToken, refreshToken: newrefreshToken } = await generateAccessAndRefereshTokens(user._id)


        return res
            .status(200)
            .cookie("accessToken", accessToken, options1)
            .cookie("refreshToken", newrefreshToken, options2)
            .json(
                new APIresponse(200, "access token refreshed")
            )

    } catch (error) {
        next(error)
    }

})

const updateUser = asyncHandler(async (req, res, next) => {
    //*destructure the request

    const { username, fullname, email, familysize, contactno, dateofbirth } = req.body

    //* update the user by finding him

    try {
        const user = await User.findByIdAndUpdate(req.user._id, {
            username: username,
            fullname: fullname,
            email: email,
            dateofbirth: dateofbirth,
            familysize: familysize,
            contactno: contactno,
        }, { new: true }).select("-password -refreshToken");
        if (!user) {
            throw new ErrorDealer(404, "User not found")
        }
        //* here the userdetails are Successfully changed
        res
            .status(200)
            .json(new APIresponse(
                200,
                {
                    user: user,
                },
                "Saved details Successfully"
            ))

    } catch (error) {
        next(error)
    }


})

const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select("-password -refreshToken")
    res
        .status(200)
        .json(new APIresponse(
            200,
            {
                user: user
            },
            "welcome back"
        ))
})

export {
    registerUser,
    loginUser,
    logOutUser,
    refreshAccessToken,
    updateUser,
    getUser,
}

