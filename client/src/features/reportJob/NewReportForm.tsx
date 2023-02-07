import { useState } from "react";
import "../../styles/ReportForm.css";
import "../../styles/form.css";
import { IReport, useAddNewReportMutation } from "./reportApiSlice";

export enum ReportType {
    LOCATION = "Location",
    COMPANY_NAME = "Company Name",
    JOB_TYPE = "Job Type",
    JOB_STATUS = "Job Status",
    SPONSORSHIP = "Sponsorship",
    OTHER = "Other",
}

type Props = {
    toggleModal: React.Dispatch<React.SetStateAction<boolean>>;
    jobID: string;
    setRerender: React.Dispatch<React.SetStateAction<boolean>>;
    rerender: boolean;
};

const ReportTypes: string[] = Object.values(ReportType);

const NewReportForm = ({
    toggleModal,
    jobID,
    setRerender,
    rerender,
}: Props): JSX.Element => {
    const [reportsSelected, setReportsSelected] = useState<string[]>([]);
    const [userMessage, setUserMessage] = useState<string>("");

    const [addNewReport] = useAddNewReportMutation();

    const onSubmitFormClicked = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (canSave) {
            await addNewReport({
                jobID,
                reportCategory: reportsSelected,
                reportMessage: userMessage,
            } as IReport);
        }

        toggleModal(false);
        setRerender(!rerender);
    };

    const canSave: boolean =
        reportsSelected.length > 0 && userMessage.length > 0;

    const onUserMessageChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserMessage(e.target.value);
    };

    const onReportTypeChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setReportsSelected([...reportsSelected, e.target.value]);
        } else {
            setReportsSelected(
                reportsSelected.filter((report) => report !== e.target.value)
            );
        }
    };

    return (
        <>
            <form className="form" onSubmit={onSubmitFormClicked}>
                <h2 className="form-title">Report Job</h2>
                <button
                    className="form-button form-save-button"
                    title="Save"
                    disabled={!canSave}
                >
                    Save
                </button>
                <p className="form-subtitle">Choose Section(s):</p>
                <div className="form-report-selections">
                    {ReportTypes.map((reportType: string, i: number) => {
                        return (
                            <div key={i}>
                                <label
                                    className="form-label"
                                    htmlFor={reportType}
                                >
                                    {reportType}
                                </label>
                                <input
                                    type="checkbox"
                                    className="form-checkbox-input"
                                    id={reportType}
                                    name={reportType}
                                    value={reportType}
                                    onChange={onReportTypeChanged}
                                />
                            </div>
                        );
                    })}
                </div>
                {/* Add a text input field to let the users enter max 30 words what they are reporting*/}
                <label className="form-label" htmlFor="reportDescription">
                    Please describe the issue in 50 characters or less:
                </label>
                <input
                    type="text"
                    className="form-text-input"
                    id="reportDescription"
                    name="reportDescription"
                    maxLength={50}
                    value={userMessage}
                    onChange={onUserMessageChanged}
                />
            </form>
        </>
    );
};

export default NewReportForm;
