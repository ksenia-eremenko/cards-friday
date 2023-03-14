import React from 'react';
import './DeckOfCards.scss'

const DeckOfCards = () => {
    return (
        <div className={'show-cards-container'}>
            <div className={'show-title b-title bt14 medium'}>Show pack cards</div>
            <div className={'show-cards-wrapper'}>
                <button className={'my-cards styled-btn-2 b-title bt14 medium'}>My</button>
                <button className={'all-cards styled-btn-1 b-title bt14 medium '}>All</button>
            </div>
        </div>
    );
};

export default DeckOfCards;