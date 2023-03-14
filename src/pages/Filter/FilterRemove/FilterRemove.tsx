import React from 'react';
import {MdOutlineFilterAltOff} from "react-icons/md";
import './FilterRemove.scss'

const FilterRemove = () => {
    return (
        <div className={'filter-container'}>
            <div className={'filter-remove b-title bt14 medium'}>
                <MdOutlineFilterAltOff/>
            </div>

            
        </div>
    );
};

export default FilterRemove;