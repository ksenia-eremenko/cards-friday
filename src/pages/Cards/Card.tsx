import React, { useState } from 'react'
import classNames from 'classnames';
import { AiFillEdit } from 'react-icons/ai';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { deleteCard, updateCard } from '../../store/cards-reducer';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { countRatingInPercent } from '../../utils/countRatingInPercent';
import { cardType } from '../../api/cards-api';
import ModalEditCard from './Modals/ModalEditCard';
import ModalDeleteCard from './Modals/ModalDeleteCard';

type CardPropsType = {
    item: cardType
    isMyCards: boolean
}

const Card = ({ item, isMyCards }: CardPropsType) => {
    const [modalEditActive, setModalEditActive] = useState(false)
    const [modalDeleteActive, setModalDeleteActive] = useState(false)
    const [valueInputEditQuestion, setValueInputEditQuestion] = useState('')
    const [valueInputEditAnswer, setValueInputEditAnswer] = useState('')

    const dispatch = useAppDispatch();
    const status = useAppSelector(state => state.app.status)

    const deleteCardHandler = (cardId: string) => {
        dispatch(deleteCard(cardId));
        setModalDeleteActive(false);
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
                <div className='grades-active' style={{ width: `${countRatingInPercent(item.grade, 5)}%` }}></div>
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
                )} onClick={() => setModalDeleteActive(true)}>
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
        <ModalDeleteCard
            modalActive={modalDeleteActive}
            setModalActive={setModalDeleteActive}
            id={item._id}
            deleteCardHandler={deleteCardHandler}
        />
    </div >
}

export default Card;
