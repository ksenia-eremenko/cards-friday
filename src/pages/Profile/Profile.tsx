import React from 'react'
import avatar from '../../assets/images/image-2.png'
import { AiOutlineLogout } from 'react-icons/ai';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { logout } from '../../store/auth-reducer';
import { Navigate, NavLink } from 'react-router-dom';
import { BsArrowLeft, BsCamera } from 'react-icons/bs';
import { EditableSpan } from '../../components/common/EditableSpan/EditableSpan';
import { changeUserData } from '../../store/profile-reducer';

const Profile = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
    const profile = useAppSelector(state => state.auth.profile)
    const name = useAppSelector(state => state.auth.profile?.name)

    const onClickHandler = () => {
        dispatch(logout())
    }

    const editName = (name: string) => {
        dispatch(changeUserData({ name }))
    }

    if (!isLoggedIn) {
        return <Navigate to={'/login'} />
    }

    return (
        <div className="profile">
            <div className="container">
                <div className="in">
                    <NavLink to='/packs' className="link-to-back">
                        <BsArrowLeft />
                        <span className='b-title bt14'>Back to Packs List</span>
                    </NavLink>
                    <div className="auth-form">
                        <h1 className="title b-title bt26 semibold align-center">Personal Information</h1>
                        <div className="avatar-wrapper">
                            <div className="avatar">
                                <img src={avatar} alt="" />
                            </div>
                            <div className="icon">
                                <BsCamera />
                            </div>
                        </div>
                        <div className="name-wrapper">
                            <EditableSpan callback={editName} name={name ? name : ''} />
                        </div>
                        <div className="email b-title bt14 color6 align-center">{profile?.email}</div>
                        <button className='styled-btn styled-btn-2' onClick={onClickHandler}><AiOutlineLogout />Log out</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile