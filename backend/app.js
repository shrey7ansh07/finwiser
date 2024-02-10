import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true, //* credentials can be accessed over here
}))
app.use(express.json({ limit: "30kb" }))
app.use(express.urlencoded({ extended: true, limit: "30kb" })) //* providing objects withing objects using url data transfer
app.use(express.static("public")) //* using it to access static resources
app.use(cookieParser()) //* cookies sent to the server via the browser are also parsed 






export { app }