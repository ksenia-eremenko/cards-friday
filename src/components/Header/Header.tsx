import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAppSelector } from '../../store/store'
import logo from '../../assets/images/logo.svg'
import avatar from '../../assets/images/image-2.png'
const Header = () => {
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
    const userEmail = useAppSelector<string | undefined>(state => state.auth.profile?.email)
    const profileData = useAppSelector(state => state.auth.profile)
    
    return (
        <div className="header">
            <div className="container">
                <div className="nav-wrapper">
                    <div className="logo">
                        <img src={logo} alt="" />
                    </div>
                    {isLoggedIn
                        ? <div className="user-info">
                            <NavLink to={'/profile'} className="link-profile">{profileData?.name ? profileData.name : userEmail}</NavLink>
                            <div className="image">
                                <img src={avatar} alt="" />
                            </div>
                        </div>
                        : <NavLink to={'/login'} className="styled-btn styled-btn-1">Sign in</NavLink>
                    }
                </div>
            </div>
        </div>
    )
}

export default Header