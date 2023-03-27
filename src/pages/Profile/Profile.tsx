import React, {useState} from 'react'
import avatar from '../../assets/images/image-2.png'
import { AiOutlineLogout } from 'react-icons/ai';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { logout } from '../../store/auth-reducer';
import { Navigate } from 'react-router-dom';
import { BsCamera } from 'react-icons/bs';
import { EditableSpan } from '../../components/common/EditableSpan/EditableSpan';
import { changeUserData } from '../../store/profile-reducer';
import LinkBack from '../../components/common/LinkBack/LinkBack';
import {InputTypeFile} from '../../components/common/InputTypeFile/InputTypeFile';
import Avatar from '../../components/common/Avatar/Avatar';
import {Error} from '../../components/common/Error/Error';

const Profile = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
    const profile = useAppSelector(state => state.profile.profile)
    const error = useAppSelector(state => state.app.error)

    const onClickHandler = () => {
        dispatch(logout())
    }

    const editName = (name: string) => {
        dispatch(changeUserData({ name }))
    }

    const editAvatar = (avatar: string) => {
        dispatch(changeUserData({avatar}))
    }

    if (!isLoggedIn) {
        return <Navigate to={'/login'} />
    }

    return (
        <div className="profile">
            <div className="container">
                <div className="in">
                    <LinkBack
                        title='Back to Packs List'
                        url='/packs'
                    />
                    <div className="auth-form">
                        <Error errorText={error} />
                        <h1 className="title b-title bt26 semibold align-center">Personal Information</h1>
                        <div className="avatar-wrapper">
                            <Avatar image={profile?.avatar}/>
                            <div className="icon">
                                <InputTypeFile children={<BsCamera/>} changeFile={editAvatar}/>
                            </div>
                        </div>
                        <div className="name-wrapper">
                            <EditableSpan callback={editName} name={profile?.name ? profile.name : ''} />
                        </div>
                        <div className="email b-title bt14 color6 align-center">{profile?.email}</div>
                        <div className="email b-title bt14 color6 align-center">Created packs: {profile?.publicCardPacksCount}</div>
                        <button className='styled-btn styled-btn-2' onClick={onClickHandler}><AiOutlineLogout />Log out</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
