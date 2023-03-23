import React, { useState } from 'react';
import { setUserId } from "../../../store/packs-reducer";
import { useAppDispatch, useAppSelector } from "../../../store/store";


const DeckOfCards = () => {
    const [onOff, setOnOff] = useState(false)

    let onn = {
        backgroundColor: onOff ? "#366EFF" : "#ffffff",
        cursor: 'pointer',
        color: onOff ? "#ffffff" : "#0a0a0a",
    }
    let off = {
        backgroundColor: onOff ? "#ffffff" : "#366EFF",
        cursor: 'pointer',
        color: onOff ? "#0a0a0a" : "#ffffff",
    }
    const dispatch = useAppDispatch();
    const userId = useAppSelector(state => state.auth.profile?._id)


    const handleMyCardsClick = () => {
        setOnOff(true)
        dispatch(setUserId(userId ? userId : ''))
    }

    const handleAllCardsClick = () => {
        setOnOff(false)
        dispatch(setUserId(''))
    }
    return (
        <div className={'show-cards-container'}>
            <div className={'show-title b-title bt14 medium'}>Show pack cards</div>
            <div className={'show-cards-wrapper'}>
                <button className={'my-cards styled-btn-2 b-title bt14 medium'} onClick={handleMyCardsClick} style={onn}>My</button>
                <button className={'all-cards styled-btn-1 b-title bt14 medium '} onClick={handleAllCardsClick} style={off}>All
                </button>
            </div>
        </div>
    );
};

export default DeckOfCards;