import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected : ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection failed : ${error.message}`);
    process.exit(1); // 1 means exit with failure, 0 means exit with success
  }
};
