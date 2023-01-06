import { memo } from "react";
import { useGetJobsQuery } from "./jobApiSlice";

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
        <div className="Job">
            <h1>{job?.companyName}</h1>
        </div>
    );
};

// Memoize the job such that it only rerenders if their props change
const memoizedJob = memo(Job);

export default memoizedJob;
