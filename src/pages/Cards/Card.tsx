import React, { ChangeEvent, useEffect, useState } from 'react'
import classNames from 'classnames';
import { AiFillEdit, AiOutlineStar } from 'react-icons/ai';
import { MdOutlineDeleteForever } from 'react-icons/md';
import Modal from '../../components/common/Modal/Modal';
import Input from '../../components/common/Input/Input';
import { deleteCard, updateCard } from '../../store/cards-reducer';
import { useAppDispatch, useAppSelector } from '../../store/store';
import {countRatingInPercent} from '../../utils/countRatingInPercent';
import {cardType} from '../../api/cards-api';

type CardPropsType = {
    item: cardType
    isMyCards: boolean
}

const Card = ({ item, isMyCards }: CardPropsType) => {
    const [modalEditActive, setModalEditActive] = useState(false)
    const [valueInputEditQuestion, setValueInputEditQuestion] = useState('')
    const [valueInputEditAnswer, setValueInputEditAnswer] = useState('')

    const dispatch = useAppDispatch();
    const status = useAppSelector(state => state.app.status)

    const deleteCardHandler = (cardId: string) => {
        dispatch(deleteCard(cardId));
    }
    const updateCardHandler = (cardId: string) => {
        setModalEditActive(false)
        const newCard = {
            _id: cardId,
            question: valueInputEditQuestion,
            answer: valueInputEditAnswer
        }
        dispatch(updateCard(newCard));
        setValueInputEditQuestion('')
        setValueInputEditAnswer('')
    }

    return <div className="items">
        <div className="item b-title bt14"
            onClick={() => console.log(item._id)}
        >{item.question}</div>
        <div className="item b-title bt14">{item.answer}</div>
        <div className="item b-title bt14">{new Date(item.updated).toLocaleDateString('ua')}</div>

        <div className="actions">
            <div className="grades">
                <div className='grades-active' style={{width: `${countRatingInPercent(item.grade, 5)}%`}}></div>
            </div>
            {isMyCards
                ? <div className={classNames(
                    'action-item',
                    { 'disabled': status === 'loading' }
                )} onClick={
                    () => setModalEditActive(true)
                }>
                    <AiFillEdit />
                </div>
                : ''}
            {isMyCards
                ? <div className={classNames(
                    'action-item',
                    { 'disabled': status === 'loading' }
                )} onClick={
                    () => deleteCardHandler(item._id)
                }>
                    <MdOutlineDeleteForever />
                </div>
                : ''}
        </div>

        <Modal modalActive={modalEditActive} setModalActive={setModalEditActive} title="Edit pack">
            <form className="form-style">
                <Input
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setValueInputEditQuestion(e.currentTarget.value)}
                    value={valueInputEditQuestion}
                    placeholder='New question'
                />
                <Input
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setValueInputEditAnswer(e.currentTarget.value)}
                    value={valueInputEditAnswer}
                    placeholder='New answer'
                />
                <div className="btns">
                    <div
                        className="styled-btn styled-btn-2"
                        onClick={() => setModalEditActive(false)}
                    >Cancel</div>
                    <div className="styled-btn styled-btn-1"
                        onClick={() => updateCardHandler(item._id)}>Save</div>
                </div>
            </form>
        </Modal>

    </div >
}

export default Card;
