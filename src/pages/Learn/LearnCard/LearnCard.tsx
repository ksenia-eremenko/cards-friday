import React, {FC, useState} from 'react';
import {useAppDispatch} from "../../../store/store";
import {updateGradeCard} from "../../../store/cards-reducer";
import {cardType} from "../../../api/cards-api";
import {getCard} from "../GetRandomCard/getRandomCard";


const grades = ['Did not know', 'Forgot', 'A lot of thought', 'Confused', 'Knew the answer']

type LearnCardPropsType = {
    setFirst: (value: boolean) => void
    cards: cardType[]
    card: cardType
    setCard: (value: any) => void
}
export const LearnCard: FC<LearnCardPropsType> = ({setFirst, cards, card, setCard}) => {
    const [show, setShow] = useState(false)
    const [valueRadio, setValueRadio] = useState<number>(1)
    const dispatch = useAppDispatch();

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
        <>
            <div className={'form-wrapper auth-form'}>
                <div className={'question b-title bt16 semibold align-center'}>Question:
                    <span className={'question-item b-title bt16 align-center color10 light'}>{card.question}</span>
                </div>
                <div className={'b-title bt14 color6 align-center'}>Количество попыток ответов на вопрос: <span
                    className={'b-title bt14 color9'}>{card.shots}</span></div>
                {show ? (<>
                    <div className={'question b-title bt16 semibold align-center'}>Answer:
                        <span className={'question-item b-title bt16 align-center color10 light'}>{card.answer}</span>
                    </div>
                    <div className={'b-title bt16 '}>Rate yourself:
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
        </>
    );
}
