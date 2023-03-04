import React from 'react'
import Button from '../../components/common/Button/Button'
import Checkbox from '../../components/common/Checkbox/Checkbox'
import Input from '../../components/common/Input/Input'

const Profile = () => {
    return (
        <div className="profile">
            <div className="container">
                <div className="profile-in">
                    <Input placeholder='Name' />
                    <Button className='styled-btn styled-btn-1'>Click me</Button>
                    <div className="checkboxes">
                        <Checkbox />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile