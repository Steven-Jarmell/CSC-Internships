import PittLogo from "../../assets/pitt-logo.svg";
import GitHubLogin from "./GitHubLogin";
import ThemeButton from "./ThemeButton";
import "../../styles/header.component.css";

// This is the header for the home page
const Header = (): JSX.Element => {
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
                <GitHubLogin />
            </div>
        </header>
    );
};

export default Header;
