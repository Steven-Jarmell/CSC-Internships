import { useGetJobsQuery } from "../../features/jobs/jobApiSlice";
import JobsList from "../../features/jobs/JobsList";
import "../../styles/JobPostingContainer.css";
import Job from "../../features/jobs/Job";
import { useState } from "react";
import FilterList from "../../features/filter/FilterList";

const JobPostingContainer = () => {
    const { data: jobs, isSuccess, error } = useGetJobsQuery();

    const [jobShownId, setJobShownId] = useState<string>("");

    const emptyLayout = (
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
        const publishedJobs = jobs?.filter((job) => job.published);
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
    } else if (error) {
        return emptyLayout;
    } else {
        return <h1>Loading...</h1>;
    }
};

export default JobPostingContainer;
