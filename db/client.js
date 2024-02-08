import mongoose from "mongoose";

export const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to DB.");
    return mongoose.connection;
  } catch (error) {
    console.log("DB connection failed.");
    return process.exit(1);
  }
};

