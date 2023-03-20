import React from 'react'
import { MdOutlineDeleteForever } from 'react-icons/md'
import { GiHatchets } from 'react-icons/gi'
import { AiFillEdit } from 'react-icons/ai'
import {getPackId, setCurrentPackName} from '../../store/cards-reducer'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { useNavigate } from 'react-router-dom'
import { deletePack, PackType, updatedPack } from '../../store/packs-reducer'
import classNames from 'classnames'

type PackDataType = {
    item: PackType
    userId: string | undefined
    updatePackHandler: (cardsPack_id: string, packTitle: string) => void
    deletePackHandler: (cardsPack_id: string) => void
}

const Pack = ({ item, userId, updatePackHandler, deletePackHandler }: PackDataType) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const status = useAppSelector(state => state.app.status)

    const toCardsClickHandler = (cardsPack_id: string, title: string) => {
        dispatch(getPackId(cardsPack_id))
        dispatch(setCurrentPackName(title))
        navigate('/cards')
    }

    return (
        <div className="items">
            <div className="item b-title bt14">{item.name}</div>
            <div className="item b-title bt14">{item.cardsCount}</div>
            <div className="item b-title bt14">{new Date(item.updated).toLocaleDateString('ua')}</div>
            <div className="item b-title bt14">{item.user_name}</div>
            <div className="actions">
                {item.cardsCount || (userId === item.user_id)
                    ? <div
                        className={classNames(
                            'action-item',
                            { 'disabled': status === 'loading' }
                        )}
                        onClick={() => toCardsClickHandler(item._id, item.name)}
                    >
                        <GiHatchets />
                    </div>
                    : <div className="action-item disabled"><GiHatchets /></div>
                }
                <div
                    className={classNames(
                        'action-item',
                        { 'disabled': item.user_id !== userId || status === 'loading' }
                    )}
                    onClick={() => item.user_id === userId && updatePackHandler(item._id, item.name)}>
                    <AiFillEdit />
                </div>

                <div
                    className={classNames(
                        'action-item',
                        { 'disabled': item.user_id !== userId || status === 'loading' }
                    )}
                    onClick={() => item.user_id === userId && deletePackHandler(item._id)}>
                    <MdOutlineDeleteForever />
                </div>
            </div>
        </div>
    )
}

export default Pack

