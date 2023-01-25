import { Route, Routes } from "react-router-dom";
import AdminLayout from "./components/admin/AdminLayout";
import RequireAuth from "./components/auth/RequireAuth";
import ContentLayout from "./components/layout/ContentLayout";
import Layout from "./components/layout/Layout";
import "./styles/App.css";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />} >
                {/* At / display the content layout */}
                <Route index element={<ContentLayout />} />

                {/* Protect the admin dashboard route */}
                <Route element={<RequireAuth allowedRoles={["Admin"]} />} >
                    <Route path="admin" element={<AdminLayout />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
