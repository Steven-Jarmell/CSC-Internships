import { useState } from "react";
import { Link } from "react-router-dom";
import UserList from "../../features/user/UserList";
import useAuth from "../../hooks/useAuth";
import "../../styles/AdminHeader.css";
import PermissionsForm from "../auth/AddPermissionsForm";
import ThemeButton from "../header/ThemeButton";
import Modal from "../modals/Modal";

// This is the header for the admin dashboard
const AdminHeader = (): JSX.Element => {
    const { isAdmin }: { isAdmin: boolean } = useAuth();
    const [showAddUserRoles, setShowAddUserRoles] = useState<boolean>(false);
    const [showEditUserRoles, setShowEditUserRoles] = useState<boolean>(false);

    // Method to the add user permissions modal
    const openAddUserRolesModal = () => {
        setShowAddUserRoles(true);
    };

    // Method to the edit user permissions modal
    const openEditUserRolesModal = () => {
        setShowEditUserRoles(true);
    };

    return (
        <div className="admin-header-container">
            <p className="admin-header-title">Admin Dashboard</p>
            {isAdmin && (
                <>
                    <button
                        className="admin-header-add-permissions-button"
                        onClick={openAddUserRolesModal}
                    >
                        Add Permissions
                    </button>
                    <button
                        className="admin-header-add-permissions-button"
                        onClick={openEditUserRolesModal}
                    >
                        Edit Permissions
                    </button>
                </>
            )}
            {(showAddUserRoles && !showEditUserRoles) ? (
                <Modal
                    toggleModal={setShowAddUserRoles}
                    content={<PermissionsForm toggleModal={setShowAddUserRoles}/>}
                />
            ) : null}
            {(!showAddUserRoles && showEditUserRoles) ? (
                <Modal
                    toggleModal={setShowEditUserRoles}
                    content={<UserList toggleModal={setShowEditUserRoles}/>}
                />
            ) : null}
            <ThemeButton />
            <Link to="/" className="admin-header-home-link">
                Home
            </Link>
        </div>
    );
};

export default AdminHeader;
