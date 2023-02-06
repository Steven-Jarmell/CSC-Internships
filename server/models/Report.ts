import { Schema, model } from "mongoose";

export interface IReport {
    jobID: string;
    reportCategory: string[];
    reportMessage: string;
    numTimesReported: number;
}

const reportSchema = new Schema<IReport>({
    jobID: {
        type: String,
        required: true,
    },
    reportCategory: {
        type: [String],
        required: true,
    },
    reportMessage: {
        type: String,
        required: true,
    },
    numTimesReported: {
        type: Number,
        required: true,
        default: 1,
    },
});

export default model<IReport>("Report", reportSchema);
