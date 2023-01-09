import '../../styles/layoutButtons.component.css'

const LayoutButtons = () => {
    return (
        <div className="layoutButtons-container">
            <button className="layout-button layout-filter-button">Filter</button>
            <button className="layout-button layout-add-button">Add Job</button>
        </div>
    );
};

export default LayoutButtons;
