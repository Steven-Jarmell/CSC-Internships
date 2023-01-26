import { memo, useEffect, useState } from "react";
import { useDeleteJobMutation, useGetJobsQuery, IJob } from "./jobApiSlice";
import "../../styles/job.css";
import EditJobForm from "./EditJobForm";
import User from "../user/User";
import useAuth from "../../hooks/useAuth";

type Props = {
    jobs: IJob[];
    jobId: string;
    updatedJob?: IJob;
    setJobShownId: React.Dispatch<React.SetStateAction<string>>;
};

const Job = ({ jobs, jobId, updatedJob, setJobShownId }: Props) => {
    // Query the jobs and select the specific job based on the id
    // Will want to update this in the future to keep a separate ID for all the posts with entityadapter
    // https://redux.js.org/tutorials/essentials/part-6-performance-normalization

    let { job } = useGetJobsQuery(undefined, {
        selectFromResult: ({ data }) => ({
            job: data?.find((job) => job._id === jobId),
        }),
    });

    const { isAdmin } = useAuth();

    if (updatedJob) {
        job = updatedJob;
    }

    const [
        deleteJob,
        {
            isSuccess: isDelSuccess,
            isError: isDelError,
            isLoading: isDelLoading,
            error: delError,
        },
    ] = useDeleteJobMutation();

    useEffect(() => {
        if (isDelSuccess || isDelLoading) {
            setJobShownId(jobs[0]._id!);
        }
    }, [jobs, isDelSuccess]);

    const onDeleteJobClicked = async () => {
        await deleteJob({ id: jobId }).then(() => {
            if (jobs.length > 1) {
                if (jobs[0]._id === jobId) {
                    setJobShownId(jobs[1]._id!);
                } else {
                    setJobShownId(jobs[1]._id!);
                }
            } else {
                setJobShownId("");
            }
        });
    };

    const onEditJobClicked = async () => {
        setReturnContent(
            <EditJobForm
                job={job!}
                jobId={jobId}
                setReturnContent={setReturnContent}
            />
        );
    };

    const content = (
        <div className="job-container">
            <p className="job-name">{job?.companyName}</p>
            <p className="job-description">
                <b>Description:</b> {job?.jobDescription}
            </p>
            <p className="job-location-title">
                <b>Locations:</b>
            </p>
            <ul className="job-locations-container">
                {job?.locations.map((location: string, i: number) => {
                    return (
                        <li key={i} className="job-location">
                            {location}
                        </li>
                    );
                })}
            </ul>
            <p className="job-sponsorship">
                <b>Sponsorship: </b>
                {job?.sponsorshipStatus
                    ? "Available"
                    : "Not Available"}
            </p>
            <p className="job-status">
                <b>Status: </b> {job?.jobStatus ? "Job Open" : "Job Closed"}
            </p>
            <a className="job-link" href={job?.jobLink}>
                Apply
            </a>
            <div className="job-contributor">
                <b>Added By: </b>
                <User login={job?.contributor!} avatar_url={job?.avatar_url!} />
            </div>
            {isAdmin && (
                <div className="job-change-buttons">
                    <button className="job-delete-button" onClick={onDeleteJobClicked}>Delete</button>
                    <button className="job-edit-button" onClick={onEditJobClicked}>Edit</button>
                </div>
            )}
        </div>
    );

    const [returnContent, setReturnContent] = useState<JSX.Element>(content);

    return returnContent;
};

// Memoize the job such that it only rerenders if their props change
const memoizedJob = memo(Job);

export default memoizedJob;
