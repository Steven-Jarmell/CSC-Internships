import { useGetJobsQuery } from "../../features/jobs/jobApiSlice";
import "../../styles/AdminJobPostingContainer.css";
import Job from "../../features/jobs/Job";
import { useState } from "react";
import UnpublishedJobsList from "./UnpublishedJobsList";

// This is the main component for the admin dashboard which displays the list of jobs and the currently selected job
const AdminJobs = (): JSX.Element => {
    // Get the jobs from the database
    const { data: jobs, isSuccess, error } = useGetJobsQuery();

    const [jobShownId, setJobShownId] = useState<string>("");

    // Define an empty layout to display in the case that there are no jobs
    const emptyLayout = (
        <div className="admin-job-posting-container">
            <div className="admin-job-posting-container-object admin-job-postings">
                <div className="admin-joblist-container"></div>
            </div>
            <div className="admin-job-posting-container-object admin-job-displayed">
                <p className="admin-job-posting-null">No Jobs To Display</p>
            </div>
        </div>
    );

    // If the query was successful, get the first job if it exists
    if (isSuccess) {
        // Get the unpublished jobs
        const unpublishedJobs = jobs?.filter((job) => !job.published);

        // If there are no unpublished jobs, return the empty layout
        if (unpublishedJobs?.length === 0) return emptyLayout;

        // If there are published jobs, return the layout with the first job displayed
        return (
            <div className="admin-job-posting-container">
                <div className="admin-job-posting-container-object admin-job-postings">
                    <UnpublishedJobsList setJobShownId={setJobShownId} />
                </div>
                <div className="admin-job-posting-container-object">
                    <Job
                        jobs={unpublishedJobs}
                        key={jobShownId}
                        jobId={
                            jobShownId
                                ? jobShownId
                                : unpublishedJobs[0]
                                ? unpublishedJobs[0]._id!
                                : ""
                        }
                        setJobShownId={setJobShownId}
                    />
                </div>
            </div>
        );
    // If there was an error, return the empty layout
    } else if (error) {
        return emptyLayout;
    // If the query is still loading, return a loading message
    } else {
        return <h1>Loading...</h1>;
    }
};

export default AdminJobs;
