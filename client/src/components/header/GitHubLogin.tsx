import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../styles/githubLogin.component.css'

const GitHubLogin = () => {
    return (
        <button className="github-button">
            <FontAwesomeIcon icon={faGithub} className="github-logo"/>
            <p>Log in with GitHub</p>
        </button>
    )
}

export default GitHubLogin;