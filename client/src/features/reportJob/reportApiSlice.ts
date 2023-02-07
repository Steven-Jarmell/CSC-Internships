import { apiSlice } from "../../app/api/apiSlice";

export interface IReport {
    _id?: string,
    jobID: string;
    reportCategory: string[];
    reportMessage: string;
    numTimesReported: number;
}

export const reportApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllReports: builder.query<IReport[], void>({
            query: () => ({
                url: "/reports",
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                }
            }),
            providesTags: (result, error, arg) => {
                return [{ type: "Report", id: "LIST" }];
            }
        }),
        addNewReport: builder.mutation<IReport, IReport>({
            query: (reportData) => ({
                url: "/reports",
                method: "POST",
                body: {
                    ...reportData
                }
            }),
            invalidatesTags: [{ type: "Report", id: "LIST" }]
        }),
        deleteReport: builder.mutation<void, { id: string }>({
            query: (id) => ({
                url: "/reports",
                method: "DELETE",
                body: id
            }),
            invalidatesTags: [{ type: "Report", id: "LIST" }]
        })
    })
});

export const {
    useGetAllReportsQuery,
    useAddNewReportMutation,
    useDeleteReportMutation
} = reportApiSlice;