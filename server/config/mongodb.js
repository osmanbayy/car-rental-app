import mongoose from "mongoose"

const connectToDatabase = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/Rentigo`);
        console.log("✔️  Database Connected!")
    } catch (error) {
        console.log("✖️  Database Connection Failed!", error.message);
    }
}

export default connectToDatabase;