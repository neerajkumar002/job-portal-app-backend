import Jobs from "../models/job.model.js";

//create job
export const createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      company,
      location,
      salary,
      jobType,
      experienceLevel,
      skills,
      postedBy,
    } = req.body;

    const newJobs = await Jobs.create({
      title,
      description,
      company,
      location,
      salary,
      jobType,
      experienceLevel,
      skills,
      postedBy,
    });

    return res.status(201).json({
      success: true,
      message: "Job created successfully",
      data: newJobs,
    });
  } catch (error) {
    console.error(error);
  }
};

// Read jobs
export const getJobDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const jobDetails = await Jobs.findById(id);
    if (!jobDetails) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }
    return res.status(200).json({ success: true, data: jobDetails });
  } catch (error) {
    console.log(error);
  }
};

// Update job
export const updateJobDetails = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
  }
};

// Delete job
export const deleteJobDetails = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
  }
};
