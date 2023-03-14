import React from 'react';

import './SearchBar.scss'
import {AiOutlineSearch} from "react-icons/ai";

export const SearchBar = () => {
    return (
        <div className={'search-container'}>
            <div className={'search-title b-title bt14 medium'}>Search</div>
            <div>
                <input
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

