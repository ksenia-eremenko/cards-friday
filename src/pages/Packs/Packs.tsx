import React, { ChangeEvent, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Preloader from '../../components/common/Preloader/Preloader';
import {
    createdPack, deletePack,
    getPacks,
    PackType,
    setCurrentPage,
    setPageCount,
    setSortPacks, updatedPack,
} from '../../store/packs-reducer';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { Error } from '../../components/common/Error/Error';
import Filter from '../Filter/Filter';
import PaginationBlock from '../PaginationBlock/PaginationBlock';
import { IoIosArrowDown } from 'react-icons/io';
import classNames from 'classnames';
import Modal from '../../components/common/Modal/Modal';
import Input from '../../components/common/Input/Input';
import { Pack } from './Pack';

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
    const userId = useAppSelector(state => state.auth.profile?._id)

    useEffect(() => {
        dispatch(getPacks())
    }, [dispatch, pageCount, page, packName, user_id, min, max, sortPacks])

    const createPackHandler = () => {
        setModalActive(false)
        dispatch(createdPack(valueInput))
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

    const deletePackHandler = (id: string) => {
        dispatch(deletePack(id))
    }

    const updatePackHandler = (id: string, packName: string) => {
        dispatch(updatedPack(id, packName))
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
                        <div className="title b-title bt22 semibold">Packs list</div>
                        <div className={classNames(
                            "styled-btn styled-btn-1",
                            { 'disabled': status === 'loading' }
                        )} onClick={() => setModalActive(!modalActive)}>Add new pack</div>
                    </div>
                    <Modal modalActive={modalActive} setModalActive={setModalActive} title="Add new pack">
                        <form className="form-style">
                            <Input
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setValueInput(e.currentTarget.value)}
                                value={valueInput}
                                placeholder='Name Pack'
                            />
                            <div className="styled-checkbox">
                                <Input
                                    id="private"
                                    type="checkbox"
                                />
                                <label htmlFor="private" className="b-title bt16 medium">Private pack</label>
                            </div>
                            <div className="btns">
                                <div
                                    className="styled-btn styled-btn-2"
                                    onClick={() => setModalActive(false)}
                                >Cancel</div>
                                <div className="styled-btn styled-btn-1" onClick={createPackHandler}>Save</div>
                            </div>
                        </form>
                    </Modal>
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
                                    ? packs.map((e, i) => <Pack
                                        item={e}
                                        userId={userId}
                                        key={i}
                                        updatePackHandler={() => updatePackHandler(e._id, e.name)}
                                        deletePackHandler={() => deletePackHandler(e._id)}
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
                            pageCount={pageCount} />
                        : null}
                </div>
            </div>
        </div>
    )
}

export default Packs

