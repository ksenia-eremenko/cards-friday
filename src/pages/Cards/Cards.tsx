import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import Preloader from '../../components/common/Preloader/Preloader';
import { createdCard, deleteCard, getCards, setCardsPageCount, setCurrentCardsPage, updateCard } from '../../store/cards-reducer';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { Error } from '../../components/common/Error/Error';
import { SearchBar } from '../Filter/SearchBar/SearchBar';
import { IoIosArrowDown } from 'react-icons/io';
import classNames from 'classnames';
import { AiFillEdit, AiOutlineStar } from 'react-icons/ai';
import { MdOutlineDeleteForever } from 'react-icons/md';
import PaginationBlock from '../PaginationBlock/PaginationBlock';

const Cards = () => {
    const dispatch = useAppDispatch();
    const [sortUp, setSortUp] = useState<boolean>(false)
    const cards = useAppSelector(state => state.cards.cards)
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
    const status = useAppSelector(state => state.app.status)
    const error = useAppSelector(state => state.app.error)
    const packId = useAppSelector(state => state.cards.cardsPack_id)
    const cardQuestion = useAppSelector(state => state.cards.queryParams.cardQuestion);
    const pageCount = useAppSelector(state => state.cards.queryParams.pageCount);
    const currentPage = useAppSelector(state => state.cards.queryParams.page);
    const cardsTotalCount = useAppSelector<number>(state => state.cards.cardsTotalCount)
    const sortCards = useAppSelector(state => state.cards.queryParams.sortCards);
    const authId = useAppSelector(state => state.auth.profile?._id);
    //@ts-ignore
    const isMyCards = authId === cards[0]?.user_id

    useEffect(() => {
        dispatch(getCards(packId))
    }, [dispatch, packId, cardQuestion, pageCount, currentPage, sortCards])

    const createdCardHandler = () => {
        const card = {
            cardsPack_id: packId,
            question: 'My first question',
            answer: 'My first answer'
        }
        dispatch(createdCard(card));
    }

    const deleteCardHandler = (cardId: string) => {
        dispatch(deleteCard(cardId));
    }
    const updateCardHandler = (cardId: string) => {
        const newCard = {
            _id: cardId,
            question: 'My new question'
        }
        dispatch(updateCard(newCard));
    }

    const sortAnswerClickHandler = () => {

    }
    const sortUpdateClickHandler = () => {

    }

    const onPageChangedHandler = (page: number) => {
        dispatch(setCurrentCardsPage(page))
    }

    const onChangeSelectHandler = (option: number) => {
        dispatch(setCardsPageCount(option))
    }

    if (!isLoggedIn) {
        return <Navigate to={'/login'} />
    }

    return (
        <div className="cards">
            {(status === 'loading')
                && <Preloader />}
            <div className="container">
                <div className="in">
                    {status === 'failed' ? <Error errorText={error} /> : ''}
                    {
                        isMyCards
                            ? <div className="top">
                                <div className="title b-title bt22 semibold">My Pack</div>
                                <div className="styled-btn styled-btn-1" onClick={createdCardHandler}>Created New Card</div>
                            </div>
                            : <div className="top">
                                <div className="title b-title bt22 semibold">Friend's Pack</div>

                                <div className="styled-btn styled-btn-1">Learn to pack</div>
                            </div>
                    }

                    <div className="filter">
                        <SearchBar />
                    </div>
                    <div className="table-wrapper">
                        <div className="table">
                            <div className="table-head">
                                <div className="item b-title bt14 medium">Question</div>
                                <div
                                    className="item b-title bt14 medium with-sort"
                                    onClick={sortAnswerClickHandler}>Answer
                                    <span className={classNames(
                                        'icon',
                                        { 'active': sortUp }
                                    )}>
                                        <IoIosArrowDown />
                                    </span>
                                </div>
                                <div className="item b-title bt14 medium with-sort"
                                    onClick={sortUpdateClickHandler}>Last Updated
                                    <span className={classNames(
                                        'icon',
                                        { 'active': sortUp }
                                    )}>
                                        <IoIosArrowDown />
                                    </span>
                                </div>
                                <div className="item b-title bt14 medium">Grade</div>
                            </div>
                            <div className="table-body">
                                {cards.length
                                    ? cards.map((e, i) => {
                                        return (
                                            <div className="items" key={i}>
                                                <div className="item b-title bt14">{
                                                    //@ts-ignore
                                                    e.question
                                                }</div>
                                                <div className="item b-title bt14">{
                                                    //@ts-ignore
                                                    e.answer
                                                }</div>
                                                <div className="item b-title bt14">{
                                                    //@ts-ignore
                                                    e.updated
                                                }</div>

                                                <div className="actions">
                                                    <div className="grades">
                                                        <AiOutlineStar />
                                                        <AiOutlineStar />
                                                        <AiOutlineStar />
                                                        <AiOutlineStar />
                                                        <AiOutlineStar />
                                                    </div>
                                                    <div className={classNames(
                                                        'action-item',
                                                        { 'disabled': !isMyCards }
                                                    )} onClick={
                                                        //@ts-ignore
                                                        () => updateCardHandler(e._id)
                                                    }>
                                                        <AiFillEdit />
                                                    </div>
                                                    <div className={classNames(
                                                        'action-item',
                                                        { 'disabled': !isMyCards }
                                                    )} onClick={
                                                        //@ts-ignore
                                                        () => deleteCardHandler(e._id)
                                                    }>
                                                        <MdOutlineDeleteForever />
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                    : <div className="empty">Nothing found</div>}
                            </div>
                        </div>
                    </div>
                    {cardsTotalCount && cardsTotalCount > 0
                        ? <PaginationBlock
                            totalItemsCount={cardsTotalCount}
                            currentPage={currentPage}
                            onPageChanged={(page: number) => onPageChangedHandler(page)}
                            onChangeSelect={(option: number) => onChangeSelectHandler(option)}
                            pageCount={pageCount} />
                        : null}
                </div>
            </div>
        </div>
    )
}

export default Cards
