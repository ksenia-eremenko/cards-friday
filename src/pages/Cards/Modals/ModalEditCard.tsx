import React, { ChangeEvent } from 'react'
import Input from '../../../components/common/Input/Input'
import Modal from '../../../components/common/Modal/Modal'

type ModalEditCardType = {
    modalEditActive: boolean
    setModalEditActive: (modalEditActive: boolean) => void
    valueInputEditQuestion: string
    setValueInputEditQuestion: (valueInputEditQuestion: string) => void
    valueInputEditAnswer: string
    setValueInputEditAnswer: (valueInputEditAnswer: string) => void
    updateCardHandler: (id: string) => void
    id: string
}

const ModalEditCard = ({ modalEditActive, setModalEditActive, valueInputEditQuestion, setValueInputEditQuestion, valueInputEditAnswer, setValueInputEditAnswer, updateCardHandler, id }: ModalEditCardType) => {
    return <Modal modalActive={modalEditActive} setModalActive={setModalEditActive} title="Edit card">
        <form className="form-style">
            <Input
                onChange={(e: ChangeEvent<HTMLInputElement>) => setValueInputEditQuestion(e.currentTarget.value)}
                value={valueInputEditQuestion}
                placeholder='New question'
            />
            <Input
                onChange={(e: ChangeEvent<HTMLInputElement>) => setValueInputEditAnswer(e.currentTarget.value)}
                value={valueInputEditAnswer}
                placeholder='New answer'
            />
            <div className="btns">
                <div
                    className="styled-btn styled-btn-2"
                    onClick={() => setModalEditActive(false)}
                >Cancel</div>
                <div className="styled-btn styled-btn-1"
                    onClick={() => updateCardHandler(id)}>Save</div>
            </div>
        </form>
    </Modal>
}

export default ModalEditCard