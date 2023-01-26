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
                <p style={{ marginTop: 'auto'}}>Made with ❤️ by Pitt CSC</p>
            </div>
        </>
    );
};

export default Layout;
