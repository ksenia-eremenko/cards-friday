import React, { ChangeEvent } from 'react'
import Input from '../../../components/common/Input/Input'
import Modal from '../../../components/common/Modal/Modal'
type ModalAddNewPackType = {
    modalActive: boolean
    setModalActive: (modalActive: boolean) => void
    valueInput: string
    setValueInput: (valueInput: string) => void
    createPackHandler: () => void
}
const ModalAddNewPack = ({ modalActive, setModalActive, valueInput, setValueInput, createPackHandler }: ModalAddNewPackType) => {
    return <Modal modalActive={modalActive} setModalActive={setModalActive} title="Add new pack">
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
}

export default ModalAddNewPack