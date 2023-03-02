import React from 'react'
import { NavLink } from 'react-router-dom'
import Input from '../common/Input/Input'

const Registration = () => {
  return (
    <div className="registration">
      <div className="container">
        <div className="form-wrapper">
          <div>Регистрация</div>
          <form className='form-style'>
            <Input type='text' placeholder='Логин' />
            <Input type='password' placeholder='Пароль' />
            <Input type='password' placeholder='Подтвердите пароль' />
            <button type='submit' className='styled-btn styled-btn-1'>Зарегистрироваться</button>
          </form>
          <NavLink to={'/login'} className="b-title bt14"><span>Вы уже зарегистрированы?</span></NavLink>
        </div>
      </div>
    </div>
  )
}

export default Registration