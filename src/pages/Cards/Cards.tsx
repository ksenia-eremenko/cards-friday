import React, { useEffect, useState } from 'react'
import {Navigate, NavLink, useNavigate, useParams, useSearchParams} from 'react-router-dom';
import Preloader from '../../components/common/Preloader/Preloader';
import {
    createdCard,
    getCards,
    setCards,
    setCardsPageCount,
    setCurrentCardsPage,
    setCurrentPackName,
    setSortCards
} from '../../store/cards-reducer';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { SearchBar } from '../../components/FilterBar/SearchBar/SearchBar';
import { IoIosArrowDown } from 'react-icons/io';
import classNames from 'classnames';
import PaginationBlock from '../../components/PaginationBlock/PaginationBlock';
import { BsArrowLeft } from 'react-icons/bs';
import { cardType } from '../../api/cards-api';
import Popover from '../../components/common/Popover/Popover';
import { deletePack, updatedPack } from '../../store/packs-reducer';
import EditableTitle from '../../components/common/EditableTitle/EditableTitle';
import Card from './Card';
import ModalForCreatedCard from './Modals/ModalsForCreatedCard';
import ModalDeletePack from '../Packs/Modals/ModalDeletePack';
import {packsAPI} from "../../api/packs-api";

const Cards = () => {
    const dispatch = useAppDispatch();
    const { packID } = useParams()
    const [sortAnswer, setSortAnswer] = useState<boolean>(false)
    const [sortUpdateCards, setSortUpdateCards] = useState<boolean>(false)
    const [editMode, setEditMode] = useState(false)

    const [modalActive, setModalActive] = useState(false)
    const [modalDeleteActive, setModalDeleteActive] = useState(false)
    const [valueInputQuestion, setValueInputQuestion] = useState('')
    const [valueInputAnswer, setValueInputAnswer] = useState('')

    const cards = useAppSelector<cardType[]>(state => state.cards.cards)
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
    const status = useAppSelector(state => state.app.status)
    const cardsPack_id = useAppSelector(state => state.cards.cardsPack_id)
    const cardQuestion = useAppSelector(state => state.cards.queryParams.cardQuestion);
    const pageCount = useAppSelector(state => state.cards.queryParams.pageCount);
    const currentPage = useAppSelector(state => state.cards.queryParams.page);
    const cardsTotalCount = useAppSelector<number>(state => state.cards.cardsTotalCount)
    const sortCards = useAppSelector(state => state.cards.queryParams.sortCards);
    const authId = useAppSelector(state => state.profile.profile?._id);
    const packUserId = useAppSelector(state => state.cards.packUserId);
    const packTitle = useAppSelector(state => state.cards.packName)

    const [searchParams, setSearchParams] = useSearchParams();
    const isMyCards = authId === packUserId;
    const id = searchParams.get('cardsPack_id')
    const navigate = useNavigate()

    useEffect(() => {
        id && dispatch(getCards(id));
        setSearchParams({ cardsPack_id })
    }, [dispatch, cardsPack_id, cardQuestion, pageCount, currentPage, sortCards, setSearchParams, id])

    const createdCardHandler = () => {
        setModalActive(false)
        const card = {
            cardsPack_id: cardsPack_id,
            question: valueInputQuestion,
            answer: valueInputAnswer
        }
        dispatch(createdCard(card));
        setValueInputQuestion('')
        setValueInputAnswer('')
    }

    const sortAnswerClickHandler = () => {
        setSortAnswer(!sortAnswer);
        (!sortAnswer) ? dispatch(setSortCards('1cardsCount')) : dispatch(setSortCards('0cardsCount'))
    }
    const sortUpdateClickHandler = () => {
        setSortUpdateCards(!sortUpdateCards);
        (!sortUpdateCards) ? dispatch(setSortCards('1updated')) : dispatch(setSortCards('0updated'))
    }

    const onPageChangedHandler = (page: number) => {
        dispatch(setCurrentCardsPage(page))
    }

    const onChangeSelectHandler = (option: number) => {
        dispatch(setCardsPageCount(option))
    }

    const onClickEditHandler = async (name: string, deckCover: string) => {
        if(packID){
            await  packsAPI.updatedPack({ cardsPack: { _id: packID, name, deckCover } })
            dispatch(setCards({cardPack_id: packID}))
        }


    }

    const onClickDeleteHandler = (id: string) => {
        dispatch(deletePack(id))
        setModalDeleteActive(!modalDeleteActive)
        setTimeout(() => {
            navigate('/packs')
        }, 1000)
    }

    const onClickLearnHandler = () => {
        dispatch(getCards(cardsPack_id))
        navigate('/learn')
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
                    <NavLink to='/packs' className="link-to-back">
                        <BsArrowLeft />
                        <span className='b-title bt14'>Back to Packs List</span>
                    </NavLink>
                    {isMyCards
                        ? <div className="top">
                            <div className='title-wrapper'>
                                <EditableTitle
                                    editMode={editMode}
                                    setEditMode={setEditMode}
                                    title={packTitle}
                                    callback={(name: string, deckCover: string) => onClickEditHandler(name, deckCover)}
                                    className={"title b-title bt22 semibold"}
                                />
                                <Popover onClickEdit={() => setEditMode(true)} onClickDelete={()=>setModalDeleteActive(true)} onClickLearn={onClickLearnHandler}/>
                            </div>
                            <div className={classNames(
                                "styled-btn styled-btn-1",
                                { 'disabled': status === 'loading' }
                            )} onClick={() => setModalActive(true)}>Created New Card</div>
                        </div>
                        : <div className="top">
                            <div className="title b-title bt22 semibold">{packTitle}</div>
                            <div className={classNames(
                                "styled-btn styled-btn-1",
                                { 'disabled': status === 'loading' }
                            )}>Learn to pack</div>
                        </div>}
                    <ModalForCreatedCard
                        modalActive={modalActive}
                        setModalActive={setModalActive}
                        valueInputQuestion={valueInputQuestion}
                        setValueInputQuestion={setValueInputQuestion}
                        setValueInputAnswer={setValueInputAnswer}
                        valueInputAnswer={valueInputAnswer}
                        createdCardHandler={createdCardHandler}
                    />

                    <div className="filter">
                        <SearchBar tableName={'card'} />
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
                                        { 'active': sortAnswer }
                                    )}>
                                        <IoIosArrowDown />
                                    </span>
                                </div>
                                <div className="item b-title bt14 medium with-sort"
                                    onClick={sortUpdateClickHandler}>Last Updated
                                    <span className={classNames(
                                        'icon',
                                        { 'active': sortUpdateCards }
                                    )}>
                                        <IoIosArrowDown />
                                    </span>
                                </div>
                                <div className="item b-title bt14 medium">Grade</div>
                            </div>
                            <div className="table-body">
                                {cards.length
                                    ? cards.map((e, i) => {
                                        return (<Card key={i} item={e} isMyCards={isMyCards} />)
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
            <ModalDeletePack
                modalActive={modalDeleteActive}
                setModalActive={setModalDeleteActive}
                packName={packTitle}
                id={cardsPack_id}
                deletePackHandler={(cardsPack_id:string)=>onClickDeleteHandler(cardsPack_id)}
            />
        </div>
    )
}

export default Cards
