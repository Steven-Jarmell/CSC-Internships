import AdminHeader from "./AdminHeader";
import AdminJobs from "./AdminJobs";
import "../../styles/AdminLayout.component.css";

// This is the main component for the admin dashboard
const AdminLayout = (): JSX.Element => {
    // Return the header and the jobs list
    return (
        <div className="admin-layout-container">
            <AdminHeader />
            <AdminJobs />
        </div>
    );
};

export default AdminLayout;
