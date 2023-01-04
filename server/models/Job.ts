import mongoose, { Schema, model } from "mongoose";

interface Job {
	companyName: string;
	jobDescription: string;
	locations: string[];
	sponsorshipStatus: Boolean;
	jobStatus: Boolean;
	jobLink: string;
	contributor?: string;
}

const jobSchema = new Schema<Job>({
	companyName: {
		type: String,
		required: true,
	},
	jobDescription: {
		type: String,
		required: true,
	},
	locations: {
		type: [String],
		required: true,
	},
	sponsorshipStatus: {
		type: Boolean,
		required: true,
	},
	jobStatus: {
		type: Boolean,
		required: true,
	},
	jobLink: {
		type: String,
		required: true,
	},
	contributor: {
		type: String,
		required: false,
	},
});

export default model<Job>("Job", jobSchema);
