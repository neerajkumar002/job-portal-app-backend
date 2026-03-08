import mongoose from "mongoose";
import { DB_URL, NODE_ENV } from "../config/env.js";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("database succesfully connected", NODE_ENV);
  } catch (error) {
    console.error("Error connecting to database", error);
    process.exit(0);
  }
};

export default connectToDatabase;
