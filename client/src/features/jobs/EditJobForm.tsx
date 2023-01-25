import { useState } from "react";
import { IJob, useUpdateJobMutation } from "./jobApiSlice";
import "../../styles/form.css";
import Job from "./Job";
import useAuth from "../../hooks/useAuth";

type Props = {
    job: IJob;
    jobId: string;
    setReturnContent: React.Dispatch<React.SetStateAction<JSX.Element>>;
};

const EditJobForm = ({ job, jobId: _id, setReturnContent }: Props) => {
    const { isAdmin } = useAuth();

    const [updateJob, { isLoading }] = useUpdateJobMutation();
    const [companyName, setCompanyName] = useState<string>(job.companyName);
    const [jobDescription, setJobDescription] = useState<string>(
        job.jobDescription
    );
    const [locations, setLocations] = useState<string[]>(job.locations);
    const [sponsorshipStatus, setSponsorshipStatus] = useState<boolean>(
        job.sponsorshipStatus
    );
    const [jobStatus, setJobStatus] = useState<boolean>(job.jobStatus);
    const [jobLink, setJobLink] = useState<string>(job.jobLink);
    const [published, setPublished] = useState<boolean>(
        isAdmin ? job.published : false
    );

    const canSave =
        [companyName, jobDescription, locations.length, jobLink].every(
            Boolean
        ) && !isLoading;

    const onSaveJobClicked = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (canSave) {
            await updateJob({
                _id,
                companyName,
                jobDescription,
                locations,
                sponsorshipStatus,
                jobStatus,
                jobLink,
                published,
            }).then(() => {
                const newJob = {
                    _id,
                    companyName,
                    jobDescription,
                    locations,
                    sponsorshipStatus,
                    jobStatus,
                    jobLink,
                    contributor: job.contributor,
                    published,
                };
                setReturnContent(<Job jobId={_id} updatedJob={newJob}/>);
            });
        }
    };

    const onCompanyNameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCompanyName(e.target.value);
    };

    const onJobDescriptionChanged = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setJobDescription(e.target.value);
    };

    const onLocationNameChange =
        (i: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
            // Make a copy of the locations, update the location at index i and set the state of locations to newLocations
            let newLocations = [...locations];
            newLocations[i] = e.target.value;
            setLocations(newLocations);
        };

    const onLocationRemoved = (i: number) => () => {
        let newLocations = locations.filter((location, j) => i !== j);
        setLocations(newLocations);
    };

    const onLocationAdded = () => {
        let newLocations = locations.concat([""]);
        setLocations(newLocations);
    };

    const onSponsorshipStatusChanged = () => {
        setSponsorshipStatus(!sponsorshipStatus);
    };

    const onJobStatusChanged = () => {
        setJobStatus(!jobStatus);
    };

    const onJobLinkChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        setJobLink(e.target.value);
    };

    const onpublishedChanged = () => {
        setPublished(!published);
    };

    const content = (
        <>
            <form className="form" onSubmit={onSaveJobClicked}>
                <div className="form-input form-save-container">
                    <h2 className="form-save-title">Edit Job</h2>
                    <div className="=form-save-button">
                        <button
                            className="form-button"
                            title="Save"
                            disabled={!canSave}
                        >
                            Save
                        </button>
                    </div>
                </div>
                <div className="form-input">
                    <label className="form-label" htmlFor="companyName">
                        Company Name:
                    </label>
                    <input
                        className="form-label"
                        id="companyName"
                        name="companyName"
                        type="text"
                        autoComplete="off"
                        value={companyName}
                        onChange={onCompanyNameChanged}
                    />
                </div>
                <div className="form-input">
                    <label className="form-label" htmlFor="jobDescription">
                        Job Description:
                    </label>
                    <input
                        className="form-label"
                        id="jobDescription"
                        name="jobDescription"
                        type="text"
                        autoComplete="off"
                        value={jobDescription}
                        onChange={onJobDescriptionChanged}
                    />
                </div>
                <div className="form-input">
                    {locations.map((location, i) => (
                        <div className="location" key={i}>
                            <input
                                type="text"
                                placeholder={`Location #${i + 1} name`}
                                value={location}
                                onChange={onLocationNameChange(i)}
                            />
                            <button
                                type="button"
                                onClick={onLocationRemoved(i)}
                            >
                                -
                            </button>
                        </div>
                    ))}
                    <button
                        className="add-location-btn"
                        type="button"
                        onClick={onLocationAdded}
                    >
                        Add Location
                    </button>
                </div>
                <div className="form-input">
                    <label className="form-label" htmlFor="sponsorshipStatus">
                        Sponsorship
                        <input
                            type="checkbox"
                            checked={sponsorshipStatus}
                            onChange={onSponsorshipStatusChanged}
                        />
                    </label>
                </div>
                <div className="form-input">
                    <label className="form-label" htmlFor="jobStatus">
                        Job Status
                        <input
                            type="checkbox"
                            checked={jobStatus}
                            onChange={onJobStatusChanged}
                        />
                    </label>
                </div>
                <div className="form-input">
                    <label className="form-label" htmlFor="jobLink">
                        Job Link:
                    </label>
                    <input
                        className="form-label"
                        id="jobLink"
                        name="jobLink"
                        type="text"
                        autoComplete="off"
                        value={jobLink}
                        onChange={onJobLinkChanged}
                    />
                </div>
                {isAdmin && (
                    <div className="form-input">
                        <label className="form-label" htmlFor="jobStatus">
                            Published:
                            <input
                                type="checkbox"
                                checked={published}
                                onChange={onpublishedChanged}
                            />
                        </label>
                    </div>
                )}
            </form>
        </>
    );

    return content;
};

export default EditJobForm;
