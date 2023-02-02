import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../styles/githubLogin.component.css";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { addUser, IUser } from "../../features/user/userSlice";
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

// Component that renders the GitHub login button or the user's GitHub profile
const GitHubLogin = (): JSX.Element => {
    const [githubClientId, setGithubClientId] = useState<string>("");
    const [rerender, setRerender] = useState<boolean>(false);
    const [userData, setUserData] = useState<UserData>({} as UserData);
    const [showUserModal, setShowUserModal] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    // Get the user's data from the GitHub API
    async function getUserData() {
        await fetch("https://pittcsc-api/auth/getUserData", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("accessToken"), // Make sure "Authorization" is in quotes
            },
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setUserData(data);
            });
    }

    // Whenever userData is retrieved, get the user's roles from the database
    useEffect(() => {
        async function getUserRoles() {
            await fetch(`https://pittcsc-api/user?id=${userData.id}`, {
                method: "GET",
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    // If the user has roles, add them to the user object
                    if (data.roles) {
                        dispatch(
                            addUser({
                                id: userData.id,
                                login: userData.login,
                                html_url: userData.html_url,
                                avatar_url: userData.avatar_url,
                                roles: data.roles,
                            } as IUser)
                        );
                    // Else if the user is not in the database, give them a default role of "User"
                    } else {
                        dispatch(
                            addUser({
                                id: userData.id,
                                login: userData.login,
                                html_url: userData.html_url,
                                avatar_url: userData.avatar_url,
                                roles: ["User"],
                            } as IUser)
                        );
                    }
                });
        }

        // Only call getUserRoles if the user has an id from logging in
        if (userData.id) getUserRoles();
    }, [userData]);

    // Get the GitHub client ID from the server on page load after the GitHub API returns to this page
    useEffect(() => {
        // Get the code parameter from the URL
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const codeParam = urlParams.get("code");

        // Set the href back to /
        window.history.pushState({}, "", "/");

        // If the code parameter exists and the user is not logged in, get the access token from the server
        if (codeParam && localStorage.getItem("accessToken") === null) {
            async function getAccessToken() {
                await fetch(
                    `https://pittcsc-api/auth/getAccessToken?code=${codeParam}`,
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
                            // Rerender the component after getting the access token
                            setRerender(!rerender);
                        }
                    });
            }
            // Call getAccessToken
            getAccessToken();
        }
    }, []);

    // If we rerender this component, and the access token exists, get the user's data
    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            getUserData();
        }
    }, [rerender]);

    // When the login button is clicked, redirect to the GitHub login page
    const onLoginClicked = () => {
        async function getGitHubClientID() {
            await fetch(
                "https://pittcsc-api/auth/githubClientID"
            ).then((res) => res.json()).then((data) => {
                window.location.href = `https://github.com/login/oauth/authorize?client_id=${data}`;
                setGithubClientId(data);
            });
        }
        getGitHubClientID();
    };

    return (
        <>
            {/* 
                If the user is logged in display their GitHub profile picture
                If the user is not logged in, display the GitHub login button
            */}
            {localStorage.getItem("accessToken") ? (
                <>
                    {Object.keys(userData).length > 0 ? (
                        <img
                            src={userData.avatar_url}
                            alt="avatar"
                            className="user-avatar"
                            onClick={() => setShowUserModal(true)}
                        />
                    ) : (
                        <></>
                    )}
                    {showUserModal ? (
                        <Modal
                            toggleModal={() => setShowUserModal(false)}
                            content={
                                <UserModalContent
                                    login={userData.login}
                                    setRerender={setRerender}
                                    rerender={rerender}
                                />
                            }
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
