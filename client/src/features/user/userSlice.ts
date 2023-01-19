import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

// Could just store the user ID to the database instead multiple other fields
// If we want a special pitt tag, we would need members to join a Pitt org on GitHub
export type IUser = {
    id: number;
    login: string;
    html_url: string;
    avatar_url: string;
};

// Define the initial state using that type
const initialState: IUser = {
    id: 0,
    login: "",
    html_url: "",
    avatar_url: "",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser(state: IUser, action: PayloadAction<IUser>) {
            const { id, login, html_url, avatar_url } = action.payload;

            state.id = id;
            state.login = login;
            state.html_url = html_url;
            state.avatar_url = avatar_url;
        },
        removeUser: (state: IUser) => {
            state.id = initialState.id;
            state.login = initialState.login;
            state.html_url = initialState.html_url;
            state.avatar_url = initialState.avatar_url;
        },
    },
});

export const { addUser, removeUser } = userSlice.actions;

export const getUser = (state: RootState) => state.user;

export default userSlice.reducer;
