import { apiSlice } from "../../app/api/apiSlice";

interface Job {
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
        getJobs: builder.query<Job[], void>({
            query: () => ({
                url: "/jobs",
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                },
            }),
        }),
        //addNewJob: builder.mutation({}),
        //updateJob: builder.mutation({}),
        //deleteJob: builder.mutation({}),
    }),
});

export const { useGetJobsQuery } = jobApiSlice;
