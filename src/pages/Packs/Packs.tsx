import React, { useEffect } from 'react'
import { CiEdit } from 'react-icons/ci'
import { MdOutlineDeleteForever } from 'react-icons/md'
import { Navigate } from 'react-router-dom'
import Preloader from '../../components/common/Preloader/Preloader'
import { createdPack, deletePack, getPacks, PackType, updatedPack } from '../../store/packs-reducer'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { Error } from '../../components/common/Error/Error';
import Filter from "../Filter/Filter";

const Packs = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
    const packs = useAppSelector<PackType[]>(state => state.packs.cardPacks)
    const status = useAppSelector(state => state.app.status)
    const error = useAppSelector(state => state.app.error)
    
    useEffect(() => {
        dispatch(getPacks())
    }, [])

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

    if (!isLoggedIn) {
        return <Navigate to={'/login'} />
    }

    return (
        <div className='packs'>
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
                    <Filter/>
                </div>
                <div className="table-wrapper">
                    <div className="table">
                        <div className="table-head">
                            <div className="item b-title bt14 medium">Name</div>
                            <div className="item b-title bt14 medium">Cards</div>
                            <div className="item b-title bt14 medium">Last Updated</div>
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
                                                <div className="action-item">A</div>
                                                <div className="action-item" onClick={() => updatePackHandler(e._id)}>
                                                    <CiEdit />
                                                </div>
                                                <div className="action-item" onClick={() => deletePackHandler(e._id)}>
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
            </div>
        </div>
    )
}

export default Packs