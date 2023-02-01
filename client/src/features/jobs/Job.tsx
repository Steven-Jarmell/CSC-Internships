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

// This component is used to display a job
const Job = ({
    jobs,
    jobId,
    updatedJob,
    setJobShownId,
}: Props): JSX.Element => {
    // Query the jobs and select the specific job based on the id
    // Will want to update this in the future to keep a separate ID for all the posts with entityadapter
    // https://redux.js.org/tutorials/essentials/part-6-performance-normalization

    // Query the jobs and select the specific job based on the id
    let { job } = useGetJobsQuery(undefined, {
        selectFromResult: ({ data }) => ({
            job: data?.find((job) => job._id === jobId),
        }),
    });

    // Get the deleteJob mutation method
    const [deleteJob, { isSuccess: isDelSuccess, isLoading: isDelLoading }] =
        useDeleteJobMutation();

    const { isAdmin }: { isAdmin: boolean } = useAuth();

    // If the job is updated, set the job to the updated job
    if (updatedJob) {
        job = updatedJob;
    }

    // If the job is deleted, set the job to the first job in the list
    useEffect(() => {
        if (isDelSuccess || isDelLoading) {
            setJobShownId(jobs[0]._id!);
        }
    }, [jobs, isDelSuccess]);

    // If the job is deleted, set the job to the first job in the list
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

    // Set the return content to the edit job form if the edit button is clicked
    const onEditJobClicked = async () => {
        setReturnContent(
            <EditJobForm
                job={job!}
                jobId={jobId}
                setReturnContent={setReturnContent}
            />
        );
    };

    const content: JSX.Element = (
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
                {job?.sponsorshipStatus ? "Available" : "Not Available"}
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
                    <button
                        className="job-delete-button"
                        onClick={onDeleteJobClicked}
                    >
                        Delete
                    </button>
                    <button
                        className="job-edit-button"
                        onClick={onEditJobClicked}
                    >
                        Edit
                    </button>
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
