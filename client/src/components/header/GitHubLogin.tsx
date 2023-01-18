import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../styles/githubLogin.component.css";
import React, { useEffect, useState } from "react";

// Need to refactor this to use http only cookies instead of local storage

const GitHubLogin = () => {
    const [githubClientId, setGithubClientId] = useState<string>("");
    const [rerender, setRerender] = useState<boolean>(false);
    const [userData, setUserData] = useState<any>({});

    useEffect(() => {
        async function getGitHubClientID() {
            const fetchedGithubClientId = await fetch(
                "http://localhost:5000/auth/githubClientID"
            ).then((res) => res.json());
            setGithubClientId(fetchedGithubClientId);
        }
        getGitHubClientID();

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const codeParam = urlParams.get("code");

        console.log(codeParam);

        if (codeParam && localStorage.getItem("accessToken") === null) {
            async function getAccessToken() {
                await fetch(
                    `http://localhost:5000/auth/getAccessToken?code=${codeParam}`,
                    {
                        method: "GET",
                    }
                )
                    .then((res) => {
                        return res.json();
                    })
                    .then((data) => {
                        console.log(data);
                        if (data.access_token) {
                            localStorage.setItem(
                                "accessToken",
                                data.access_token
                            );
                            setRerender(!rerender);
                        }
                    });
            }
            getAccessToken();
        }
    }, []);

    async function getUserData() {
        await fetch("http://localhost:5000/auth/getUserData", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("accessToken"),
            },
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setUserData(data);
            });
    }

    return (
        <>
            {localStorage.getItem("accessToken") ? (
                <>
                    <button
                        onClick={() => {
                            localStorage.removeItem("accessToken");
                            setRerender(!rerender);
                        }}
                    >
                        Log out
                    </button>
                    <button onClick={getUserData}>Get Data</button>
                    {Object.keys(userData).length > 0 ? (
                        <>
                            <h1>Hey there {userData.login}</h1>
                        </>
                    ) : (
                        <></>
                    )}
                </>
            ) : (
                <button className="github-button">
                    <FontAwesomeIcon icon={faGithub} className="github-logo" />
                    <a
                        href={`https://github.com/login/oauth/authorize?client_id=${githubClientId}`}
                    >
                        Log in with GitHub
                    </a>
                </button>
            )}
        </>
    );
};

export default GitHubLogin;
