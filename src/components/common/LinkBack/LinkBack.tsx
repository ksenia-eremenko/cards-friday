import React from 'react'
import { BsArrowLeft } from 'react-icons/bs'
import { NavLink } from 'react-router-dom'

type LinkBackType = {
    title: string
    url: string
}

const LinkBack = ({ title, url }: LinkBackType) => {
    return (
        <NavLink to={url} className="link-to-back">
            <BsArrowLeft />
            <span className='b-title bt14'>{title}</span>
        </NavLink>
    )
}

export default LinkBack