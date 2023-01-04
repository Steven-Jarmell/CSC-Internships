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

    // Delete this. Only used to add a type to duplicate variable
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

interface FullJob extends IJob {
    id: string;
}

// @desc Update a job
// @route PATCH /jobs
// @access Private
const updateJob = async (req: Request, res: Response) => {
    // Get data from request body
    const {
        id,
        companyName,
        jobDescription,
        locations,
        sponsorshipStatus,
        jobStatus,
        jobLink,
    }: FullJob = req.body;

    // Check inputs. contributor field is immutable and should not change
    if (
        !id ||
        !companyName ||
        !jobDescription ||
        !Array.isArray(locations) ||
        !locations.length ||
        typeof sponsorshipStatus !== "boolean" ||
        typeof jobStatus !== "boolean" ||
        !jobLink
    ) {
        return res
            .status(400)
            .json({ message: `All fields are required: ${id}` });
    }

    // Confirm that the job to be updated exists

    const job = await Job.findById(id).exec();

    if (!job) {
        return res.status(400).json({ message: "Note not found" });
    }

    // Check if this will cause a duplicate company to occur
    const duplicate = await Job.findOne({ companyName })
        .collation({ locale: "en", strength: 2 })
        .lean()
        .exec();

    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: "Company name already exists!" });
    }

    // Delete this. Only used to add a type to a job.
    console.log(job);

    // Update the job
    job.companyName = companyName;
    job.jobDescription = jobDescription;
    job.locations = locations;
    job.sponsorshipStatus = sponsorshipStatus;
    job.jobStatus = jobStatus;
    job.jobLink = jobLink;

    const updatedJob = await job.save();

    res.json(`${updatedJob.companyName} job updated`);
};

// @desc Delete a job
// @route DELETE /jobs
// @access Private
const deleteJob = async (req: Request, res: Response) => {};

export { getAllJobs, createNewJob, updateJob, deleteJob };
