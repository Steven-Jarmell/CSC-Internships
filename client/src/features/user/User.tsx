import "../../styles/User.css";

type Props = {
    avatar_url?: string;
    login?: string;
};
const User = ({ avatar_url, login }: Props) => {
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
