import React from 'react';
import {setUserId} from "../../../store/packs-reducer";
import {useAppDispatch, useAppSelector} from "../../../store/store";


const DeckOfCards = () => {

    const dispatch = useAppDispatch();
    const userId = useAppSelector(state => state.auth.profile?._id)


    const handleMyCardsClick = () => {
        dispatch(setUserId(userId ? userId : ''))
    }

    const handleAllCardsClick = () => {
        dispatch(setUserId(''))
    }
    return (
        <div className={'show-cards-container'}>
            <div className={'show-title b-title bt14 medium'}>Show pack cards</div>
            <div className={'show-cards-wrapper'}>
                <button className={'my-cards styled-btn-2 b-title bt14 medium'} onClick={handleMyCardsClick}>My</button>
                <button className={'all-cards styled-btn-1 b-title bt14 medium '} onClick={handleAllCardsClick}>All
                </button>
            </div>
        </div>
    );
};

export default DeckOfCards;