import express, { Router, Request, Response } from "express";
import path from "path";

const root: Router = express.Router();

// Send index.html on
root.get("^/$|/index(.html)?", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

module.exports = root;
