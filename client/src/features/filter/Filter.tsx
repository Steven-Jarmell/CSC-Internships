import { useAppDispatch } from '../../app/hooks';
import '../../styles/Filter.css'
import { IFilter, removeFilter } from './filterSlice';

type Props = {
    filter: IFilter;
};

const Filter = ({ filter }: Props) => {
    const dispatch = useAppDispatch();
    
    return <div className="filter-container" onClick={() => dispatch(removeFilter(filter))}>{filter.type}: {filter.value}</div>;
};

export default Filter;
