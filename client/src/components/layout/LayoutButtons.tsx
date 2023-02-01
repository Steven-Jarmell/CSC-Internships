import { useState } from "react";
import "../../styles/layoutButtons.component.css";
import NewJobForm from "../../features/jobs/NewJobForm";
import Modal from "../modals/Modal";
import NewFilterForm from "../../features/filter/NewFilterForm";

// This component contains the buttons for the layout and displays the modals if they are clicked
const LayoutButtons = (): JSX.Element => {
    const [showFilter, setShowFilter] = useState<boolean>(false);
    const [showAddJob, setShowAddJob] = useState<boolean>(false);

    // Method to the filter modal
    const openFilterModal = () => {
        setShowFilter(true);
    };

    // Method to open the add job modal
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
            {showFilter && !showAddJob ? (
                <Modal
                    toggleModal={setShowFilter}
                    content={<NewFilterForm toggleModal={setShowFilter} />}
                />
            ) : null}
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
