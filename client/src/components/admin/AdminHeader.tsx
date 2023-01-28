import { Link } from "react-router-dom";
import '../../styles/AdminHeader.css'

const AdminHeader = () => {
    return (
        <div className="admin-header-container">
            <p className="admin-header-title">Admin Dashboard</p>
            <Link to="/" className="admin-header-home-link">Home</Link>
        </div>
    );
}

export default AdminHeader;