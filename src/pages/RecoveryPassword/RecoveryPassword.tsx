import React from 'react'
import { Navigate, NavLink } from 'react-router-dom'
import Input from '../../components/common/Input/Input'
import { useAppDispatch, useAppSelector } from '../../store/store';
import { useFormik } from 'formik';
import { forgot } from '../../store/auth-reducer';
import { Error } from '../../components/common/Error/Error';

type FormikErrorType = {
  email?: string
}

const RecoveryPassword = () => {
  const dispatch = useAppDispatch()
  const status = useAppSelector(state => state.app.status)
  const error = useAppSelector(state => state.app.error)

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validate: (values) => {
      const errors: FormikErrorType = {}
      if (!values.email) {
        errors.email = 'Required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }
      return errors
    },
    onSubmit: values => {
      formik.resetForm()
      dispatch(forgot(values.email));
    },
  })

  if (status === 'succeeded') {
    return <Navigate to={'/check-email'} />
  }

  return (
    <div className="recovery-password">
      <div className="container">
        <div className="form-wrapper auth-form">
          {status === 'failed' ? <Error errorText={error}/> : ''}
          <div className='title b-title bt26 semibold align-center'>Forgot your password?</div>
          <form className='form-style' onSubmit={formik.handleSubmit}>
            <Input
              type='email'
              placeholder='Email'
              {...formik.getFieldProps('email')}
            />
            {formik.errors.email && formik.touched.email ? <span className="error-lbl">{formik.errors.email}</span> : null}
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