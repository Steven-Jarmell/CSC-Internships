import mongoose, { Schema, model } from "mongoose";

export interface IJob {
	companyName: string;
	jobDescription: string;
	locations: string[];
	sponsorshipStatus: Boolean;
	jobStatus: Boolean;
	jobLink: string;
	contributor?: string;
}

const jobSchema = new Schema<IJob>({
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
		default: "Anonymous",
	},
});

export default model<IJob>("Job", jobSchema);
