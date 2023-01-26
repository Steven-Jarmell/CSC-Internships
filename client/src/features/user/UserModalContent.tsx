import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getUser, removeUser } from "./userSlice";
import '../../styles/UserModalContent.css'

type Props = {
    login: string;
    setRerender: React.Dispatch<React.SetStateAction<boolean>>;
    rerender: boolean;
};

const UserModalContent = ({ login, setRerender, rerender }: Props) => {
    const user = useAppSelector(getUser);
    const dispatch = useAppDispatch();
    return (
        <div className="user-modal-content-container">
            <p className="user-modal-content-title">Hello {login}!</p>
            {user.roles.includes("Admin") ? (
                <Link className="user-modal-admin-link" to="/admin">
                    Admin Page
                </Link>
            ) : null}
            <button
                className="user-modal-logout-button"
                onClick={() => {
                    localStorage.removeItem("accessToken");
                    dispatch(removeUser());
                    setRerender(!rerender);
                }}
            >
                Log out
            </button>
        </div>
    );
};

export default UserModalContent;
