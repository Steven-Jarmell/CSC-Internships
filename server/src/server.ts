require("dotenv").config();
require("express-async-errors"); // Add this for unexpected async events

import express, { Express, Request, Response } from "express";
import connectDB from "../config/connectDB";
import mongoose from "mongoose";
import { logEvents, logger } from "../middleware/logEvents";
import path from "path";

const app: Express = express();
const port: Number = Number(process.env.PORT || 8000); // Change to be in dotenv

connectDB();

// Use the logger to keep track of what events happen
app.use(logger);

// Built in middleware to parse incoming JSON requests and put the parsed data in req
app.use(express.json());

// For the base, use root routes
app.use("/", require("../routes/root"));

// For the jobs, use job routes
//app.use("/jobs", require("../routes/jobRoutes"));

// Catch every wrong path
app.all("*", (req, res) => {
	res.status(404);
	if (req.accepts("html")) {
		res.sendFile(path.join(__dirname, "views", "404.html"));
	} else if (req.accepts("json")) {
		res.json({ message: "404 Not Found" });
	} else {
		res.type("txt").send("404 Not Found");
	}
});

// Once we connect to the database, have the app start listening
mongoose.connection.once("open", () => {
	console.log("Connected to MongoDB");
	app.listen(port, () => {
		console.log(`[Server]: I am running at http://localhost:${port}`);
	});
});

// If there is an error with mongoDBm log it
mongoose.connection.on("error", (err) => {
	console.log(err);
	logEvents(
		`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
		"mongoErrLog.log"
	);
});
