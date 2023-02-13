import express, { Router } from "express";
import {
    getAllReports,
    createNewReport,
    deleteReport,
} from "../controllers/reportsController";

const router: Router = express.Router();

router
    .route("/")
    .get(getAllReports)
    .post(createNewReport)
    .delete(deleteReport);

module.exports = router;
