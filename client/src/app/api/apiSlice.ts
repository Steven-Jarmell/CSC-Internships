import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the base query for the API
const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:5000",
});

// Define the API endpoints
export const apiSlice = createApi({
    baseQuery: baseQuery,
    tagTypes: ["Job", "User", "Report"],
    endpoints: (builder) => ({}),
});
