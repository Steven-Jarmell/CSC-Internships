import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the base query for the API
const baseQuery = fetchBaseQuery({
    baseUrl: "https://pittcsc-api.onrender.com",
});

// Define the API endpoints
export const apiSlice = createApi({
    baseQuery: baseQuery,
    tagTypes: ["Job"],
    endpoints: (builder) => ({}),
});
