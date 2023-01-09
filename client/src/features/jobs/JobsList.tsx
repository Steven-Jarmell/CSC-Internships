import { useGetJobsQuery } from "./jobApiSlice";
import '../../styles/jobList.css'

const JobsList = () => {
    const {
        data: jobs,
        isLoading,
        isSuccess,
        error,
    } = useGetJobsQuery(undefined, {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    });

    // Let the default content be null
    let content = null;

    if (isLoading) content = <h1>Loading...</h1>;

    // If there is an error, print the message based on the type of error
    if (error) {
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
    }

    // If it was successful, map over the list and make job postings for each of them
    if (isSuccess) {
        return (
            <div className="joblist-container">
                {jobs.map((job, i) => {
                    return (
                        <div key={i} className="joblist-posting">
                            <p>{job.companyName}</p>
                            <p>{job.locations.join(';  ')}</p>
                            <p>{job.jobStatus ? "Open" : "Closed"}</p>
                        </div>
                    )
                })}
            </div>
        );
    }

    return content;
};

export default JobsList;
