import express, { Router } from "express";
import {
    getAllJobs,
    createNewJob,
    updateJob,
    deleteJob,
} from "../controllers/jobsController";

const router: Router = express.Router();

router
    .route("/")
    .get(getAllJobs)
    .post(createNewJob)
    .patch(updateJob)
    .delete(deleteJob);

module.exports = router;
