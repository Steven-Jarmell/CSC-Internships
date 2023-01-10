import { useState } from "react";
import "../../styles/layoutButtons.component.css";
import NewJobForm from "../../features/jobs/NewJobForm";
import Modal from "../modals/Modal";

const LayoutButtons = () => {
    const [showFilter, setShowFilter] = useState(false);
    const [showAddJob, setShowAddJob] = useState(false);

    const openFilterModal = () => {
        setShowFilter(true);
    };

    const openAddJobModal = () => {
        setShowAddJob(true);
    };

    return (
        <div className="layoutButtons-container">
            <button
                className="layout-button layout-filter-button"
                onClick={openFilterModal}
            >
                Filter
            </button>
            <button
                className="layout-button layout-add-button"
                onClick={openAddJobModal}
            >
                Add Job
            </button>
            {/* Ensure that the filter and add job modals cannot be open at the same time */}
            {showFilter && !showAddJob ? <h1>Hi</h1> : null}
            {showAddJob && !showFilter ? (
                <Modal
                    toggleModal={setShowAddJob}
                    content={<NewJobForm toggleModal={setShowAddJob} />}
                />
            ) : null}
        </div>
    );
};

export default LayoutButtons;
