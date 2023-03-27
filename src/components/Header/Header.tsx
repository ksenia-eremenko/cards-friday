import React from 'react'
import {NavLink} from 'react-router-dom'
import {useAppSelector} from '../../store/store'
import logo from '../../assets/images/logo.svg'
import avatar from '../../assets/images/image-2.png'
import Avatar from '../common/Avatar/Avatar';

const Header = () => {
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
    const profile = useAppSelector(state => state.auth.profile)
    const profileAva = useAppSelector(state => state.profile.avatar)

    return (
        <div className="header">
            <div className="container">
                <div className="nav-wrapper">
                    <div className="logo">
                        <img src={logo} alt="" />
                    </div>
                    {isLoggedIn
                        ? <div className="user-info">
                            <NavLink to={'/profile'} className="link-profile">
                                {profile?.name}
                                <Avatar image={profileAva ? profileAva : avatar} />
                            </NavLink>
                        </div>
                        : <NavLink to={'/login'} className="styled-btn styled-btn-1">Sign in</NavLink>
                    }
                </div>
            </div>
        </div>
    )
}

export default Header
