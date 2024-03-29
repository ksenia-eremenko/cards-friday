import React, {ChangeEvent, useEffect, useState} from 'react';
// import './SearchBar.scss'
import {AiOutlineSearch} from "react-icons/ai";
import {useAppDispatch} from "../../../store/store";
import {setSearch} from "../../../store/packs-reducer";
import {setSearchCards} from "../../../store/cards-reducer";

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


//props
type SearchBarType = {
    tableName: 'card' | 'packs'
}

export const SearchBar = (props: SearchBarType) => {

    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 1500);

    const dispatch = useAppDispatch();

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(props.tableName)
        setSearchTerm(e.currentTarget.value)
    }

    useEffect(
        () => {
            if (props.tableName === 'packs') {
                dispatch(setSearch(searchTerm))
            }
            if (props.tableName === 'card') {
                dispatch(setSearchCards(searchTerm))
            }
        },
        [debouncedSearchTerm]
    );

    return (
        <div className={'search-container'}>
            <div className={'search-title b-title bt14 medium'}>Search</div>
            <div className={'inputSpan'}>
                <input
                    value={searchTerm}
                    onChange={onChangeHandler}
                    type={'text'}
                    id={'search'}
                    placeholder={'Provide your text'}
                    className={'input b-title bt14 medium'}
                ></input>
                <span className={'magnifier'}><AiOutlineSearch/></span>
            </div>
        </div>
    );
};

