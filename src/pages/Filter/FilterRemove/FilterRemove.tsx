import React, {useState} from 'react';
import {MdOutlineFilterAltOff} from "react-icons/md";
import './FilterRemove.scss'
import {useAppDispatch} from "../../../store/store";
import {resetFilter} from "../../../store/packs-reducer";

const FilterRemove = () => {
    // const [filter, setFilter] = useState([])

const dispatch = useAppDispatch()

    const handleButtonClick = () => {
    dispatch(resetFilter())
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