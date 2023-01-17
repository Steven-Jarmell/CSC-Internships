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
    removeFilter(state: FiltersList, action: PayloadAction<IFilter>) {
      // Something is going wrong, most likely because of the white space in the type
      let filterFunction = (item: IFilter) => {
        return (
          item.type !== action.payload.type &&
          item.value !== action.payload.value
        );
      };

      state.filters = state.filters.filter(filterFunction);
    },
  },
});

export const { addFilter, removeFilter } = filterSlice.actions;

export const getFilters = (state: RootState) => state.filters.filters;

export default filterSlice.reducer;
