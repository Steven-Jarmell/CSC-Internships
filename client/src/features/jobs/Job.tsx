import { memo } from "react";
import { useGetJobsQuery } from "./jobApiSlice";
import '../../styles/job.css'

type Props = {
    jobId: number;
};

const Job = ({ jobId }: Props) => {
    // Query the jobs and select the specific job based on the id
    // Will want to update this in the future to keep a separate ID for all the posts with entityadapter
    // https://redux.js.org/tutorials/essentials/part-6-performance-normalization

    const { job } = useGetJobsQuery(undefined, {
        selectFromResult: ({ data }) => ({
            job: data?.find((job) => job._id === jobId),
        }),
    });

    return (
        <div className="job-container">
            <h1 className="job-name">{job?.companyName}</h1>
            <p className="job-description"><b>Description:</b> {job?.jobDescription}</p>
            <p className="job-location-title"><b>Locations:</b></p>
            <ul className="job-locations-container">
                {job?.locations.map((location: string, i: number) => {
                    return <li key={i} className="job-location">{location}</li>;
                })}
            </ul>
            <p className="job-sponsorship"><b>Sponsorship:</b> {job?.sponsorshipStatus ? "Sponsorship Available" : "Sponsorship Not Available"}</p>
            <p className="job-status"><b>Status:</b> {job?.jobStatus ? "Job Open" : "Job Closed"}</p>
            <a className="job-link" href={job?.jobLink}>Apply</a>
            <p className="job-contributor"><b>Added By:</b> {job?.contributor}</p>
        </div>
    );
};

// Memoize the job such that it only rerenders if their props change
const memoizedJob = memo(Job);

export default memoizedJob;
