import { memo } from "react";
import { useGetJobsQuery } from "./jobApiSlice";
import { IJob } from './jobApiSlice'

type Props = {
    jobId: number;
};

const Job = ({ jobId }: Props) => {
    // Query the jobs and select the specific job based on the id
    // Will want to update this in the future to keep a separate ID for all the posts with entityadapter
    // https://redux.js.org/tutorials/essentials/part-6-performance-normalization

    const { job }: IJob = useGetJobsQuery(undefined, {
        selectFromResult: ({ data }) => ({
            job: data?.find((job) => job._id === jobId),
        }),
    });

    return (
        <div className="Job">
            <h1>{job.companyName}</h1>
            <h1>{job.jobDescription}</h1>
            {job.locations.map(location => {
                return <h1>{location}</h1>;
            })}
            <h1>{job.sponsorshipStatus}</h1>
        </div>
    );
};
export interface IJob {
    _id: number;
    companyName: string;
    jobDescription: string;
    locations: string[];
    sponsorshipStatus: Boolean;
    jobStatus: Boolean;
    jobLink: string;
    contributor?: string;
}


// Memoize the job such that it only rerenders if their props change
const memoizedJob = memo(Job);

export default memoizedJob;
