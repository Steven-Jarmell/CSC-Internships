import { useAppSelector } from "../../app/hooks";
import { getFilters } from "./filterSlice";

const FilterList = () => {
    // Get the list of filters from the store
    const filters = useAppSelector(getFilters);

    // Return a list of filters
    return (
        <ul>
            {filters.map((filter, i) => {
                return <li key={i}>{filter.value}</li>;
            })}
        </ul>
    );
};

export default FilterList;
