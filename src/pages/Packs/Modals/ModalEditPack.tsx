import React, {ChangeEvent, useState} from 'react'
import Input from '../../../components/common/Input/Input'
import Modal from '../../../components/common/Modal/Modal'
import {InputTypeFile} from "../../../components/common/InputTypeFile/InputTypeFile"
import './ModalEditPack.scss'

type ModalEditPackType = {
    modalActive: boolean
    setModalActive: (modalActive: boolean) => void
    valueInput: string
    setValueInput: (valueInput: string) => void
    userId: string | undefined
    userIdCard: string | null
    id: string
    updatePackHandler: (name: string, deckCover: string) => void
    deckCover: string
}

const ModalEditPack = ({ modalActive, setModalActive, valueInput, setValueInput, userId, userIdCard, id, updatePackHandler, deckCover }: ModalEditPackType) => {

    const [cover, setCover] = useState(deckCover)

    const downloadNewCover = (base64: string) => {
       setCover(base64);
    }

    return <Modal modalActive={modalActive} setModalActive={setModalActive} title="Edit pack">
        <form className="form-style">
           <img src={cover} alt={'cover'} className={'image'} />
            <Input
                onChange={(e: ChangeEvent<HTMLInputElement>) => setValueInput(e.currentTarget.value)}
                value={valueInput}
                placeholder='Name Pack'
            />
            <div className="btns" style={{display:"flex", justifyContent:"center"}}>
                <InputTypeFile changeFile={downloadNewCover}>
                    <div className="styled-btn styled-btn-1">
                        Download new cover
                    </div>
                </InputTypeFile>
            </div>
            <div className="styled-checkbox">
                <Input
                    id="private"
                    type="checkbox"
                />
                <label htmlFor="private" className="b-title bt16 medium">Private pack</label>
            </div>
            <div className="btns">
                <div className="styled-btn styled-btn-2" onClick={() => setModalActive(false)}>Cancel</div>
                <div className="styled-btn styled-btn-1" onClick={() => userIdCard === userId && updatePackHandler(valueInput, cover)}>Save</div>
            </div>
        </form>
    </Modal>
}

export default ModalEditPack