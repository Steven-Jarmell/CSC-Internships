import { Link } from "react-router-dom";

const AdminHeader = () => {
    return (
        <div className="admin-header-container">
            <h1>Admin Dashboard</h1>
            <Link to="/">Home</Link>
        </div>
    );
}

export default AdminHeader;