import '../../styles/Filter.css'
import { IFilter } from './filterSlice';

type Props = {
    filter: IFilter;
};

const Filter = ({ filter }: Props) => {
    return <div className="filter-container">{filter.type}: {filter.value}</div>;
};

export default Filter;
