import { format } from "date-fns";
import { v4 as uuid } from "uuid";
import fs from "fs";
import path from "path";
import { NextFunction, Request, Response } from "express";

const logEvents = async (
	message: string,
	logFileName: string
): Promise<void> => {
	const dateTime: string = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
	const logItem: string = `${dateTime}\t${uuid()}\t${message}\n`;

	try {
		// If the log file does not exist, make it
		if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
			await fs.promises.mkdir(path.join(__dirname, "..", "logs"));
		}
		// Append to log file
		await fs.promises.appendFile(
			path.join(__dirname, "..", "logs", logFileName),
			logItem
		);
	} catch (err) {
		console.log(err);
	}
};

const logger = (req: Request, res: Response, next: NextFunction) => {
	logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, "reqLog.log");
	console.log(`${req.method} ${req.path}`);
	next();
};

export { logEvents, logger };
