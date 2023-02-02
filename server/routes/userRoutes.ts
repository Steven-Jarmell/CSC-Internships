import express, { Router } from "express";
import {
    getUser,
    createNewUser,
    updateUser,
    deleteUser,
} from "../controllers/userController";

const router: Router = express.Router();

router
    .route("/")
    .get(getUser)
    .post(createNewUser)
    .patch(updateUser)
    .delete(deleteUser);

module.exports = router;
