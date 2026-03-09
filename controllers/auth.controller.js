import User from "../models/user.model.js";
import bcrypt from "bcrypt";

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

    const newUser = await User.create({ name, email, hashedPassword });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    console.error(error);
  }
};
