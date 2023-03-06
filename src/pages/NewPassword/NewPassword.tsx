import { useFormik } from 'formik'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Input from '../../components/common/Input/Input'
import { newPassword } from '../../store/auth-reducer'
import { useAppDispatch } from '../../store/store'

const NewPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  
  const formik = useFormik({
    initialValues: {
      password: ''
    },
    onSubmit: data => {
      formik.resetForm()
      dispatch(newPassword({ password: data.password, resetPasswordToken: token }));
      navigate('/login');
    },
  })

  return (
    <div className="new-password">
      <div className="container">
        <div className="auth-form">
          <div className='title b-title bt26 semibold align-center'>Create new password</div>
          <form className='form-style' onSubmit={formik.handleSubmit}>
            <Input
              type='password'
              placeholder='Password'
              {...formik.getFieldProps('password')}
            />
            <div className="info b-title bt14 color6">Create new password and we will send you further instructions to email</div>
            <button type='submit' className='styled-btn styled-btn-1'>Create new password</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default NewPassword