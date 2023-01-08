import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl:
        "https://steven-jarmell-fictional-guacamole-9xq79v9vp553x6q-5000.preview.app.github.dev/",
});

export const apiSlice = createApi({
    baseQuery: baseQuery,
    tagTypes: ["Job"],
    endpoints: (builder) => ({}),
});
