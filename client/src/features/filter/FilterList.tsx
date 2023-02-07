import { useAppSelector } from "../../app/hooks";
import { getFilters, IFilter } from "./filterSlice";
import "../../styles/filterList.component.css";
import Filter from "./Filter";

// This component is used to display a list of filters
const FilterList = (): JSX.Element => {
    // Get the list of filters from the store
    const filters: IFilter[] = useAppSelector(getFilters);

    // Return a list of filters
    return (
        <div className="filter-list-container">
            <div className="filter-list-title">
                {/* Display whether or not there are no filters */}
                {filters.length > 0 && <h3>Filters:</h3>}
                {filters.length === 0 && <h3>No filters</h3>}
            </div>
            <>
                {/* Map each filter to a Filter component */}
                {filters.map((filter, i) => {
                    return <Filter key={i} filter={filter} />;
                })}
            </>
        </div>
    );
};

export default FilterList;
