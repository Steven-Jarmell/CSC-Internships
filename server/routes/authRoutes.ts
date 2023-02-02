import express, { Router, Request, Response } from "express";
import { RequestInfo, RequestInit } from "node-fetch";

const fetch = (url: RequestInfo, init?: RequestInit) =>  import("node-fetch").then(({ default: fetch }) => fetch(url, init));

const router: Router = express.Router();

// Route used to retrieve the client ID from the server
router.route("/githubClientID").get((req: Request, res: Response) => {
    res.json(process.env.GITHUB_CLIENT_ID);
});

// Route used to retrieve the user's github access token
router.route("/getAccessToken").get((req: Request, res: Response) => {
    const { query } = req;
    const { code } = query;

    if (!code) {
        return res.json({
            success: false,
            message: "Error: No code",
        });
    }

    fetch(
        `https://github.com/login/oauth/access_token?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}&code=${code}`,
        {
            method: "POST",
            headers: {
                Accept: "application/json",
            },
        }
    )
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            res.json(data);
        });
});

// Route used to retrieve the user's github data
router.route("/getUserData").get((req: Request, res: Response) => {
    fetch("https://api.github.com/user", {
        method: "GET",
        headers: {
            Authorization: req.get("Authorization")!,
        },
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            res.json(data);
        });
});

module.exports = router;
