import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Input from '../../components/common/Input/Input'
import { useAppDispatch } from '../../store/store';
import { useFormik } from 'formik';
import { forgot } from '../../store/auth-reducer';

const RecoveryPassword = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: ''
    },
    onSubmit: values => {
      formik.resetForm()
      dispatch(forgot(values.email));
      navigate('/check-email');
    },
  })
  return (
    <div className="recovery-password">
      <div className="container">
        <div className="form-wrapper auth-form">
          <div className='title b-title bt26 semibold align-center'>Forgot your password?</div>
          <form className='form-style' onSubmit={formik.handleSubmit}>
            <Input
              type='email'
              placeholder='Email'
              {...formik.getFieldProps('email')}
            />
            <div className="info b-title bt14 color6">Enter your email address and we will send you further instructions </div>
            <button type='submit' className='styled-btn styled-btn-1'>Send Instructions</button>
          </form>
          <div className="bottom">
            <div className="b-title bt14 semibold align-center">Did you remember your password?</div>
            <NavLink to={'/login'} className="b-title bt16 semibold align-center">Try logging in</NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecoveryPassword