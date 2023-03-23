import React, {useEffect, useState} from 'react';
import {NavLink, useParams} from "react-router-dom";
import {BsArrowLeft} from "react-icons/bs";
import {useAppDispatch, useAppSelector} from "../../store/store";
import {LearnCard} from "./LearnCard/LearnCard";
import {cardType} from "../../api/cards-api";
import {getCard} from "./GetRandomCard/getRandomCard";


export const Learn = () => {
    const packName = useAppSelector<string>(state => state.cards.packName)
    const cards = useAppSelector<cardType[]>(state => state.cards.cards)
    const dispatch = useAppDispatch();
    const [first, setFirst] = useState<boolean>(true)
    const [card, setCard] = useState<cardType>({
        answer: '',
        question: '',
        packName: '',
        cardsPack_id: '',
        grade: 0,
        shots: 0,
        user_id: '',
        created: '',
        updated: '',
        _id: ''
    })

    const { id } = useParams()
    useEffect(() => {
        if (first) {
            setFirst(false)
        }

        if (cards.length > 0) {
            setCard(getCard(cards))
        }

        return () => {}
    }, [dispatch, id, cards, first])
    return (
        <div className={'profile'}>
            <div className={'in'}>
                <NavLink to='/packs' className="link-to-back">
                    <BsArrowLeft />
                    <span className='b-title bt14'>Back to Packs List</span>
                </NavLink>
                <div className={'b-title bt16 semibold bt22 align-center'}>Learn: "{packName}" </div>
                {cards.length > 0 ? (
                    <LearnCard cards={cards} card={card} setCard={setCard} setFirst={setFirst}/>
                ) : ( <div className={'align-center b-title bt22 semibold color6'}>No available cards in the pack</div>)}
                </div>
            </div>
    );
};
