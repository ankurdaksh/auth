import mongoose from "mongoose";



const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`mongodb+srv://1101:1101@cluster0.5vpq94n.mongodb.net/videotube`)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}

export default connectDB