import { useGetJobsQuery } from "../../features/jobs/jobApiSlice";
import "../../styles/jobPostingContainer.css";
import Job from "../../features/jobs/Job";
import { useState } from "react";
import UnpublishedJobsList from "./UnpublishedJobsList";

const AdminJobs = () => {
    const { data: jobs, isSuccess, error } = useGetJobsQuery();

    const [jobShownId, setJobShownId] = useState<string>("");

    const emptyLayout = (
        <div className="job-posting-container">
            <div className="job-posting-container-object job-postings">
                <div className="joblist-container"></div>
            </div>
            <div className="job-posting-container-object job-displayed">
                <p className="job-posting-null">No Jobs To Display</p>
            </div>
        </div>
    );

    // If it was successful, get the first job if it exists
    if (isSuccess) {
        const unpublishedJobs = jobs?.filter((job) => !job.published);
        if (unpublishedJobs?.length === 0) return emptyLayout;
        return (
            <div className="job-posting-container">
                <div className="job-posting-container-object job-postings">
                    <UnpublishedJobsList setJobShownId={setJobShownId} />
                </div>
                <div className="job-posting-container-object">
                    <Job
                        jobs={unpublishedJobs}
                        key={jobShownId}
                        jobId={jobShownId ? jobShownId : unpublishedJobs[0] ? unpublishedJobs[0]._id! : ''}
                        setJobShownId={setJobShownId}
                    />
                </div>
            </div>
        );
    } else if (error) {
        return emptyLayout;
    } else {
        return <h1>Loading...</h1>;
    }
};

export default AdminJobs;
