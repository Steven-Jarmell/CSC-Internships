import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export enum FilterType {
  LOCATION = "Location",
  COMPANY_NAME = "Company Name",
  JOB_TYPE = "Job Type",
  JOB_STATUS = "Job Status",
  SPONSORSHIP = "Sponsorship",
}

// Define a type for the slice state
export type IFilter = {
  type: FilterType;
  value: string;
};

type FiltersList = {
  filters: IFilter[];
};

// Define the initial state using that type
const initialState: FiltersList = {
  filters: [],
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    addFilter(state: FiltersList, action: PayloadAction<IFilter[]>) {
      state.filters = action.payload;
    },
    removeFilter: (state: FiltersList, action: PayloadAction<IFilter>) => {
      const { type, value } = action.payload;

      const filterIndex = state.filters.findIndex(
        (item) => item.type === type && item.value === value
      );

      state.filters = [
        ...state.filters.slice(0, filterIndex),
        ...state.filters.slice(filterIndex + 1),
      ];
    },
  },
});

export const { addFilter, removeFilter } = filterSlice.actions;

export const getFilters = (state: RootState) => state.filters.filters;

export default filterSlice.reducer;
