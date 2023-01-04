import Job, { IJob } from "../models/Job";
import { Request, Response } from "express";

// CRUD Operations: Create, Read, Update, Delete

// @desc Get all jobs
// @route GET /jobs
// @access Private
const getAllJobs = async (req: Request, res: Response) => {
    const jobs = await Job.find().lean();

    if (!jobs?.length) {
        return res.status(400).json({ message: "No jobs found" });
    }

    res.json(jobs);
};

// @desc Create a new job
// @route POST /jobs
// @access Private
const createNewJob = async (req: Request, res: Response) => {
    // Get variables from the request body
    const {
        companyName,
        jobDescription,
        locations,
        sponsorshipStatus,
        jobStatus,
        jobLink,
        contributor,
    }: IJob = req.body;

    // Confirm the data
    // Contributor is optional, they should be able to opt in/out of posting their identity
    if (
        !companyName ||
        !jobDescription ||
        !Array.isArray(locations) ||
        !locations.length ||
        typeof sponsorshipStatus !== "boolean" ||
        typeof jobStatus !== "boolean" ||
        !jobLink
    ) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Check if someone already posted the company name
    // Find one of the company name, case insensitive, use lean to get rid of the fluff
    // exec() is technically not needed. It allows for a better stack trace in the case of failure
    const duplicate = await Job.findOne({ companyName })
        .collation({ locale: "en", strength: 2 })
        .lean()
        .exec();

    console.log(typeof duplicate);

    // If there is a duplicate, throw a 409 error
    if (duplicate) {
        return res.status(409).json({ message: "Duplicate job" });
    }

    // Create the job object to add to the database
    const jobObject: IJob = contributor
        ? {
              companyName,
              jobDescription,
              locations,
              sponsorshipStatus,
              jobStatus,
              jobLink,
              contributor,
          }
        : {
              companyName,
              jobDescription,
              locations,
              sponsorshipStatus,
              jobStatus,
              jobLink,
          };

    const job = await Job.create(jobObject);

    if (job) {
        res.status(201).json({ message: "New job created" });
    } else {
        res.status(400).json({ message: "Invalid job data received" });
    }
};

// @desc Update a job
// @route PATCH /jobs
// @access Private
const updateJob = async (req: Request, res: Response) => {};

// @desc Delete a job
// @route DELETE /jobs
// @access Private
const deleteJob = async (req: Request, res: Response) => {};

export { getAllJobs, createNewJob, updateJob, deleteJob };
