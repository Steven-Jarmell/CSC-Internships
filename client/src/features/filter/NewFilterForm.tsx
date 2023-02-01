import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addFilter, IFilter, FilterType, getFilters } from "./filterSlice";
import "../../styles/form.css";

type Props = {
    toggleModal: React.Dispatch<React.SetStateAction<boolean>>;
};

// This component is used to display a new form to add a filter
const NewFilterForm = ({ toggleModal }: Props): JSX.Element => {
    const dispatch = useAppDispatch();
    const filters: IFilter[] = useAppSelector(getFilters);

    const [filtersSelected, setFiltersSelected] = useState<IFilter[]>(filters);
    const [locations, setLocations] = useState<string[]>([""]);
    const [companyName, setCompanyName] = useState<string>("");
    const [jobStatus, setJobStatus] = useState<boolean>(false);
    const [jobDescription, setJobDescription] = useState<string>("");
    const [sponsorshipStatus, setSponsorshipStatus] = useState<boolean>(false);

    const onSetFiltersClicked = (e: React.SyntheticEvent) => {
        // Prevent the page from reloading
        e.preventDefault();

        // Add the current filters to the store
        dispatch(addFilter(filtersSelected));

        // Reset the state of the form, might not be necessary
        setLocations([]);
        setCompanyName("");
        setJobDescription("");
        setJobStatus(false);
        setFiltersSelected([]);
        setSponsorshipStatus(false);

        // Close the modal
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

    const onFilterRemoved = (filterToRemove: IFilter) => {
        const filterIndex = filtersSelected.findIndex(
            (filter) =>
                filter.type === filterToRemove.type &&
                filter.value === filterToRemove.value
        );

        const newfiltersSelected = [
            ...filtersSelected.slice(0, filterIndex),
            ...filtersSelected.slice(filterIndex + 1),
        ];

        setFiltersSelected(newfiltersSelected);
    };

    const onSponsorshipStatusChanged = () => {
        setSponsorshipStatus(!sponsorshipStatus);
    };

    const onJobStatusChanged = () => {
        setJobStatus(!jobStatus);
    };

    // This is the content of the form modal
    const content = (
        <>
            <form className="form">
                <p className="form-title">New Filter</p>
                <button
                    className="form-button form-save-button"
                    title="Save"
                    onClick={onSetFiltersClicked}
                >
                    Save
                </button>
                <div className="form-current-filters-container">
                    Filters:
                    {filtersSelected.map((filter, i) => {
                        return (
                            <div
                                className="form-filter-container"
                                key={i}
                                onClick={() => onFilterRemoved(filter)}
                            >
                                {filter.type}: {filter.value}
                            </div>
                        );
                    })}
                </div>
                <div className="form-input">
                    <label className="form-label" htmlFor="companyName">
                        Company Name:
                    </label>
                    <input
                        className="form-text-input"
                        id="companyName"
                        name="companyName"
                        type="text"
                        autoComplete="off"
                        value={companyName}
                        onChange={onCompanyNameChanged}
                    />
                    <button
                        className="form-button"
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
                        className="form-text-input"
                        id="jobDescription"
                        name="jobDescription"
                        type="text"
                        autoComplete="off"
                        value={jobDescription}
                        onChange={onJobDescriptionChanged}
                    />
                    <button
                        className="form-button"
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
                        <div className="form-location" key={i}>
                            <input
                                className="form-text-input"
                                type="text"
                                placeholder={`Location #${i + 1} name`}
                                value={location}
                                onChange={onLocationNameChange(i)}
                            />
                            <button
                                className="form-delete-location-button"
                                type="button"
                                onClick={onLocationRemoved(i)}
                            >
                                -
                            </button>
                        </div>
                    ))}
                    <button
                        className="form-button"
                        type="button"
                        onClick={onLocationAdded}
                    >
                        Add Location
                    </button>
                    <button
                        className="form-button form-button-add-locations"
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
                <div className="form-input form-checkbox-container">
                    <label className="form-label" htmlFor="sponsorshipStatus">
                        Sponsorship:
                    </label>
                    <input
                        className="form-checkbox-input"
                        type="checkbox"
                        checked={sponsorshipStatus}
                        onChange={onSponsorshipStatusChanged}
                    />
                    <button
                        className="form-button"
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
                </div>
                <div className="form-input">
                    <label className="form-label" htmlFor="jobStatus">
                        Job Status:
                    </label>
                    <input
                        className="form-checkbox-input"
                        type="checkbox"
                        checked={jobStatus}
                        onChange={onJobStatusChanged}
                    />
                    <button
                        className="form-button"
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
                </div>
            </form>
        </>
    );

    return content;
};

export default NewFilterForm;
