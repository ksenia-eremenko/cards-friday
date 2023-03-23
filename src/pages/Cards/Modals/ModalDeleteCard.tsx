import Modal from '../../../components/common/Modal/Modal'

type ModalDeleteCardType = {
    modalActive: boolean
    setModalActive: (modalActive: boolean) => void
    id: string
    deleteCardHandler: (id: string) => void
}

const ModalDeleteCard = ({ modalActive, setModalActive, id, deleteCardHandler }: ModalDeleteCardType) => {
    return <Modal modalActive={modalActive} setModalActive={setModalActive} title="Delete Pack">
        <form className="form-style">
            <div className="b-title bt14">Do you really want to remove this card?</div>
            <div className="btns">
                <div className="styled-btn styled-btn-2" onClick={() => setModalActive(false)}>Cancel</div>
                <div className="styled-btn styled-btn-3" onClick={() => deleteCardHandler(id)}>Delete</div>
            </div>
        </form>
    </Modal>
}

export default ModalDeleteCard;