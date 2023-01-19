import { useEffect, useState } from "react";
import { useAddNewJobMutation } from "./jobApiSlice";
import "../../styles/form.css";
import { useAppSelector } from "../../app/hooks";
import { getUser } from "../user/userSlice";
import User from "../user/User";

type Props = {
    toggleModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const NewJobForm = ({ toggleModal }: Props) => {
    const [addNewJob, { isLoading, isSuccess, isError, error }] =
        useAddNewJobMutation();

    const user = useAppSelector(getUser);

    const [companyName, setCompanyName] = useState<string>("");
    const [jobDescription, setJobDescription] = useState<string>("");
    const [locations, setLocations] = useState<string[]>([""]);
    const [sponsorshipStatus, setSponsorshipStatus] = useState<boolean>(false);
    const [jobStatus, setJobStatus] = useState<boolean>(false);
    const [jobLink, setJobLink] = useState<string>("");
    const [contributor, setContributor] = useState<string>(user.login);
    const [anonymous, setAnonymous] = useState<boolean>(false);
    const [avatar_url, setAvatar_url] = useState<string>(user.avatar_url);

    const canSave =
        [
            companyName,
            jobDescription,
            locations.length,
            jobLink,
            contributor,
        ].every(Boolean) && !isLoading;

    useEffect(() => {
        if (anonymous) {
            setContributor("Anonymous");
            setAvatar_url('');
        } else {
            setContributor(user.login);
            setAvatar_url(user.avatar_url);
        }
    }, [anonymous])

    const onSaveJobClicked = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (canSave) {
            await addNewJob({
                companyName,
                jobDescription,
                locations,
                sponsorshipStatus,
                jobStatus,
                jobLink,
                contributor,
                avatar_url,
            });
        }
        toggleModal(false);
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

    const onAnonymousChanged = () => {
        setAnonymous(!anonymous);
    };

    const content = (
        <>
            <form className="form" onSubmit={onSaveJobClicked}>
                <div className="form-input form-save-container">
                    <h2 className="form-save-title">New Job</h2>
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
                    <label className="form-label" htmlFor="jobLocations">
                        Job Location(s):
                    </label>
                    <div>
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
                <div className="form-input">
                    Remain Anonymous
                    <input
                        type="checkbox"
                        checked={anonymous}
                        onChange={onAnonymousChanged}
                    />
                </div>
            </form>
        </>
    );

    return content;
};

export default NewJobForm;
