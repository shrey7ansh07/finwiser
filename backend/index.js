import dotenv from "dotenv";
import { connectDB } from "./database/dbconnect.js";
import { app } from "./app.js";
dotenv.config({
    path: './.env'
});
connectDB()
    .then(() => {
        app.listen(process.env.PORT, () => { console.log(`serving is running at ${process.env.PORT}`) })
    })
    .catch((error) => {
        console.log("MONGODB connection failed", error)
    })