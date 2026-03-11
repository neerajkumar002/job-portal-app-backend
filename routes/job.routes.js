import express from "express";
import {
  createJob,
  deleteJob,
  getJobDetails,
  getjobs,
  updateJob,
} from "../controllers/job.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { rolesMiddleare } from "../middleware/roles.Middleware.js";

const jobRouter = express.Router();

// Create Job
jobRouter.post(
  "/create",
  authMiddleware,
  rolesMiddleare("recruiter"),
  createJob,
);

//  Get Single Jobs
jobRouter.get("/:id", getJobDetails);

// Get all jobs details
jobRouter.get("/", getjobs);

//  Update Job
jobRouter.put("/:id", authMiddleware, rolesMiddleare("recruiter"), updateJob);

//  Delete Job
jobRouter.delete(
  "/:id",
  authMiddleware,
  rolesMiddleare("recruiter"),
  deleteJob,
);

export default jobRouter;
