import React, { useContext, useEffect, useState } from 'react'
import style from "./Checkout.module.css";
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup'
import { CartContext } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  let [isLoading, setIsLoading] = useState(false);
  let { cashOnDeliver } = useContext(CartContext)
  let navigate = useNavigate();

  let validationSchema = Yup.object().shape({
    details: Yup.string().required('Required'),
    phone: Yup.string().matches(/^01[0125][0-9]{8}$/, 'Accept only Egypt phone numbers').required('Required'),
    city: Yup.string().required('Required'),
  });

  async function handleCheckOut(formValue) {
    setIsLoading(true);
      // console.log(formValue);

    let response = await cashOnDeliver(formValue.values);
    console.log(response);
    if(response?.statusText === "Created"){
      navigate('/cart');
    }
    
      // .then((apiResponse) => {
      //   console.log('done');
      // })
      // .catch((error) => {
      //   console.log('error');
      // });

  }

  let formik = useFormik({
    initialValues: {
      details: '',
      phone: '',
      city: '',
    },
    validationSchema: validationSchema,
    onSubmit: handleCheckOut
  });

  return <>
    <section className="flex justify-center items-center py-2">
      <div className="p-8 m-2 w-full rounded-3xl lg:w-1/3 bg-gray-200">
        <h1 className="text-black text-center text-[40px] font-[700] pb-6">Shipping info</h1>
        <form onSubmit={formik.handleSubmit}>

          <div className="mt-3">
            <label htmlFor="details" className=" font-[500] ps-2">Details:</label>
            <input value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" details="name" id="details" placeholder="Enter Your Details" className="rounded-full w-full py-2 px-4" />
          </div>
          {formik.errors.details && formik.touched.details ?
            <div className="text-sm text-red-800 rounded-lg p-4 my-1 bg-red-50">
              <span className="font-medium">{formik.errors.details}</span>
            </div> : null}


          <div className="mt-3">
            <label htmlFor="phone" className=" font-[500] ps-2">Phone:</label>
            <input value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} type="tel" name="phone" id="phone" placeholder="Enter Your Phone" className="rounded-full w-full py-2 px-4" />
          </div>
          {formik.errors.phone && formik.touched.phone ?
            <div className="text-sm text-red-800 rounded-lg p-4 my-1 bg-red-50">
              <span className="font-medium">{formik.errors.phone}</span>
            </div> : null}

          <div className="mt-3">
            <label htmlFor="city" className=" font-[500] ps-2">City:</label>
            <input value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" name="city" id="city" placeholder="Enter Your City" className="rounded-full w-full py-2 px-4" />
          </div>
          {formik.errors.city && formik.touched.city ?
            <div className="text-sm text-red-800 rounded-lg p-4 my-1 bg-red-50">
              <span className="font-medium">{formik.errors.city}</span>
            </div> : null}

          <div className="mt-3">
            <button type='submit' className="mainBtn w-full" disabled={isLoading}>
              {isLoading ? <i className="fas fa-circle-notch fa-spin"></i> : 'Pay Now'}
            </button>
          </div>

        </form>
      </div>
    </section>
  </>
}
