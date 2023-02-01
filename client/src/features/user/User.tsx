import "../../styles/User.css";

type Props = {
    avatar_url?: string; // Link to the user's avatar image
    login?: string; // The user's username
};

// This component is used to display a user's avatar and username
const User = ({ avatar_url, login }: Props): JSX.Element => {
    return (
        <div className="user-container">
            {avatar_url && (
                <img src={avatar_url} alt="avatar" className="user-avatar" />
            )}
            <p>{login}</p>
        </div>
    );
};

export default User;
