import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import filtersReducer from "../features/filter/filterSlice";
import userReducer from "../features/user/userSlice";

// Create the store
export const store = configureStore({
    // Define the reducers
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        filters: filtersReducer,
        user: userReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
