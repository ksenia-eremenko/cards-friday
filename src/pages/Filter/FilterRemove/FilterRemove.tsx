import React, {useState} from 'react';
import {MdOutlineFilterAltOff} from "react-icons/md";
import './FilterRemove.scss'

const FilterRemove = () => {
    const [filter, setFilter] = useState('')

    const handleFilterReset = () => {
        setFilter('');
    };

    const handleButtonClick = () => {
        handleFilterReset(); // вызов функции сброса фильтра
    };
    console.log(filter)
    return (
        <div className={'filter-container'}>
            {filter}
            <div className={'filter-remove b-title bt14 medium'} onClick={handleButtonClick}>
                <MdOutlineFilterAltOff/>
            </div>
        </div>
    );
};

export default FilterRemove;