import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { store } from "../../app/store";
import { userApiSlice } from "../../features/user/userApiSlice";

const Prefetch = () => {
    useEffect(() => {
        store.dispatch(userApiSlice.endpoints.getAllUsers.initiate());
    }, []);

    return <Outlet />
}

export default Prefetch;