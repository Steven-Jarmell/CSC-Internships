import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import "../../styles/themeButton.component.css";

// Component that renders the theme button for light/dark mode
const ThemeButton = () => {
    // Check if the user prefers dark mode in their browser
    const userPrefersDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;

    // If the user has dark-theme in their local storage, set that as the default
    // Otherwise, set the default to the user's browser preference
    const [theme, setTheme] = useState<boolean>(
        localStorage.getItem("dark-theme")
            ? localStorage.getItem("dark-theme") === "true"
            : userPrefersDark
            ? true
            : false
    );

    // Add/Remove the dark-theme class to the body if the user toggles it
    useEffect(() => {
        if (theme) {
            document.body.classList.add("dark-theme");
        } else {
            document.body.classList.remove("dark-theme");
        }
    }, [theme]);

    // Toggle the theme and save it to local storage
    const onThemeChange = (currentTheme: boolean) => {
        setTheme(currentTheme);
        localStorage.setItem("dark-theme", currentTheme ? "true" : "false");
    };

    return (
        <FontAwesomeIcon
            icon={theme ? faSun : faMoon}
            onClick={() => onThemeChange(!theme)}
            className="theme-button"
        />
    );
};

export default ThemeButton;
