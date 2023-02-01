import { useAppDispatch } from "../../app/hooks";
import "../../styles/Filter.css";
import { IFilter, removeFilter } from "./filterSlice";

type Props = {
    filter: IFilter;
};

// This component is used to display a filter and remove it from the store when clicked
const Filter = ({ filter }: Props): JSX.Element => {
    const dispatch = useAppDispatch();

    return (
        <div
            className="filter-container"
            onClick={() => dispatch(removeFilter(filter))}
        >
            {filter.type}: {filter.value}
        </div>
    );
};

export default Filter;
