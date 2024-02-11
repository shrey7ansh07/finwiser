import { Router } from "express";
import { loginUser, logOutUser, updateUser, getUser, registerUser, refreshAccessToken } from "../controller/user.controller.js"
import { verifyUser } from "../middlewares/authMW.js"

const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)

//* secured routes that go via authentication of middlewares
// router.route("/refreshtoken").post(refreshAccessToken)
router.route("/logout").post(verifyUser, logOutUser)
router.route("/update").post(verifyUser, updateUser)
// router.route("/checkauth").post(verifyUser, getUser)


export default router
