import { useFormik } from 'formik'
import React, { useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { Navigate, useParams } from 'react-router-dom'
import Input from '../../components/common/Input/Input'
import { newPassword } from '../../store/auth-reducer'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { Error } from '../../components/common/Error/Error';
import Preloader from '../../components/common/Preloader/Preloader'

export type LoginFormDataType = {
  password: string
}

type FormikErrorsType = {
  password?: string
}

const NewPassword = () => {
  const status = useAppSelector(state => state.app.status)
  const error = useAppSelector(state => state.app.error)
  const dispatch = useAppDispatch()
  const [showPassword, setShowPassword] = useState(false);
  const { token } = useParams();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  const formik = useFormik({
    initialValues: {
      password: ''
    },
    validate: (values: LoginFormDataType) => {
      const errors: FormikErrorsType = {}
      if (!values.password) {
        errors.password = 'Required'
      } else if (values.password.length <= 7) {
        errors.password = 'Password must be more than 7 characters...'
      }
      return errors
    },
    onSubmit: data => {
      if (token) {
        dispatch(newPassword({ password: data.password, resetPasswordToken: token }));
      }
    },
  })

  if (status === 'succeeded') {
    return <Navigate to={'/login'} />
  }
  if (status === 'loading') {
    return <Preloader />
  }
  return (
    <div className="new-password">
      <div className="container">
        <div className="auth-form">
          {status === 'failed' ? <Error errorText={error} /> : ''}
          <div className='title b-title bt26 semibold align-center'>Create new password</div>
          <form className='form-style' onSubmit={formik.handleSubmit}>
            <div className="password-wrapper">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder='Password'
                {...formik.getFieldProps('password')}
              />
              <span className="eye"
                onClick={togglePasswordVisibility}>{showPassword ? <AiFillEyeInvisible /> :
                  <AiFillEye />}
              </span>
            </div>
            {formik.errors.password && formik.touched.password ? <span className="error-lbl">{formik.errors.password}</span> : null}
            <div className="info b-title bt14 color6">Create new password and we will send you further instructions to email</div>
            <button type='submit' className='styled-btn styled-btn-1'>Create new password</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default NewPassword