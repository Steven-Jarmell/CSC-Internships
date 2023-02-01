import { Outlet } from "react-router-dom";

// Outlet is used in parent route elements to render their child route elements
// Allos nested UI to show up when child routes are rendered
// If the parent route is matches exactly, it renders a child index route or nothing if there is no index route

const Layout = (): JSX.Element => {
    return <Outlet />;
};

export default Layout;
