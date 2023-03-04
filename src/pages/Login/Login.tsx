import React from 'react'
import { NavLink } from 'react-router-dom'
import Input from '../../components/common/Input/Input'

const Login = () => {
  return (
    <div className="login">
      <div className="container">
        <div className="form-wrapper">
          <div>Авторизация</div>
          <form className='form-style'>
            <Input type='text' placeholder='Логин' />
            <Input type='password' placeholder='Пароль' />
          </form>
          <div className="links">
            <NavLink to={'/recovery-password'} className="b-title bt14"><span>Забыли пароль?</span></NavLink>
            <NavLink to={'/registration'} className="b-title bt14"><span>Регистрация</span></NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login