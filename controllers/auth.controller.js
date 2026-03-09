import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_EXPIRED_IN, JWT_SECRET } from "../config/env.js";

//user signup controller
export const signUp = async (req, res, next) => {
  try {
    console.log(req.body);
    const { name, email, password } = req.body;

    //check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const error = new Error("User already exists");
      res.status(409);
      throw error;
    }

    //has password
    const generateSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, generateSalt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    //generate token
    const token = jwt.sign({ userId: newUser?._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRED_IN,
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: { token, user: newUser },
    });
  } catch (error) {
    console.error(error);
  }
};
