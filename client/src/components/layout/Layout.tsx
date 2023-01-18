import JobPostingContainer from "./JobPostingContainer";
import LayoutButtons from "./LayoutButtons";
import "../../styles/layout.css";
import Header from "../header/Header";

const Layout = () => {
    return (
        <>
            <Header />
            <div className="layout-container">
                <LayoutButtons />
                <JobPostingContainer />
            </div>
        </>
    );
};

export default Layout;
