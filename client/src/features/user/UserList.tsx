import { useGetAllUsersQuery } from "./userApiSlice";
import "../../styles/UserList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import EditPermissionsForm from "../../components/auth/EditPermissionsForm";
import { IUser } from "./userApiSlice";

type Props = {
    toggleModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const UserList = ({ toggleModal }: Props) => {
    const { data: users } = useGetAllUsersQuery();

    const onUserClicked = (user: IUser) => {
        setReturnContent(
            <EditPermissionsForm
                user={user}
                toggleModal={toggleModal}
            />
        );
    };

    const content: JSX.Element = (
        <div className="user-list-container">
            <h2 className="user-list-title">User List</h2>
            <ul className="user-list-items">
                {users?.map((user) => (
                    <div key={user.id} className="user-list-item">
                        <p className="user-username"><b>Username:</b> {user.login}</p>
                        <p className="user-id"><b>Id:</b> {user.id}</p>
                        <p className="user-roles"><b>Role(s):</b> {user.roles.join(", ")}</p>
                        <FontAwesomeIcon
                            icon={faBars}
                            className="user-edit-icon"
                            onClick={() => onUserClicked(user)}
                        />
                    </div>
                ))}
            </ul>
        </div>
    );

    const [returnContent, setReturnContent] = useState<JSX.Element>(content);

    return returnContent;
};

export default UserList;
