import React, { useEffect, useState } from 'react'
import { MdOutlineDeleteForever } from 'react-icons/md'
import { Navigate, useNavigate } from 'react-router-dom'
import Preloader from '../../components/common/Preloader/Preloader'
import {
    createdPack,
    deletePack,
    getPacks,
    PackType,
    setCurrentPage,
    setPageCount,
    setSortPacks,
    updatedPack
} from '../../store/packs-reducer'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { Error } from '../../components/common/Error/Error';
import Filter from '../Filter/Filter';
import PaginationBlock from '../PaginationBlock/PaginationBlock';
import { getCards } from '../../store/cards-reducer'
import { GiHatchets } from 'react-icons/gi'
import { AiFillEdit } from 'react-icons/ai'
import { IoIosArrowDown } from 'react-icons/io'
import classNames from 'classnames'

const Packs = () => {
    const dispatch = useAppDispatch()
    const [sortСardsCount, setSortСardsCount] = useState<boolean>(false)
    const [sortUpdate, setSortUpdate] = useState<boolean>(false)
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
    // @ts-ignore
    const packs = useAppSelector<PackType[]>(state => state.packs.cardPacks)
    const totalItemsCount = useAppSelector<number | undefined>(state => state.packs.cardPacksTotalCount)
    const currentPage = useAppSelector<number>(state => state.packs.queryParams.page)
    const pageCount = useAppSelector<number>(state => state.packs.queryParams.pageCount)
    const page = useAppSelector<number>(state => state.packs.queryParams.page)
    const packName = useAppSelector(state => state.packs.queryParams.packName)
    const user_id = useAppSelector(state => state.packs.queryParams.user_id)
    const min = useAppSelector(state => state.packs.queryParams.min)
    const max = useAppSelector(state => state.packs.queryParams.max)
    const sortPacks = useAppSelector(state => state.packs.queryParams.sortPacks)
    const status = useAppSelector(state => state.app.status)
    const error = useAppSelector(state => state.app.error)
    const idUser = useAppSelector(state => state.auth.profile?._id)
    const navigate = useNavigate();
    const userId = useAppSelector(state => state.auth.profile?._id)


    useEffect(() => {
        dispatch(getPacks())
    }, [dispatch, pageCount, page, packName, user_id, min, max, sortPacks])

    const deletePackHandler = (id: string) => {
        dispatch(deletePack(id))
    }

    const updatePackHandler = (id: string) => {
        const name = 'My new name for pack'
        dispatch(updatedPack(id, name))
    }

    const createPackHandler = () => {
        const name = 'New Pack'
        dispatch(createdPack(name))
    }

    const onPageChangedHandler = (page: number) => {
        dispatch(setCurrentPage(page))
        // dispatch(getPacks())
    }

    const onChangeSelectHandler = (option: number) => {
        dispatch(setPageCount(option))
        // dispatch(getPacks())
    }

    const sortСardsCountClickHandler = () => {
        setSortСardsCount(!sortСardsCount);
        (!sortСardsCount) ? dispatch(setSortPacks('1cardsCount')) : dispatch(setSortPacks('0cardsCount'))
    }

    const sortUpdateClickHandler = () => {
        setSortUpdate(!sortUpdate);
        (!sortUpdate) ? dispatch(setSortPacks('1updated')) : dispatch(setSortPacks('0updated'))
    }

    const toCardsClickHandler = (cardsPack_id: string) => {
        dispatch(getCards(cardsPack_id))
        navigate('/cards')
    }

    if (!isLoggedIn) {
        return <Navigate to={'/login'} />
    }

    return (
        <div className="packs">
            {(status === 'loading')
                && <Preloader />}
            <div className="container">
                <div className="in">
                    {status === 'failed' ? <Error errorText={error} /> : ''}

                    <div className="top">
                        <div className="title">Friend's Pack</div>
                        <div className="styled-btn styled-btn-1" onClick={createPackHandler}>Add new pack</div>
                    </div>
                    <div className="filter">
                        <Filter />
                    </div>
                    <div className="table-wrapper">
                        <div className="table">
                            <div className="table-head">
                                <div className="item b-title bt14 medium">Name</div>
                                <div
                                    className="item b-title bt14 medium with-sort"
                                    onClick={sortСardsCountClickHandler}>Cards
                                    <span className={classNames(
                                        'icon',
                                        { 'active': sortСardsCount }
                                    )}>
                                        <IoIosArrowDown />
                                    </span>
                                </div>
                                <div className="item b-title bt14 medium with-sort"
                                    onClick={sortUpdateClickHandler}>Last Updated
                                    <span className={classNames(
                                        'icon',
                                        { 'active': sortUpdate }
                                    )}>
                                        <IoIosArrowDown />
                                    </span>
                                </div>
                                <div className="item b-title bt14 medium">Created by</div>
                                <div className="item b-title bt14 medium">Actions</div>
                            </div>
                            <div className="table-body">
                                {packs.length
                                    ? packs.map((e, i) => {
                                        return (
                                            <div className="items" key={i}>
                                                <div className="item b-title bt14">{e.name}</div>
                                                <div className="item b-title bt14">{e.cardsCount}</div>
                                                <div className="item b-title bt14">{e.updated}</div>
                                                <div className="item b-title bt14">{e.user_name}</div>
                                                <div className="actions">
                                                    {e.cardsCount || (userId === e.user_id)
                                                        ? <div
                                                            className='action-item'
                                                            onClick={() => toCardsClickHandler(e._id)}
                                                        >
                                                            <GiHatchets />
                                                        </div>
                                                        : <div className="action-item disabled"><GiHatchets /></div>
                                                    }
                                                    <div className={e.user_id === idUser ? 'action-item' : 'action-item disabled'} onClick={() => e.user_id === idUser && updatePackHandler(e._id)}>
                                                        <AiFillEdit />
                                                    </div>
                                                    <div className={e.user_id === idUser ? 'action-item' : 'action-item disabled'} onClick={() => e.user_id === idUser && deletePackHandler(e._id)}>
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
                    {totalItemsCount && totalItemsCount > 0
                        ? <PaginationBlock
                            totalItemsCount={totalItemsCount}
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

export default Packs

