import React, {useState} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {NavLink, useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../store/store";
import {registerTC} from "../../store/register-reducer";
import {AiFillEye} from "react-icons/ai";
import Input from "../../components/common/Input/Input";


const Registration = () => {
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };


    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: "",
            confirmPassword: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().required('Password is required').matches(/.{8,}/, {
                excludeEmptyString: true,
                message: 'Must min 8 characters',
            }),
            confirmPassword: Yup.string()
                .required("Please confirm your password")
                .oneOf([Yup.ref('password'),], "Passwords do not match"),

        }),
        onSubmit: data => {
            formik.resetForm()
            dispatch(registerTC(data))
            navigate('/login');
        },
    });

    return (
        <div className={'form signup'}>
            <div className={'form-wrapper auth-form'}>
                <div className={'title b-title bt26 semibold align-center'}>Sign Up</div>
                <form onSubmit={formik.handleSubmit} className={'form-style'}>
                    <div className={'field input-field'}>
                        <Input
                            id="email"
                            type="email"
                            className={'input'}
                            placeholder={'Email'}
                            {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <span className={'error-lbl'}>{formik.errors.email}</span>
                        ) : null}
                    </div>
                    <div className={'password-wrapper'}>
                        <Input
                            id="password"
                            className={'password'}
                            placeholder={'Password'}
                            type={showPassword ? 'text' : 'password'}
                            {...formik.getFieldProps('password')}
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <span className={'error-lbl'}>{formik.errors.password}</span>
                        ) : null}
                        <span className='eye' onClick={toggleShowPassword}><AiFillEye/></span>
                    </div>

                    <div className={'password-wrapper'}>
                        <Input
                            id="confirmPassword"
                            className={'password'}
                            placeholder={'Confirm password'}
                            type={showConfirmPassword ? 'text' : 'password'}
                            {...formik.getFieldProps('confirmPassword')}
                        />
                        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                            <span className={'error-lbl'}>{formik.errors.confirmPassword}</span>
                        ) : null}
                        <span className='eye' onClick={toggleShowConfirmPassword}><AiFillEye/></span>
                    </div>
                    <button type="submit" className={'styled-btn styled-btn-1'}>Sign Up</button>
                </form>
                <span className={'info b-title bt14 color6 align-center semibold'}>Already have an account?</span>
                <NavLink to={'/login'} className="b-title bt16 semibold link-registration align-center"><span>Sign In</span></NavLink>
            </div>
        </div>
    );
};

export default Registration;