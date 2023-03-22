import React, { useState } from 'react'
import classNames from 'classnames';
import { AiFillEdit, AiOutlineStar } from 'react-icons/ai';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { deleteCard, updateCard } from '../../store/cards-reducer';
import { useAppDispatch, useAppSelector } from '../../store/store';
import ModalEditCard from './Modals/ModalEditCard';

const Card = ({ item, isMyCards }: any) => {
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

    const onClickEditHandler = () => {
        setModalEditActive(true)
        setValueInputEditQuestion(item.question);
        setValueInputEditAnswer(item.answer);
    }
    return <div className="items">
        <div className="item b-title bt14">{item.question}</div>
        <div className="item b-title bt14">{item.answer}</div>
        <div className="item b-title bt14">{new Date(item.updated).toLocaleDateString('ua')}</div>

        <div className="actions">
            <div className="grades">
                <AiOutlineStar />
                <AiOutlineStar />
                <AiOutlineStar />
                <AiOutlineStar />
                <AiOutlineStar />
            </div>
            {isMyCards
                ? <div className={classNames(
                    'action-item',
                    { 'disabled': status === 'loading' }
                )} onClick={() => onClickEditHandler()}>
                    <AiFillEdit />
                </div>
                : ''}
            {isMyCards
                ? <div className={classNames(
                    'action-item',
                    { 'disabled': status === 'loading' }
                )} onClick={() => deleteCardHandler(item._id)}>
                    <MdOutlineDeleteForever />
                </div>
                : ''}
        </div>

        <ModalEditCard
            modalEditActive={modalEditActive}
            setModalEditActive={setModalEditActive}
            valueInputEditQuestion={valueInputEditQuestion}
            setValueInputEditQuestion={setValueInputEditQuestion}
            valueInputEditAnswer={valueInputEditAnswer}
            setValueInputEditAnswer={setValueInputEditAnswer}
            updateCardHandler={updateCardHandler}
            id={item._id}
        />
    </div >
}

export default Card;
