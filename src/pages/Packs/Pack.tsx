import React, { ChangeEvent, useState } from 'react'
import { MdOutlineDeleteForever } from 'react-icons/md'
import { GiHatchets } from 'react-icons/gi'
import { AiFillEdit } from 'react-icons/ai'
import {getPackId, setCurrentPackName} from '../../store/cards-reducer'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { useNavigate } from 'react-router-dom'
import { deletePack, PackType, updatedPack } from '../../store/packs-reducer'
import classNames from 'classnames'
import Modal from '../../components/common/Modal/Modal'
import Input from '../../components/common/Input/Input'

type PackDataType = {
    item: PackType
    userId: string | undefined
    updatePackHandler: (cardsPack_id: string, packTitle: string) => void
    deletePackHandler: (cardsPack_id: string) => void
}

export const Pack = ({ item, userId, updatePackHandler, deletePackHandler }: PackDataType) => {
    const [modalActive, setModalActive] = useState(false)
    const [valueInput, setValueInput] = useState('')

    const status = useAppSelector(state => state.app.status)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const toCardsClickHandler = (cardsPack_id: string, title: string) => {
        dispatch(getPackId(cardsPack_id))
        dispatch(setCurrentPackName(title))
        navigate('/cards')
    }

    return (
        <div className="items">
            <div
                className={classNames(
                    "item name b-title bt14",
                    { "disabled": !item.cardsCount }
                )}
                onClick={() => (item.cardsCount || (userId === item.user_id)) && toCardsClickHandler(item._id, item.name)}>{item.name}</div>
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
                    onClick={() => setModalActive(!modalActive)}>
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
            <Modal modalActive={modalActive} setModalActive={setModalActive} title="Edit pack">
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
                        <div className="styled-btn styled-btn-2" onClick={() => setModalActive(false)}>Cancel</div>
                        <div className="styled-btn styled-btn-1" onClick={() => item.user_id === userId && updatePackHandler(item._id, item.name)}>Save</div>
                    </div>
                </form>
            </Modal>
        </div>
    )
}
