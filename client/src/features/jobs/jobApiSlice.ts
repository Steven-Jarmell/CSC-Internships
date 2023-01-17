import { apiSlice } from "../../app/api/apiSlice";

export interface IJob {
	_id?: string;
	companyName: string;
	jobDescription: string;
	locations: string[];
	sponsorshipStatus: boolean;
	jobStatus: boolean;
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
			providesTags: (result, error, arg) => {
				return [{ type: "Job", id: "LIST" }];
			},
		}),
		addNewJob: builder.mutation<IJob, IJob>({
			query: (jobData) => ({
				url: "/jobs",
				method: "POST",
				body: {
					...jobData,
				},
			}),
			invalidatesTags: [{ type: "Job", id: "LIST" }],
		}),
		updateJob: builder.mutation<IJob, IJob>({
			query: (jobData) => ({
				url: "/jobs",
				method: "PATCH",
				body: {
					...jobData,
				},
			}),
			invalidatesTags: [{ type: "Job", id: "LIST" }],
		}),
		deleteJob: builder.mutation<void, { id: string }>({
			query: (id) => ({
				url: "/jobs",
				method: "DELETE",
				body: id,
			}),
			invalidatesTags: [{ type: "Job", id: "LIST" }],
		}),
	}),
});

export const {
	useGetJobsQuery,
	useAddNewJobMutation,
	useUpdateJobMutation,
	useDeleteJobMutation,
} = jobApiSlice;
