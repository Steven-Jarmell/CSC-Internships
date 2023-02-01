import { useGetJobsQuery } from "../../features/jobs/jobApiSlice";
import JobsList from "../../features/jobs/JobsList";
import "../../styles/JobPostingContainer.css";
import Job from "../../features/jobs/Job";
import { useState } from "react";
import FilterList from "../../features/filter/FilterList";

// This is the main component for the home page which displays the list of jobs and the currently selected job
const JobPostingContainer = (): JSX.Element => {
    const { data: jobs, isSuccess, error } = useGetJobsQuery();

    const [jobShownId, setJobShownId] = useState<string>("");

    // Define an empty layout to display in the case that there are no jobs
    const emptyLayout: JSX.Element = (
        <div className="job-posting-container">
            <div className="job-posting-container-object job-postings">
                <FilterList />
                <div className="joblist-container"></div>
            </div>
            <div className="job-posting-container-object job-displayed">
                <p className="job-posting-null">No Jobs To Display</p>
            </div>
        </div>
    );

    // If it was successful, get the first job if it exists
    if (isSuccess) {
        // Get the published jobs from the list
        const publishedJobs = jobs?.filter((job) => job.published);

        // If there are no published jobs, return the empty layout
        if (publishedJobs?.length === 0) return emptyLayout;

        return (
            <div className="job-posting-container">
                <div className="job-posting-container-object job-postings">
                    <FilterList />
                    <JobsList setJobShownId={setJobShownId} />
                </div>
                <div className="job-posting-container-object job-displayed">
                    <Job
                        jobs={publishedJobs}
                        key={jobShownId}
                        jobId={
                            jobShownId
                                ? jobShownId
                                : publishedJobs[0]
                                ? publishedJobs[0]._id!
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

export default JobPostingContainer;
