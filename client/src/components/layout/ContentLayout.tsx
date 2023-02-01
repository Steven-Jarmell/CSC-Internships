import JobPostingContainer from "./JobPostingContainer";
import LayoutButtons from "./LayoutButtons";
import "../../styles/layout.css";
import Header from "../header/Header";
import Footer from "../footer/Footer";

// This is the main component for the home page
const Layout = (): JSX.Element => {
    return (
        <>
            <Header />
            <div className="layout-container">
                <LayoutButtons />
                <JobPostingContainer />
                <Footer />
            </div>
        </>
    );
};

export default Layout;
