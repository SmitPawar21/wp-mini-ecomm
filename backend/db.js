import mongoose from "mongoose";

const connectDB = () => {
    mongoose.connect(process.env.MONGODB_URI)
        .then(() => console.log("Database Connected"))
        .catch((err) => console.log("error connecting database. ", err))
}

export default connectDB;