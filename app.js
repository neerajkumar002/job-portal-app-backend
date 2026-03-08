import express from "express";
import connectToDatabase from "./database/db.js";
import authRouter from "./routes/auth.routes.js";
const app = express();

connectToDatabase();

app.use(express.json());

//routes
app.use("/api/v1/auth", authRouter);

export default app;
