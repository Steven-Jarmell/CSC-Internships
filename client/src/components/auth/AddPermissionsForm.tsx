import { useState } from "react";
import { ROLES } from "../../config/roles";
import { useAddNewUserMutation } from "../../features/user/userApiSlice";
import { IUser } from "../../features/user/userSlice";
import "../../styles/form.css";

type Props = {
    toggleModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddPermissionsForm = ({ toggleModal }: Props): JSX.Element => {
    const [addUser, { isLoading, isSuccess, isError, error }] =
        useAddNewUserMutation();
    const [userID, setUserID] = useState<number>(0);
    const [roles, setRoles] = useState<string[]>(["User"]);

    const options: JSX.Element[] = Object.values(ROLES).map((role) => {
        return (
            <option key={role} value={role}>
                {role}
            </option>
        );
    });

    const onRolesChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const values = Array.from(
            e.target.selectedOptions, //HTMLCollection
            (option) => option.value
        );
        setRoles(values);
    };

    const onUserIDChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserID(Number(e.target.value));
    };

    let canSave: boolean = userID > 0 && !isLoading;

    const onSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        if (canSave) {
            await addUser({ id: userID, roles: roles } as IUser);
        }

        toggleModal(false);
    };

    return (
        <>
            <form className="form">
                <h2 className="form-title">Add User</h2>
                <button
                    className="form-button form-save-button"
                    title="Save"
                    onClick={onSubmit}
                    disabled={!canSave}
                >
                    Save
                </button>
                <label className="" htmlFor="userID">
                    User ID:
                </label>
                <input
                    id="userID"
                    name="userID"
                    className="form-text-input"
                    type="text"
                    value={userID}
                    onChange={onUserIDChanged}
                />
                <label className="" htmlFor="roles">
                    Roles:
                </label>
                <select
                    id="roles"
                    name="roles"
                    multiple={true}
                    size={3}
                    onChange={onRolesChanged}
                    value={roles}
                >
                    {options}
                </select>
            </form>
        </>
    );
};

export default AddPermissionsForm;
