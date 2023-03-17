import React from 'react';
import {MdOutlineFilterAltOff} from "react-icons/md";
import './FilterRemove.scss'
import {useAppDispatch} from "../../../store/store";
import {resetFilter} from "../../../store/packs-reducer";

const FilterRemove = () => {
    const dispatch = useAppDispatch()

    const handleButtonClick = () => {
        dispatch(resetFilter(true))
    };

    return (
        <div className={'filter-container'}>
            <div className={'filter-remove b-title bt14 medium'} onClick={handleButtonClick}>
                <MdOutlineFilterAltOff/>
            </div>
        </div>
    );
};

export default FilterRemove;