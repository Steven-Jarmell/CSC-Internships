import { apiSlice } from "../../app/api/apiSlice";

export interface IUser {
	_id?: string;
	login: string; // The user's username
	id: number;
    roles: string[];
}

// Define the API endpoints for the user
export const userApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getAllUsers: builder.query<IUser[], void>({
			query: () => ({
				url: "/user",
				method: "GET",
				validateStatus: (response, result) => {
					return response.status === 200 && !result.isError;
				},
			}),
			providesTags: (result, error, arg) => {
                return [{ type: "User", id: "LIST" }];
            },
		}),
		getUser: builder.query<IUser, number>({
			query: (userID) => ({
				url: "/user",
                method: "GET",
                body: {
                    userID
                },
				validateStatus: (response, result) => {
					return response.status === 200 && !result.isError;
				},
			}),
		}),
		addNewUser: builder.mutation<IUser, IUser>({
			query: (userData) => ({
				url: "/user",
				method: "POST",
				body: {
					...userData,
				},
			}),
			invalidatesTags: [{ type: "User", id: "LIST" }],
		}),
		updateUser: builder.mutation<IUser, IUser>({
			query: (userData) => ({
				url: "/user",
				method: "PATCH",
				body: {
					...userData,
				},
			}),
			invalidatesTags: [{ type: "User", id: "LIST" }],
		}),
		deleteUser: builder.mutation<void, { id: number }>({
			query: (id) => ({
				url: "/user",
				method: "DELETE",
				body: id,
			}),
			invalidatesTags: [{ type: "User", id: "LIST" }],
		}),
	}),
});

export const {
	useGetAllUsersQuery,
    useGetUserQuery,
    useAddNewUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = userApiSlice;
