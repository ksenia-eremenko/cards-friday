import React, {ChangeEvent, useState} from 'react'
import Input from '../../../components/common/Input/Input'
import Modal from '../../../components/common/Modal/Modal'
import {InputTypeFile} from "../../../components/common/InputTypeFile/InputTypeFile";

type ModalAddNewPackType = {
    modalActive: boolean
    setModalActive: (modalActive: boolean) => void
    valueInput: string
    setValueInput: (valueInput: string) => void
    createPackHandler: (name: string, deckCover: string) => void
    addPackHandler: (name: string, deckCover: string) => void
    deckCover: string
    userIdCard: string | null
    userId: string | undefined
}
const ModalAddNewPack = ({
                             modalActive,
                             setModalActive,
                             valueInput,
                             setValueInput,
                             addPackHandler,
                             deckCover,
                             userIdCard,
                             userId
                         }: ModalAddNewPackType) => {
    const [newCover, setNewCover] = useState(deckCover)

    const editPackCover = (base64: string) => {
        setNewCover(base64)
    }

    return <Modal modalActive={modalActive} setModalActive={setModalActive} title="Add new pack">
        <form className="form-style">
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <div style={{marginRight: "150px", marginLeft: "20px"}} className="b-title bt16 semibold">Cover</div>
                <div className="b-title bt16">
                    <InputTypeFile changeFile={editPackCover}>
                        <div className="b-title bt16"
                             style={{whiteSpace: "nowrap", color: "#366EFF", textDecorationLine: "underline"}}>Download
                            cover
                        </div>
                    </InputTypeFile>
                </div>
            </div>
            <img src={newCover} alt={"cover"} className="image"></img>
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
                >Cancel
                </div>
                <div className="styled-btn styled-btn-1" onClick={() => addPackHandler(valueInput, newCover)}>Save</div>
            </div>
        </form>
    </Modal>
}

export default ModalAddNewPack