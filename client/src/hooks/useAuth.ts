import { useAppSelector } from "../app/hooks";
import { getUser, IUser } from "../features/user/userSlice";

const useAuth = () => {
    const user: IUser = useAppSelector(getUser);

    let isAdmin: boolean = false;
    let status: string = "User";

    if (user) {
        const { login, roles } = user;

        isAdmin = roles.includes("Admin");

        if (isAdmin) status = "Admin";

        return { login, roles, status, isAdmin };
    }

    return { login: "", roles: [], isAdmin, status };
};
export default useAuth;
