import React from 'react'
import { NavLink } from 'react-router-dom'
import envelope_icon from "../../assets/images/image-1.svg"

const CheckEmail = () => {
  return (
    <div className="check-email">
      <div className="container">
        <div className="form-wrapper auth-form">
          <div className='title b-title bt26 semibold align-center'>Check Email</div>
          <div className="image">
            <img src={envelope_icon} alt="" />
          </div>
          <div className="info b-title bt14 color6 align-center">We've sent an Email with instructions to example@mail.com</div>
          <NavLink to={'/login'} className="styled-btn styled-btn-1">Back to login</NavLink>
        </div>
      </div>
    </div>
  )
}

export default CheckEmail