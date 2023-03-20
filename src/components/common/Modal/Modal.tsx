import { RxCross2 } from 'react-icons/rx'
import classNames from 'classnames'
import React, { ReactNode } from 'react'

type ModalPropsType = {
    modalActive: boolean
    setModalActive: (isActive: boolean) => void
    title: string
    children: ReactNode
}

const Modal = ({ modalActive, setModalActive, title, children }: ModalPropsType) => {
    return (
        <div className={classNames(
            "modal",
            { "active": modalActive }
        )}
            onClick={() => setModalActive(false)}
        >
            <div className={classNames(
                "modal-content",
                { "active": modalActive }
            )} onClick={e => e.stopPropagation()}>
                <div className="top">
                    <div className="b-title bt18">{title}</div>
                    <div className="cross" onClick={() => setModalActive(false)}>
                        <RxCross2 />
                    </div>
                </div>
                {children}
            </div>
        </div>
    )
}

export default Modal