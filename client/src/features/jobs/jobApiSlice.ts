import { apiSlice } from "../../app/api/apiSlice";

export interface IJob {
    _id: number;
    companyName: string;
    jobDescription: string;
    locations: string[];
    sponsorshipStatus: Boolean;
    jobStatus: Boolean;
    jobLink: string;
    contributor?: string;
}

export const jobApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getJobs: builder.query<IJob[], void>({
            query: () => ({
                url: "/jobs",
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                },
            }),
        }),
        addNewJob: builder.mutation<void, IJob>({
            query: (jobData) => ({
                url: "/jobs",
                method: "POST",
                body: {
                    ...jobData,
                },
            }),
        }),
        updateJob: builder.mutation<void, IJob>({
            query: (jobData) => ({
                url: "/jobs",
                method: "PATCH",
                body: {
                    ...jobData,
                },
            }),
        }),
        deleteJob: builder.mutation<void, IJob>({
            query: ({ id }) => ({
                url: "/users",
                method: "DELETE",
                body: { id },
            }),
        }),
    }),
});

export const {
    useGetJobsQuery,
    useAddNewJobMutation,
    useUpdateJobMutation,
    useDeleteJobMutation,
} = jobApiSlice;


