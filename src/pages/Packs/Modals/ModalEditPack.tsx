import React, { ChangeEvent } from 'react'
import Input from '../../../components/common/Input/Input'
import Modal from '../../../components/common/Modal/Modal'

type ModalEditPackType = {
    modalActive: boolean
    setModalActive: (modalActive: boolean) => void
    valueInput: string
    setValueInput: (valueInput: string) => void
    userId: string | undefined
    userIdCard: string | null
    id: string
    updatePackHandler: (id: string) => void
}

const ModalEditPack = ({ modalActive, setModalActive, valueInput, setValueInput, userId, userIdCard, id, updatePackHandler }: ModalEditPackType) => {
    return <Modal modalActive={modalActive} setModalActive={setModalActive} title="Edit pack">
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
                <div className="styled-btn styled-btn-1" onClick={() => userIdCard === userId && updatePackHandler(id)}>Save</div>
            </div>
        </form>
    </Modal>
}

export default ModalEditPack