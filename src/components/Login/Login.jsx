import React, { useContext, useEffect, useState } from 'react'
import style from "./Login.module.css";
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { UserContext } from '../../context/userContext';

export default function Login() {
  let navigate = useNavigate();
  let [isLoading, setIsLoading] = useState(false);
  let [apiError, setApiError] = useState('');
  let { setUserLogin } = useContext(UserContext);

  let validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().matches(/^[A-Z][a-zA-Z0-9!@#$%^&*]{5,15}$/, 'password must start with upperCase then from 6 to more any chars').required('Required'),
  });

  function handleLogin(formvalue) {
    setIsLoading(true);
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, formvalue)
      .then((apiResponse) => {
        if (apiResponse?.data?.message === 'success') {
          localStorage.setItem('userToken', apiResponse.data.token);
          setUserLogin(apiResponse.data.token);
          console.log(apiResponse);
          console.log(localStorage.getItem('userToken'));
          navigate('/');
          setIsLoading(false);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        setApiError(error?.response?.data?.message);
        console.log(error.response?.data);
      });
  }

  let formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: handleLogin
  });

  return <>
    <section className="flex justify-center items-center py-12">
      <div className="p-8 m-2 w-full rounded-3xl lg:w-1/3 bg-gray-200">
        <h1 className="text-black text-center text-[40px] font-[700] pb-6">LogIn</h1>
        <form onSubmit={formik.handleSubmit}>
          {apiError ?
            <div className="text-sm text-red-800 rounded-lg p-4 mb-4 bg-red-50">
              <span className="font-medium">{apiError}</span>
            </div> : null}

          <div className="mt-3">
            <label htmlFor="email" className=" font-[500] ps-2">Email:</label>
            <input value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" name="email" id="email" placeholder="Enter Your Email" className="rounded-full w-full py-2 px-4" />
          </div>
          {formik.errors.email && formik.touched.email ?
            <div className="text-sm text-red-800 rounded-lg p-4 my-1 bg-red-50">
              <span className="font-medium">{formik.errors.email}</span>
            </div> : null}


          <div className="mt-3">
            <label htmlFor="password" className=" font-[500] ps-2">Password:</label>
            <input value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" name="password" id="password" placeholder="Enter Your Password" className="rounded-full w-full py-2 px-4" />
          </div>
          {formik.errors.password && formik.touched.password ?
            <div className="text-sm text-red-800 rounded-lg p-4 my-1 bg-red-50">
              <span className="font-medium">{formik.errors.password}</span>
            </div> : null}


          <div className="mt-3">
            <button className="mainBtn w-full" type='submit' disabled={isLoading}>
              {isLoading ? <i className="fas fa-circle-notch fa-spin"></i> : 'Login'}
            </button>
            <div className="flex justify-between">
              <Link className="underline text-black">ForgetPassword</Link>
              <Link to="/register" className="underline text-black">Create Account</Link>
            </div>
          </div>

        </form>
      </div>
    </section>
  </>
}
