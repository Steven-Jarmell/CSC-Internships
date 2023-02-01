import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

type Props = {
    allowedRoles: string[];
};

const RequireAuth = ({ allowedRoles }: Props) => {
    const location = useLocation();
    const { roles }: { roles: string[]} = useAuth();

    const content =
        // If we find one of the roles thats all we need
        roles.some((role) => allowedRoles.includes(role)) ? (
            <Outlet />
        ) : (
            // Replace this, we don't want the require auth in the history
            // If someone tries to access the user settings and uses back, it goes back to auth which we don't want
            <Navigate to="/" state={{ from: location }} replace />
        );

    return content;
};
export default RequireAuth;
