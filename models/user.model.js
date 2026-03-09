import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User name is required"],
      trim: true,
      minLength: 2,
      maxLength: 50,
    },
    email: {
      type: String,
      required: [true, "User email is required"],
      trim: true,
      unique: true,
      lowerCase: true,
    },
    password: {
      type: String,
      required: [true, "user password is required"],
      minLength: 2,
    },
    role: {
      type: String,
      enum: ["candidate", "recruiter"],
      default: "candidate",
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
