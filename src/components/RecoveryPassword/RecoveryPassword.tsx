import React from 'react'
import { NavLink } from 'react-router-dom'
import Input from '../common/Input/Input'

const RecoveryPassword = () => {
  return (
    <div className="recovery-password">
      <div className="container">
        <div className="form-wrapper">
          <div>Восстановление пароля</div>
          <form className='form-style'>
            <Input type='email' placeholder='Электронная почта' />
            <button type='submit' className='styled-btn styled-btn-1'>Отправить новый пароль</button>
          </form>
          <NavLink to={'/login'} className="b-title bt14"><span>Вспомнили пароль?</span></NavLink>
        </div>
      </div>
    </div>
  )
}

export default RecoveryPassword