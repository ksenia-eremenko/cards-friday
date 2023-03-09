import React from 'react'
import { NavLink } from 'react-router-dom';
import notFound from '../../assets/images/notFound.svg'

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="container">
        <div className="in">
          <div className="left">
            <div className="b-title bt50 semibold">Ooops!</div>
            <div className="b-title bt16 medium">Sorry! Page not found!</div>
            <NavLink to={'/'} className="styled-btn styled-btn-1">Back to home page</NavLink>
          </div>
          <div className="right">
            <img src={notFound} alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound;