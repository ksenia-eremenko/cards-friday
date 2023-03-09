import React, { useState } from 'react'
import { Navigate, NavLink } from 'react-router-dom'
import Input from '../../components/common/Input/Input'
import { useFormik } from 'formik';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { getProfile } from '../../store/auth-reducer';
import { Error } from '../../components/common/Error/Error';


export type LoginFormDataType = {
  email: string
  password: string
  rememberMe: boolean
}

type FormikErrorsType = {
  email?: string
  password?: string
  rememberMe?: boolean
}

const Login = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
  const status = useAppSelector(state => state.app.status)
  const error = useAppSelector(state => state.app.error)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false
    },
    validate: (values: LoginFormDataType) => {
      const errors: FormikErrorsType = {}
      if (!values.email) {
        errors.email = 'Required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }
      if (!values.password) {
        errors.password = 'Required'
      } else if (values.password.length <= 7) {
        errors.password = 'Password must be more than 7 characters...'
      }
      return errors
    },
    onSubmit: values => {
      formik.resetForm()
      dispatch(getProfile(values))
    },
  })

  if (isLoggedIn) {
    return <Navigate to={'/'} />
  }

  return (
    <div className="login">
      <div className="container">
        <div className="form-wrapper auth-form">
          {status === 'failed' ? <Error errorText={error}/> : ''}
          <h1 className="title b-title bt26 semibold align-center">Sign in</h1>
          <form className="form-style" onSubmit={formik.handleSubmit}>
            <Input
              type="email"
              placeholder="Email"
              {...formik.getFieldProps('email')}
            />
            {formik.errors.email && formik.touched.email ?
              <span className="error-lbl">{formik.errors.email}</span> : null}
            <div className="password-wrapper">
              <Input
                type={passwordShown ? 'text' : 'password'}
                placeholder="Password"
                {...formik.getFieldProps('password')}
                checked={formik.values.rememberMe}
              />
              <span className="eye"
                onClick={togglePasswordVisibility}>{passwordShown ? <AiFillEyeInvisible /> :
                  <AiFillEye />}
              </span>
              {formik.errors.password && formik.touched.password ?
                <span className="error-lbl">{formik.errors.password}</span> : null}
            </div>
            <div className="rememberMe">
              <Input
                className="styled-checkbox"
                id="rememberMe"
                type="checkbox"
                {...formik.getFieldProps('rememberMe')}
              />
              <label htmlFor="rememberMe" className="b-title bt14 medium">Remember me</label>
            </div>
            <NavLink to={'/recovery-password'} className="b-title bt14 medium link-recovery"><span>Forgot Password?</span></NavLink>
            <button type="submit" className="styled-btn styled-btn-1">Sign In</button>
          </form>
          <div className="info b-title bt14 color6 align-center semibold">Don't have an account?</div>
          <NavLink to={'/registration'}
            className="b-title bt16 semibold link-registration align-center"><span>Sign Up</span></NavLink>
        </div>
      </div>
    </div>
  )
}

export default Login
