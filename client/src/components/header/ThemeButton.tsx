import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import '../../styles/themeButton.component.css'

const ThemeButton = () => {
    const [theme, setTheme] = useState(true);

    return <FontAwesomeIcon icon={theme ? faSun : faMoon} onClick={() => setTheme(!theme)} className="theme-button"/>
}

export default ThemeButton;