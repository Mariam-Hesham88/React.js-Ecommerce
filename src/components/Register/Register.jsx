import React, { useContext, useState } from 'react'
import style from "./Register.module.css";
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup'
import { UserContext } from '../../context/userContext';

export default function Register() {
  let [apiError, setApiErorr] = useState('');
  let [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();

  let {setUserLogin} = useContext(UserContext);

  let validationSchema = Yup.object().shape({
    name: Yup.string().min(3, 'The name must be equal or more than 3 character').max(25, 'The name must be less than 25 character').required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    phone: Yup.string().matches(/^01[0125][0-9]{8}$/, 'Accept only Egypt phone numbers').required('Required'),
    password: Yup.string().matches(/^[A-Z][a-zA-Z0-9!@#$%^&*]{5,15}$/, 'password must start with upperCase then from 6 to more any chars').required('Required'),
    rePassword: Yup.string().oneOf([Yup.ref('password')], 'Password confirmation does not match').required('Required'),
  });

  function handleSubmit(formValue) {
    setIsLoading(true);
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, formValue)
      .then((apiResponse) => {
        if (apiResponse?.response?.data?.message === 'success') {
          localStorage.setItem('userToken', apiResponse.data.token)
          setUserLogin(apiResponse.data.token);
          navigate('/');
          setIsLoading(false);
        }
        // console.log(apiResponse)
      })
      .catch((apiResponse) => {
        setIsLoading(false);
        setApiErorr(apiResponse?.response?.data?.message);
      });
  }

  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      rePassword: ''
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit
  });

  return <>
    <section className="flex justify-center items-center py-2">
      <div className="p-8 m-2 w-full rounded-3xl lg:w-1/3 bg-gray-200">
        <h1 className="text-black text-center text-[40px] font-[700] pb-6">Register</h1>
        <form onSubmit={formik.handleSubmit}>

          {apiError ?
            <div className="text-sm text-red-800 rounded-lg p-4 mb-4 bg-red-50">
              <span className="font-medium">{apiError}</span>
            </div> : null}

          <div className="mt-3">
            <label htmlFor="name" className=" font-[500] ps-2">Name:</label>
            <input value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" name="name" id="name" placeholder="Enter Your Name" className="rounded-full w-full py-2 px-4" />
          </div>
          {formik.errors.name && formik.touched.name ?
            <div className="text-sm text-red-800 rounded-lg p-4 my-1 bg-red-50">
              <span className="font-medium">{formik.errors.name}</span>
            </div> : null}


          <div className="mt-3">
            <label htmlFor="email" className=" font-[500] ps-2">Email:</label>
            <input value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" name="email" id="email" placeholder="Enter Your email" className="rounded-full w-full py-2 px-4" />
          </div>
          {formik.errors.email && formik.touched.email ?
            <div className="text-sm text-red-800 rounded-lg p-4 my-1 bg-red-50">
              <span className="font-medium">{formik.errors.email}</span>
            </div> : null}


          <div className="mt-3">
            <label htmlFor="phone" className=" font-[500] ps-2">Phone:</label>
            <input value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" name="phone" id="phone" placeholder="Enter Your Phone" className="rounded-full w-full py-2 px-4" />
          </div>
          {formik.errors.phone && formik.touched.phone ?
            <div className="text-sm text-red-800 rounded-lg p-4 my-1 bg-red-50">
              <span className="font-medium">{formik.errors.phone}</span>
            </div> : null}


          <div className="mt-3">
            <label htmlFor="password" className=" font-[500] ps-2">Password:</label>
            <input value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" name="password" id="password" placeholder="Enter Password" className="rounded-full w-full py-2 px-4" />
          </div>
          {formik.errors.password && formik.touched.password ?
            <div className="text-sm text-red-800 rounded-lg p-4 my-1 bg-red-50">
              <span className="font-medium">{formik.errors.password}</span>
            </div> : null}


          <div className="mt-3">
            <label htmlFor="rePassword" className=" font-[500] ps-2">RePassword:</label>
            <input value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" name="rePassword" id="repassword" placeholder="Please Enter The password again" className="rounded-full w-full py-2 px-4" />
          </div>
          {formik.errors.rePassword && formik.touched.rePassword ?
            <div className="text-sm text-red-800 rounded-lg p-4 my-1 bg-red-50">
              <span className="font-medium">{formik.errors.rePassword}</span>
            </div> : null}


          <div className="mt-3">
            <button type='submit' className="mainBtn w-full">
              {isLoading ? <i className="fas fa-circle-notch fa-spin"></i> : 'Register'}
            </button>
            <Link to="/login" className="underline text-black">I already have an account</Link>
          </div>

        </form>
      </div>
    </section>
  </>
}
