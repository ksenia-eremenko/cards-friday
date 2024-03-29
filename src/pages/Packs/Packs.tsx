import React, {useEffect, useState} from 'react';
import {Navigate} from 'react-router-dom';
import Preloader from '../../components/common/Preloader/Preloader';
import {createdPack, getPacks, PackType, setCurrentPage, setPageCount, setSortPacks,} from '../../store/packs-reducer';
import {useAppDispatch, useAppSelector} from '../../store/store';
import {Error} from '../../components/common/Error/Error';
import Filter from '../../components/FilterBar/Filter';
import PaginationBlock from '../../components/PaginationBlock/PaginationBlock';
import {IoIosArrowDown} from 'react-icons/io';
import classNames from 'classnames';
import {Pack} from './Pack';
import ModalAddNewPack from './Modals/ModalAddNewPack';

const Packs = () => {
    const [sortСardsCount, setSortСardsCount] = useState<boolean>(false)
    const [sortUpdate, setSortUpdate] = useState<boolean>(false)
    const [modalActive, setModalActive] = useState(false)
    const [valueInput, setValueInput] = useState('')


    const dispatch = useAppDispatch()

    const error = useAppSelector(state => state.app.error)
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
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
    const userId = useAppSelector(state => state.profile.profile?._id)
    const deckCover = useAppSelector(state => state.packs.deckCover)

    useEffect(() => {
        dispatch(getPacks())
    }, [dispatch, pageCount, page, packName, user_id, min, max, sortPacks])

    const createPackHandler = (name: string, deckCover: string) => {
        dispatch(createdPack({name, deckCover}))
        setModalActive(false)
        setValueInput('')
    }


    const onPageChangedHandler = (page: number) => {
        dispatch(setCurrentPage(page))
    }

    const onChangeSelectHandler = (option: number) => {
        dispatch(setPageCount(option))
    }

    const sortСardsCountClickHandler = () => {
        setSortСardsCount(!sortСardsCount);
        (!sortСardsCount) ? dispatch(setSortPacks('1cardsCount')) : dispatch(setSortPacks('0cardsCount'))
    }

    const sortUpdateClickHandler = () => {
        setSortUpdate(!sortUpdate);
        (!sortUpdate) ? dispatch(setSortPacks('1updated')) : dispatch(setSortPacks('0updated'))
    }

    const addPackHandler = (name: string, deckCover: string) => {
        dispatch(createdPack({name, deckCover}))
        setModalActive(false)
        setValueInput('')
    }


    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (
        <div className="packs">
            {(status === 'loading')
                && <Preloader/>}
            <div className="container">
                <div className="in">
                    {status === 'failed' ? <Error errorText={error}/> : ''}
                    <div className="top">
                        <div className="title b-title bt22 semibold">Packs list</div>
                        <div className={classNames(
                            "styled-btn styled-btn-1",
                            {'disabled': status === 'loading'}
                        )} onClick={() => setModalActive(true)}>Add new pack
                        </div>
                    </div>
                    <ModalAddNewPack
                        modalActive={modalActive}
                        setModalActive={setModalActive}
                        valueInput={valueInput}
                        setValueInput={setValueInput}
                        createPackHandler={createPackHandler}
                        deckCover={deckCover}
                        addPackHandler={addPackHandler}
                        userId={userId}
                        userIdCard={user_id}
                    />
                    <div className="filter">
                        <Filter/>
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
                                        {'active': sortСardsCount}
                                    )}>
                                        <IoIosArrowDown/>
                                    </span>
                                </div>
                                <div className="item b-title bt14 medium with-sort"
                                     onClick={sortUpdateClickHandler}>Last Updated
                                    <span className={classNames(
                                        'icon',
                                        {'active': sortUpdate}
                                    )}>
                                        <IoIosArrowDown/>
                                    </span>
                                </div>
                                <div className="item b-title bt14 medium">Created by</div>
                                <div className="item b-title bt14 medium">Actions</div>
                            </div>
                            <div className="table-body">
                                {packs.length
                                    ? packs.map((e, i) => <Pack
                                        item={e}
                                        userId={userId}
                                        key={i}
                                        _id={e._id}
                                    />)
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
                            pageCount={pageCount}/>
                        : null}
                </div>
            </div>
        </div>
    )
}

export default Packs

