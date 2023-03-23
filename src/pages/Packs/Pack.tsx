import React, { useEffect, useState } from 'react'
import { MdOutlineDeleteForever } from 'react-icons/md'
import { GiHatchets } from 'react-icons/gi'
import { AiFillEdit } from 'react-icons/ai'
import { getPackId, setCurrentPackName } from '../../store/cards-reducer'
import { getCards } from '../../store/cards-reducer'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { useNavigate } from 'react-router-dom'
import { deletePack, PackType, updatedPack } from '../../store/packs-reducer'
import classNames from 'classnames'
import ModalEditPack from './Modals/ModalEditPack'
import ModalDeletePack from './Modals/ModalDeletePack'

type PackDataType = {
    item: PackType
    userId: string | undefined
}

export const Pack = ({ item, userId }: PackDataType) => {
    const [modalActive, setModalActive] = useState(false)
    const [modalDeleteActive, setModalDeleteActive] = useState(false)
    const [valueInput, setValueInput] = useState<string>('')

    const pack = useAppSelector(state => state.packs.cardPacks)
    const status = useAppSelector(state => state.app.status)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        setValueInput('qwdqwd')
    }, [])

    const getNameById = (id: string) => {
        const name = pack.find(e => e._id === id)?.name
        setValueInput(name ? name : '')
    }

    const toCardsClickHandler = (cardsPack_id: string, title: string) => {
        dispatch(getPackId(cardsPack_id))
        dispatch(setCurrentPackName(title))
        navigate('/cards')
    }

    const deletePackHandler = (id: string) => {
        dispatch(deletePack(id))
        setModalDeleteActive(false)
    }

    const updatePackHandler = (id: string) => {
        dispatch(updatedPack(id, valueInput))
        setModalActive(false)
        setValueInput('')
    }

    const setPackIdHandler = (packId: string) => {

        dispatch(getCards(packId))
        navigate('/learn')
    }


    return (
        <div className="items">
            <div
                className={item.cardsCount || (userId === item.user_id) ? 'item name b-title bt14' : 'item name b-title bt14 disabled'}
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
                        onClick={() => setPackIdHandler(item._id)}
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
                    onClick={() => {
                        setModalActive(!modalActive)
                        getNameById(item._id)
                    }}>
                    <AiFillEdit />
                </div>
                <div
                    className={classNames(
                        'action-item',
                        { 'disabled': item.user_id !== userId || status === 'loading' }
                    )}
                    // onClick={() => item.user_id === userId && deletePackHandler(item._id)}>
                    onClick={() => item.user_id === userId && setModalDeleteActive(!modalDeleteActive)}>
                    <MdOutlineDeleteForever />
                </div>
            </div>
            <ModalEditPack
                modalActive={modalActive}
                setModalActive={setModalActive}
                valueInput={valueInput}
                setValueInput={setValueInput}
                userId={userId}
                userIdCard={item.user_id}
                id={item._id}
                updatePackHandler={updatePackHandler}
            />
            <ModalDeletePack
                modalActive={modalDeleteActive}
                setModalActive={setModalDeleteActive}
                packName={item.name}
                id={item._id}
                deletePackHandler={deletePackHandler}
            />
        </div>
    )
}
