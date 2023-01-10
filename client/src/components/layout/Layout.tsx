import JobPostingContainer from "./JobPostingContainer";
import LayoutButtons from "./LayoutButtons";
import "../../styles/layout.css";

const Layout = () => {
    return (
        <div className="layout-container">
            <LayoutButtons />
            <JobPostingContainer />
        </div>
    );
};

export default Layout;
