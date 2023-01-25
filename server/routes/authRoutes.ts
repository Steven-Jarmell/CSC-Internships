import express, { Router, Request, Response, json } from "express";

const router: Router = express.Router();

router.route("/githubClientID").get((req: Request, res: Response) => {
    res.json(process.env.GITHUB_CLIENT_ID);
});

router.route("/getAccessToken").get((req: Request, res: Response) => {
    const { query } = req;
    const { code } = query;

    if (!code) {
        return res.json({
            success: false,
            message: "Error: No code",
        });
    }

    fetch(`https://github.com/login/oauth/access_token?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}&code=${code}`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
        }
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            res.json(data);
        });
});

// getUserData
// Access token is going to be passed in as an auth header

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
