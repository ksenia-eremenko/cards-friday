import React from 'react';
import {SearchBar} from "./SearchBar/SearchBar";
import DeckOfCards from "./DeckOfCards/DeckOfCards";
import SliderFilter from "./SliderFilter/SliderFilter";
import FilterRemove from "./FilterRemove/FilterRemove";

const Filter = () => {
    return (
        <>
            <SearchBar tableName={'packs'}/>
            <DeckOfCards/>
            <SliderFilter/>
            <FilterRemove/>
        </>
    );
};

export default Filter;