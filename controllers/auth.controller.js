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

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
   

    //check user is vaild
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    }

    //compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Password" });
    }

    // generate token
    const token = jwt.sign({ userId: user?._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRED_IN,
    });

    return res
      .status(200)
      .json({ success: true, data: { token, user: user?._id } });
  } catch (error) {
    console.log(error);
  }
};
