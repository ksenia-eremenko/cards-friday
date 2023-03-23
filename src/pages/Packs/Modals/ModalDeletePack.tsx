import Modal from '../../../components/common/Modal/Modal'

type ModalDeletePackType = {
    modalActive: boolean
    setModalActive: (modalActive: boolean) => void
    packName: string
    id: string
    deletePackHandler: (id: string) => void
}

const ModalDeletePack = ({ modalActive, setModalActive, packName, id, deletePackHandler }: ModalDeletePackType) => {
    return <Modal modalActive={modalActive} setModalActive={setModalActive} title="Delete Pack">
        <form className="form-style">
            <div className="b-title bt14">Do you really want to remove <b>{packName}</b>? <br />All cards will be deleted.</div>
            <div className="btns">
                <div className="styled-btn styled-btn-2" onClick={() => setModalActive(false)}>Cancel</div>
                <div className="styled-btn styled-btn-3" onClick={() => deletePackHandler(id)}>Delete</div>
            </div>
        </form>
    </Modal>
}

export default ModalDeletePack