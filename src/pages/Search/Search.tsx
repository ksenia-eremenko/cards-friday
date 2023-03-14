import React from 'react';
import {SearchBar} from "./SearchBar/SearchBar";
import DeckOfCards from "./DeckOfCards/DeckOfCards";
import SliderFilter from "./SliderFilter/SliderFilter";
import FilterRemove from "./FilterRemove/FilterRemove";

const Search = () => {
    return (
        <>
            <SearchBar/>
            <DeckOfCards/>
            <SliderFilter/>
            <FilterRemove/>
        </>
    );
};

export default Search;