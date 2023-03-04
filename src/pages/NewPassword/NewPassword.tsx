import React from 'react'
import { NavLink } from 'react-router-dom'
import Input from '../../components/common/Input/Input'

const NewPassword = () => {
  return (
    <div className="new-password">
      <div className="container">
        <div className="form-wrapper">
          <div>Введите новый пароль</div>
          <form className='form-style'>
            <Input type='password' placeholder='Новый пароль' />
            <Input type='password' placeholder='Подтвердите новый пароль' />
            <button type='submit' className='styled-btn styled-btn-1'>Отправить</button>
          </form>
          <NavLink to={'/login'} className="b-title bt14"><span>Вспомнили пароль?</span></NavLink>
        </div>
      </div>
    </div>
  )
}

export default NewPassword