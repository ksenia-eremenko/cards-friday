import React, { ChangeEvent, useState } from 'react'
import Input from '../../../components/common/Input/Input'
import Modal from '../../../components/common/Modal/Modal'

type ModalsForCreatedCardType = {
    modalActive: boolean
    setModalActive: (modalActive: boolean) => void
    valueInputQuestion: string
    setValueInputQuestion: (modalActive: string) => void
    valueInputAnswer: string
    setValueInputAnswer: (modalActive: string) => void
    createdCardHandler: () => void
}

const ModalsForCreatedCard = ({ modalActive, setModalActive, setValueInputQuestion, valueInputQuestion, setValueInputAnswer, valueInputAnswer, createdCardHandler }: ModalsForCreatedCardType) => {
    return <Modal modalActive={modalActive} setModalActive={setModalActive} title="Add new pack">
        <form className="form-style">
            <Input
                onChange={(e: ChangeEvent<HTMLInputElement>) => setValueInputQuestion(e.currentTarget.value)}
                value={valueInputQuestion}
                placeholder='Question'
            />
            <Input
                onChange={(e: ChangeEvent<HTMLInputElement>) => setValueInputAnswer(e.currentTarget.value)}
                value={valueInputAnswer}
                placeholder='Answer'
            />
            <div className="btns">
                <div
                    className="styled-btn styled-btn-2"
                    onClick={() => setModalActive(false)}
                >Cancel</div>
                <div className="styled-btn styled-btn-1" onClick={createdCardHandler}>Save</div>
            </div>
        </form>
    </Modal>
}

export default ModalsForCreatedCard