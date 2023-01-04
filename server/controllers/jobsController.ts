import Job from "../models/Job";
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
	const {} = req.body;
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
