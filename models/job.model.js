import mongoose, { Schema } from "mongoose";

const jobSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
    },
    location: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      enum: ["full-time", "part-time", "internship", "contract"],
      required: true,
    },
    experienceLevel: {
      type: String,
      enum: ["fresher", "junior", "senior"],
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "candidate",
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Jobs", jobSchema);
