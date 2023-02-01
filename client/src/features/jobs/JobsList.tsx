import { IJob, useGetJobsQuery } from "./jobApiSlice";
import "../../styles/jobList.css";
import { useAppSelector } from "../../app/hooks";
import { FilterType, getFilters, IFilter } from "../filter/filterSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

type Props = {
    setJobShownId: React.Dispatch<React.SetStateAction<string>>;
};

const JobsList = ({ setJobShownId }: Props): JSX.Element => {
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

    // Get filters
    const filters: IFilter[] = useAppSelector(getFilters);

    // Let the default content be null
    let content: JSX.Element = <></>;

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

    const onJobCardClicked = (job: IJob) => {
        setJobShownId(job._id!);
    };

    // This function will filter the jobs based on the filters that are selected
    const jobsToDisplay = () => {
        // If there are no filters, just return all the jobs
        // If there are filters, iterate through each job and see if they match the filters
        const newArray =
            filters.length > 0
                ? jobs?.filter((job: IJob) => {
                      if (!job.published) return false;
                      // For each job, check if there is a filter for it
                      for (let i = 0; i < filters.length; i++) {
                          if (
                              (filters[i].type === FilterType.COMPANY_NAME &&
                                  job.companyName === filters[i].value) ||
                              (filters[i].type === FilterType.JOB_STATUS &&
                                  String(job.jobStatus) === filters[i].value) ||
                              (filters[i].type === FilterType.JOB_TYPE &&
                                  job.jobDescription === filters[i].value) ||
                              (filters[i].type === FilterType.SPONSORSHIP &&
                                  String(job.sponsorshipStatus) ===
                                      filters[i].value) ||
                              (filters[i].type === FilterType.LOCATION &&
                                  job.locations.includes(filters[i].value))
                          ) {
                              return true;
                          }
                      }
                      return false;
                  })
                : jobs?.filter((job: IJob) => job.published);

        return newArray!.map((job: IJob, i: number) => {
            return (
                <div
                    key={i}
                    className="joblist-posting"
                    onClick={() => onJobCardClicked(job)}
                >
                    <p className="joblist-posting-name">{job.companyName}</p>
                    <div className="joblist-posting-locations-container">
						<FontAwesomeIcon icon={faLocationDot} className="joblist-posting-location-symbol"/>
                        <p className="joblist-locations">
                            {job.locations.join(";  ")}
                        </p>
                    </div>
                    <div className="joblist-posting-status">
                        <div
                            className={`joblist-posting-status-symbol job-${
                                job.jobStatus ? "open" : "closed"
                            }`}
                        ></div>
                        {job.jobStatus ? "Open" : "Closed"}
                    </div>
                </div>
            );
        });
    };

    // If it was successful, map over the list and make job postings for each of them
    if (isSuccess) {
        return <div className="joblist-container">{jobsToDisplay()}</div>;
    }

    return content;
};

export default JobsList;
