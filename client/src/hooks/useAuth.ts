import { useAppSelector } from "../app/hooks";
import { getUser } from "../features/user/userSlice";

const useAuth = () => {
    const user = useAppSelector(getUser);

	let isAdmin = false;
	let status = "User";

	if (user) {
		const { login, roles } = user;

		isAdmin = roles.includes("Admin");

		if (isAdmin) status = "Admin";

		return { login, roles, status, isAdmin };
	}

	return { login: "", roles: [], isAdmin, status };
};
export default useAuth;