import React, { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import Preloader from '../../components/common/Preloader/Preloader';
import { createdCard, getCards } from '../../store/cards-reducer';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { Error } from '../../components/common/Error/Error';
import { SearchBar } from '../Filter/SearchBar/SearchBar';
import { IoIosArrowDown } from 'react-icons/io';
import classNames from 'classnames';
import { GiHatchets } from 'react-icons/gi';
import { AiFillEdit } from 'react-icons/ai';
import { MdOutlineDeleteForever } from 'react-icons/md';

const Cards = () => {
    const dispatch = useAppDispatch();
    const [sortUp, setSortUp] = useState<boolean>(false)
    const cards = useAppSelector(state => state.cards.cards)
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
    const status = useAppSelector(state => state.app.status)
    const error = useAppSelector(state => state.app.error)
    const id = useAppSelector(state => state.cards.cardsPack_id)
    
    useEffect(() => {

        dispatch(getCards(id))
    }, [dispatch, id])

    const createdCardHandler = () => {
        const card = {
            cardsPack_id: id,
            question: 'My first question',
            answer: 'My first answer'
        }
        dispatch(createdCard(card));
    }

    const sortAnswerClickHandler = () => {

    }
    const sortUpdateClickHandler = () => {

    }

    if (!isLoggedIn) {
        return <Navigate to={'/login'} />
    }

    return (
        <div className='cards'>
            {(status === 'loading')
                && <Preloader />}
            <div className="container">
                <div className="in">
                    {status === 'failed' ? <Error errorText={error} /> : ''}
                    <div className="top">
                        <div className="title b-title bt22 semibold">Friend's Pack</div>
                        <div className="styled-btn styled-btn-1">Learn to pack</div>
                    </div>
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
                                                {/* <div className="item b-title bt14">{e.grade}</div> */}
                                                <div className="actions">
                                                    <div className='action-item'>
                                                        <GiHatchets />
                                                    </div>
                                                    <div className='action-item'>
                                                        <AiFillEdit />
                                                    </div>
                                                    <div className='action-item'>
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
                    <div className="pagination">

                    </div>
                </div>
                <div className="styled-btn styled-btn-1" onClick={createdCardHandler}>Created New Card</div>
            </div>
        </div>
    )
}

export default Cards