import React from 'react'
import Button from '../common/Button/Button'
import Checkbox from '../common/Checkbox/Checkbox'
import Input from '../common/Input/Input'

const Profile = () => {
  return (
    <div className="profile">
      <div className="container">
        <div className="profile-in">
          <Input placeholder='Name' />
          <Button className='styled-btn styled-btn-1'>Click me</Button>
          <div className="checkboxes">
            <Checkbox />
            <Checkbox />
            <Checkbox />
            <Checkbox />
            <Checkbox />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile