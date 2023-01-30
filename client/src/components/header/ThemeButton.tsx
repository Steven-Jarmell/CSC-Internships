import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import "../../styles/themeButton.component.css";

const ThemeButton = () => {
    const userPrefersDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;

    const [theme, setTheme] = useState<boolean>(
        localStorage.getItem("dark-theme")
            ? localStorage.getItem("dark-theme") === "true"
            : userPrefersDark
            ? true
            : false
    );

    useEffect(() => {
        if (theme) {
            document.body.classList.add("dark-theme");
        } else {
            document.body.classList.remove("dark-theme");
        }
    }, [theme]);

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
