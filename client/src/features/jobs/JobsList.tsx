import { useGetJobsQuery } from "./jobApiSlice";
import Job from "./Job";

const JobsList = () => {
    const {
        data: jobs,
        isLoading,
        isSuccess,
        error
    } = useGetJobsQuery("jobsList");

    let content = <h1>No Jobs</h1>;

    if (isLoading) content = <h1>Loading...</h1>;

    if (error) {
        if ('status' in error) {
          // you can access all properties of `FetchBaseQueryError` here
          const errMsg = 'error' in error ? error.error : JSON.stringify(error.data)
    
          return (
            <div>
              <div>An error has occurred:</div>
              <div>{errMsg}</div>
            </div>
          )
        }
        else {
            // you can access all properties of `SerializedError` here
            return <div>{error.message}</div>
        }
      }

    if (isSuccess) {
        const tableContent =
            jobs?.length &&
            jobs.map((job) => {
                return <Job key={job._id} jobId={job._id} />;
            });

        if (tableContent) {
            return (
                <>{tableContent}</>
            );
        }
    }

    return content;
};

export default JobsList;
