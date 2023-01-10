import { useGetJobsQuery } from "../../features/jobs/jobApiSlice";
import JobsList from "../../features/jobs/JobsList";
import "../../styles/jobPostingContainer.css";
import Job from "../../features/jobs/Job";
import Filter from "./Filter";

const JobPostingContainer = () => {
    const { data: jobs, isSuccess, error } = useGetJobsQuery();

    // If it was successful, get the first job if it exists
    if (isSuccess) {
        return (
            <div className="job-posting-container">
                <div className="job-posting-container-object job-postings">
                    {/* Add filters list here*/}
                    <Filter />
                    <JobsList />
                </div>
                <div className="job-posting-container-object">
                    <Job jobId={jobs[0]._id!} />
                </div>
            </div>
        );
    } else if (error) {
        if ("status" in error) {
            // you can access all properties of `FetchBaseQueryError` here
            const errMsg =
                "error" in error ? error.error : JSON.stringify(error.data);

            return (
                <div>
                    <div>An error has occurred:</div>
                    <div>{errMsg}</div>
                </div>
            );
        } else {
            // you can access all properties of `SerializedError` here
            return <div>{error.message}</div>;
        }
    } else {
        return <h1>Loading...</h1>;
    }
};

export default JobPostingContainer;
