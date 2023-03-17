import React from 'react'
import { MdOutlineDeleteForever } from 'react-icons/md'
import { GiHatchets } from 'react-icons/gi'
import { AiFillEdit } from 'react-icons/ai'
import { getPackId } from '../../store/cards-reducer'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { useNavigate } from 'react-router-dom'
import { deletePack, PackType, updatedPack } from '../../store/packs-reducer'
import classNames from 'classnames'

type PackDataType = {
    item: PackType
    userId: string | undefined
}

const Pack = ({ item, userId }: PackDataType) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const status = useAppSelector(state => state.app.status)

    const toCardsClickHandler = (cardsPack_id: string) => {
        dispatch(getPackId(cardsPack_id))
        navigate('/cards')
    }
    const deletePackHandler = (id: string) => {
        dispatch(deletePack(id))
    }

    const updatePackHandler = (id: string) => {
        const name = 'My new name for pack'
        dispatch(updatedPack(id, name))
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
                        onClick={() => toCardsClickHandler(item._id)}
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
                    onClick={() => item.user_id === userId && updatePackHandler(item._id)}>
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

