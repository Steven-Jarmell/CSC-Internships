import AdminHeader from "./AdminHeader";
import AdminJobs from "./AdminJobs";
import "../../styles/AdminLayout.component.css";

const AdminLayout = () => {
    return (
        <div className="admin-layout-container">
            <AdminHeader />
            <AdminJobs />
        </div>
    );
};

export default AdminLayout;
