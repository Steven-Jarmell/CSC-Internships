import PittLogo from "../../assets/pitt-logo.svg";
import GitHubLogin from "./GitHubLogin";
import ThemeButton from "./ThemeButton";
import "../../styles/header.component.css";
import { getUser } from "../../features/user/userSlice";
import { useAppSelector } from "../../app/hooks";
import { Link } from "react-router-dom";

const Header = () => {
    const user = useAppSelector(getUser);
    return (
        <header className="header-container">
            <img
                src={PittLogo}
                alt="Pitt Logo"
                className="header-pitt-logo"
            ></img>
            <h1 className="header-title">Summer 2023 Internships</h1>
            <div className="header-buttons">
                <ThemeButton />
                {user.roles.includes("Admin") ? (
                    <Link className="header-admin-link" to="/admin">Admin</Link>
                ) : (
                    <></>
                )}
                <GitHubLogin />
            </div>
        </header>
    );
};

export default Header;
