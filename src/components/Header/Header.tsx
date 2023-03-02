import classNames from 'classnames'
import React from 'react'
import { setAppOpenMenuAC } from '../../store/app-reducer'
import { useAppDispatch, useAppSelector } from '../../store/store'
import Nav from '../Nav/Nav'

const Header = () => {
    const openMenu = useAppSelector(state => state.app.openMenu)
    const dispatch = useAppDispatch()

    const onClickHandler = () => {
        dispatch(setAppOpenMenuAC(!openMenu))
    }

    return (
        <div className="header">
            <div className="container">
                <div className="nav-wrapper">
                    <Nav />
                    <div
                        className={classNames(
                            "menu-icon",
                            { active: openMenu }
                        )}
                        onClick={onClickHandler}
                    >
                        <span></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header