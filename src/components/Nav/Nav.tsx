import classNames from "classnames"
import React from "react"
import { NavLink } from "react-router-dom"
import { setAppOpenMenuAC } from "../../store/app-reducer"
import { useAppDispatch, useAppSelector } from "../../store/store"

type ItemsMenuType = Array<ItemMenuType>

type ItemMenuType = {
    link: string
    title: string
}

const Nav = () => {
    const openMenu = useAppSelector(state => state.app.openMenu)
    const dispatch = useAppDispatch()
    const closeMenu = () => {
        dispatch(setAppOpenMenuAC(false))
    }
    const items: ItemsMenuType = [
        {
            link: '/',
            title: 'Profile'
        },
        {
            link: '/login',
            title: 'Login'
        }
    ]
    return (
        <nav>
            <ul className={classNames(
                "nav",
                { active: openMenu }
            )}>
                {items.map((e, i) => {
                    return <li key={i} onClick={closeMenu}>
                        <NavLink to={e.link} className={({ isActive }: any) => isActive ? "item active" : "item"}>{e.title}</NavLink>
                    </li>
                })}
            </ul>
        </nav>
    )
}

export default Nav