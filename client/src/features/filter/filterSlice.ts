import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store"

export enum FilterType {
    LOCATION = 'location',
    COMPANY_NAME = 'companyName',
    JOB_TYPE = 'jobType',
    JOB_STATUS = 'jobStatus',
    SPONSORSHIP = 'sponsorship'
}

// Define a type for the slice state
export type Filter = {
    type: FilterType;
    value: string;
}

type FiltersList = {
    filters: Filter[];
}

// Define the initial state using that type
const initialState: FiltersList = {
    filters: [],
};

const filterSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        addFilter(state: FiltersList, action: PayloadAction<Filter[]>) {
            state.filters = action.payload;
        },
        removeFilter(state: FiltersList, action: PayloadAction<Filter>) {
            state.filters.filter(filter => (filter.type !== action.payload.type) && (filter.value !== action.payload.value))
        }
    },
});

export const { addFilter, removeFilter } = filterSlice.actions;

export const getFilters = (state: RootState) => state.filters.filters;

export default filterSlice.reducer;