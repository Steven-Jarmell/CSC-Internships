import { apiSlice } from "../../app/api/apiSlice";

export interface IUser {
	_id?: string;
	id: number;
    roles: string[];
}

export const userApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
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
		}),
		updateUser: builder.mutation<IUser, IUser>({
			query: (userData) => ({
				url: "/user",
				method: "PATCH",
				body: {
					...userData,
				},
			}),
		}),
		deleteUser: builder.mutation<void, { id: number }>({
			query: (id) => ({
				url: "/user",
				method: "DELETE",
				body: id,
			}),
		}),
	}),
});

export const {
    useGetUserQuery,
    useAddNewUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = userApiSlice;
