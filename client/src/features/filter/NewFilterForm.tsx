import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addFilter, IFilter, FilterType, getFilters } from "./filterSlice";
import "../../styles/form.css";

type Props = {
    toggleModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const NewFilterForm = ({ toggleModal }: Props) => {

    const dispatch = useAppDispatch();

    const filters = useAppSelector(getFilters);

    const [filtersSelected, setFiltersSelected] = useState<IFilter[]>(filters);
    const [locations, setLocations] = useState<string[]>([""]);
    const [companyName, setCompanyName] = useState<string>("");
    const [jobStatus, setJobStatus] = useState<boolean>(false);
    const [jobDescription, setJobDescription] = useState<string>("");
    const [sponsorshipStatus, setSponsorshipStatus] = useState<boolean>(false);

    const onSetFiltersClicked = (e: React.SyntheticEvent) => {
        e.preventDefault();
        
        // Add the current filters to the store
        dispatch(addFilter(filtersSelected));

        setLocations([]);
        setCompanyName("");
        setJobDescription("");
        setJobStatus(false);
        setFiltersSelected([]);
        setSponsorshipStatus(false);

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

    const onFilterAdded = (type: FilterType, value: string) => {
        let newFilter: IFilter = {
            type: type,
            value: value,
        };

        // If the filter already exists in the array, do not add it
        if (
            filtersSelected.some(
                (filter) => filter.type === type && filter.value === value
            )
        ) {
            return;
        } else {
            let newFilters = filtersSelected.concat(newFilter);
            setFiltersSelected(newFilters);
        }
    };

    const onSponsorshipStatusChanged = () => {
        setSponsorshipStatus(!sponsorshipStatus);
    };

    const onJobStatusChanged = () => {
        setJobStatus(!jobStatus);
    };

    const content = (
        <>
            <form className="form" >
                <div className="form-input form-save-container">
                    <h2 className="form-save-title">New Filter</h2>
                    <div className="=form-save-button">
                        <button className="form-button" title="Save" onClick={onSetFiltersClicked}>
                            Save
                        </button>
                    </div>
                </div>
                <div className="form-current-filters-container">
                    Filters:
                    {filtersSelected.map((filter, i) => {
                        return <p key={i}>{filter.value}</p>;
                    })}
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
                    <button
                        className="add-filter-btn"
                        type="button"
                        onClick={() => {
                            onFilterAdded(FilterType.COMPANY_NAME, companyName);
                            setCompanyName("");
                        }}
                    >
                        Add Company Name
                    </button>
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
                    <button
                        className="add-filter-btn"
                        type="button"
                        onClick={() => {
                            onFilterAdded(FilterType.JOB_TYPE, jobDescription);
                            setJobDescription("");
                        }}
                    >
                        Add Job Description
                    </button>
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
                    <button
                        className="add-filter-btn"
                        type="button"
                        onClick={() => {
                            locations.forEach((location) => {
                                onFilterAdded(FilterType.LOCATION, location);
                            });
                            setLocations([""]);
                        }}
                    >
                        Add Locations Filter
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
                        <button
                            className="add-filter-btn"
                            type="button"
                            onClick={() => {
                                onFilterAdded(
                                    FilterType.SPONSORSHIP,
                                    sponsorshipStatus ? "true" : "false"
                                );
                                setSponsorshipStatus(false);
                            }}
                        >
                            Add Sponsorship
                        </button>
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
                        <button
                            className="add-filter-btn"
                            type="button"
                            onClick={() => {
                                onFilterAdded(
                                    FilterType.JOB_STATUS,
                                    jobStatus ? "true" : "false"
                                );
                                setJobStatus(false);
                            }}
                        >
                            Add Job Status
                        </button>
                    </label>
                </div>
            </form>
        </>
    );

    return content;
};

export default NewFilterForm;
