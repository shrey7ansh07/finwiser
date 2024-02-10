import mongoose from "mongoose";
export const connectDB = async () => {
    try {
        const connectionSuccess = await mongoose.connect(`${process.env.MONGODB_URL}`)
        //* it takes some time to connect hence await
        console.log(`DATABASE connected Successfully`)
    }
    catch (error) {
        // console.error("ERROR occured while connecting to database")
        console.error(error)

        process.exit(1) //* to exit the process that is going on currently via node
    }
}