import Report, { IReport } from "../models/Report";
import { Request, Response } from "express";

// CRUD Operations: Create, Read, Update, Delete

// @desc Get all reports
// @route GET /reports
// @access Private
const getAllReports = async (req: Request, res: Response) => {
    const reports = await Report.find().lean();

    if (!reports?.length) {
        return res.status(400).json({ message: "No reports found" });
    }

    res.json(reports);
};

// @desc Create a new report
// @route POST /report
// @access Private
const createNewReport = async (req: Request, res: Response) => {
    // Get the data from the request body
    const {
        jobID,
        reportCategory,
        reportMessage,
    }: IReport = req.body;

    // Confirm the data
    if (
        !jobID ||
        !Array.isArray(reportCategory) ||
        !reportCategory.length ||
        !reportMessage
    ) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Check if someone already reported the job
    const duplicate = await Report.findOne({ jobID })
        .collation({ locale: "en", strength: 2 })
        .exec();

    // If the job has already been reported, increment the number of times reported and return
    if (duplicate) {
        // Increment the number of times reported
        duplicate.numTimesReported += 1;
        // Union the duplicate report categories with the new report categories without including duplicates
        duplicate.reportCategory = [...new Set([...duplicate.reportCategory, ...reportCategory])];
        // Add the new report message to the list of report messages
        duplicate.reportMessageList.push(reportMessage);

        // Save the updated report
        await duplicate.save();
        return res.status(200).json({ message: "Job has been reported already and was updated" });
    }

    // Create a new report and add it to the database
    const newReport: IReport = {
        jobID,
        reportCategory,
        reportMessage,
        reportMessageList: [reportMessage],
        numTimesReported: 1,
    };

    const report = await Report.create(newReport);

    if (report) {
        return res.status(201).json({ message: "Job has been reported" });
    } else {
        return res.status(400).json({ message: "Invalid Report data received wrong" });
    }

};

// @desc Delete a report
// @route DELETE /reports
// @access Private
const deleteReport = async (req: Request, res: Response) => {
    const { id } : { id: string } = req.body;

    if (!id) {
        return res.status(400).json({ message: "No id provided" });
    }

    const report = await Report.findByIdAndDelete(id);

    if (report) {
        return res.status(200).json({ message: "Report deleted" });
    } else {
        return res.status(400).json({ message: "Invalid Report data received wrong" });
    }
};

export { getAllReports, createNewReport, deleteReport };
