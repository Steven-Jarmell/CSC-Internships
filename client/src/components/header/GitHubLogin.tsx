import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../styles/githubLogin.component.css";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
    addUser,
    removeUser,
    IUser,
    getUser,
} from "../../features/user/userSlice";
import User from "../../features/user/User";
import { Link } from "react-router-dom";
import Modal from "../modals/Modal";
import UserModalContent from "../../features/user/UserModalContent";

// Need to refactor this to use http only cookies instead of local storage

// Create a type for the user data that is returned from the GitHub API
type UserData = {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
    name: string;
    company: string;
    blog: string;
    location: string;
    email: string;
    hireable: string;
    bio: string;
    twitter_username: string;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    created_at: string;
    updated_at: string;
};

const GitHubLogin = () => {
    const [githubClientId, setGithubClientId] = useState<string>("");
    const [rerender, setRerender] = useState<boolean>(false);
    const [userData, setUserData] = useState<UserData>({} as UserData);
    const [showUserModal, setShowUserModal] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    async function getUserData() {
        await fetch("http://localhost:5000/auth/getUserData", {
            method: "GET",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken"), // Make sure "Authorization" is in quotes
            },
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setUserData(data);
            });
    }

    useEffect(() => {
        async function getUserRoles() {
            await fetch(`http://localhost:5000/user?id=${userData.id}`, {
                method: "GET",
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    if (data) {
                        dispatch(addUser({
                            id: userData.id,
                            login: userData.login,
                            html_url: userData.html_url,
                            avatar_url: userData.avatar_url,
                            roles: data.roles,
                        } as IUser));
                    } else {
                        dispatch(addUser({
                            id: userData.id,
                            login: userData.login,
                            html_url: userData.html_url,
                            avatar_url: userData.avatar_url,
                            roles: ["User"],
                        } as IUser));
                    }
                });
        }
        if (userData.id) getUserRoles();
    }, [userData]);

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

        // Set the href back to /
        window.history.pushState({}, "", "/");

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

    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            getUserData();
        }
    }, [rerender]);

    const onLoginClicked = () => {
        window.location.href = `https://github.com/login/oauth/authorize?client_id=${githubClientId}`;
    };

    return (
        <>
            {localStorage.getItem("accessToken") ? (
                <>
                    {Object.keys(userData).length > 0 ? (
                        <img src={userData.avatar_url} alt="avatar" className="user-avatar" onClick={() => setShowUserModal(true)} />
                    ) : (
                        <></>
                    )}
                    {showUserModal ? (
                        <Modal
                            toggleModal={() => setShowUserModal(false)}
                            content={<UserModalContent login={userData.login} setRerender={setRerender} rerender={rerender}/>}
                        />
                    ) : null}
                </>
            ) : (
                <div
                    className="github-login-container"
                    onClick={onLoginClicked}
                >
                    <FontAwesomeIcon icon={faGithub} className="github-logo" />
                    <p className="github-login-text">Log in with GitHub</p>
                </div>
            )}
        </>
    );
};

export default GitHubLogin;
