import { IJob, useGetJobsQuery } from "../../features/jobs/jobApiSlice";
import "../../styles/jobList.css";
import { useAppSelector } from "../../app/hooks";

type Props = {
	setJobShownId: React.Dispatch<React.SetStateAction<string>>;
};

const UnpublishedJobsList = ({ setJobShownId }: Props) => {
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

	const onJobCardClicked = (job: IJob) => {
		setJobShownId(job._id!);
	};

	const jobsToDisplay = () => {
		const newArray = jobs?.filter((job: IJob) => !job.published);

		return newArray!.map((job: IJob, i: number) => {
			return (
				<div
					key={i}
					className="joblist-posting"
					onClick={() => onJobCardClicked(job)}
				>
					<p>{job.companyName}</p>
					<p>{job.locations.join(";  ")}</p>
					<p>{job.jobStatus ? "Open" : "Closed"}</p>
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

export default UnpublishedJobsList;
