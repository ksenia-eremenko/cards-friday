import React, {useEffect, useState} from 'react';
import './FlashCards.scss'
import {useAppDispatch, useAppSelector} from "../../store/store";
import {getCards, updateGradeCard} from "../../store/cards-reducer";
import {cardType} from "../../api/cards-api";
import {getCard} from "./getCardSmartRandom";
import {NavLink, useParams} from "react-router-dom";
import {BsArrowLeft} from "react-icons/bs";


const grades = ['Did not know', 'Forgot', 'A lot of thought', 'Confused', 'Knew the answer']

export const FlashCards = () => {
    const [show, setShow] = useState(false)
    const [valueRadio, setValueRadio] = useState<number>(1)
    const dispatch = useAppDispatch();
    const cardsPack_id = useAppSelector(state => state.cards.cardsPack_id)
    const cards = useAppSelector<cardType[]>(state => state.cards.cards)
    const packName = useAppSelector<string>(state => state.cards.packName)
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


    const showHandler = () => {
        setShow(!show)
    }

    const onNextHandler = () => {
        setShow(false)
        setFirst(true)
        if (cards.length > 0) {
            dispatch(
                updateGradeCard({card_id: card._id, grade: valueRadio, shots: card.shots})
            )
            setCard(getCard(cards))
        }
    }
    return (
        <div className={'profile'}>
            <div className={'in'}>
                <NavLink to='/packs' className="link-to-back">
                    <BsArrowLeft />
                    <span className='b-title bt14'>Back to Packs List</span>
                </NavLink>
            <div className={'b-title bt16 semibold bt22 align-center'}>Learn: {packName} </div>
            <div className={'form-wrapper auth-form'}>
                <div className={'question b-title bt16 semibold align-center'}>Question:
                    <span className={' b-title bt16 align-center color10 light'}> {card.question}</span>
                </div>
                <div className={'b-title bt14 color6 align-center'}>Количество попыток ответов на вопрос: <span
                    className={'b-title bt14 color9'}>{card.shots}</span></div>

                {show ? (<>
                    <div className={'question b-title bt16 semibold align-center'}>
                        Answer: <span
                        className={' b-title bt16 align-center color10 light'}>{card.answer}</span>
                    </div>
                    <div className={'b-title bt16 align-center'}>Rate yourself:
                        <div>
                            {grades.map((el, index) => {
                                const onClickHandler = () => {
                                    setValueRadio(index + 1)
                                }

                                return (
                                    <div key={index}>
                                        <label>
                                            <input
                                                type="radio"
                                                value={index + 1}
                                                checked={valueRadio === index + 1}
                                                onClick={onClickHandler}
                                            />
                                            {el}
                                        </label>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <button className={'styled-btn styled-btn-1'} onClick={onNextHandler}>Next</button>
                </>) : (<>
                    <button className={'styled-btn styled-btn-1'} onClick={showHandler}>Show answer</button>
                </>)}
            </div>
            </div>
        </div>
    );
}
