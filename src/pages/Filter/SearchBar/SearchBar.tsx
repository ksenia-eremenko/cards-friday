import React, {ChangeEvent, useEffect, useState} from 'react';

import './SearchBar.scss'
import {AiOutlineSearch} from "react-icons/ai";

//debounce

import {useAppDispatch} from "../../../store/store";
import {getPacks, setSearch} from "../../../store/packs-reducer";

function useDebounce(value: string, delay: number = 800) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(
        () => {
            const handler = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);

            return () => {
                clearTimeout(handler);
            };
        },
        [value, delay]
    );
    return debouncedValue;
}

export const SearchBar = () => {

    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 1500);

    const dispatch = useAppDispatch();

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.currentTarget.value)
    }

    useEffect(
        () => {
            dispatch(setSearch(searchTerm))
            dispatch(getPacks())
        },
        [debouncedSearchTerm]
    );

    return (
        <div className={'search-container'}>
            <div className={'search-title b-title bt14 medium'}>Search</div>
            <div>
                <input
                    value={searchTerm}
                    onChange={onChangeHandler}
                    type={'text'}
                    id={'search'}
                    placeholder={'Provide your text'}
                    className={'input-block b-title bt14 medium'}
                ></input>
                <span className={'magnifier'}><AiOutlineSearch/></span>
            </div>
        </div>
    );
};

