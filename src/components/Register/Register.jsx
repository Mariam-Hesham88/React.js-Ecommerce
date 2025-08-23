import React, { useEffect, useState } from 'react'
import style from "./Register.module.css";
import { Link } from 'react-router-dom';

export default function Register() {
    let [count, setCount]= useState(0);
    useEffect(()=>{},[]);

    return <>
    <section className="flex justify-center items-center py-2">
      <div className="p-8 m-2 w-full rounded-3xl lg:w-1/3 bg-gray-200">
        <h1 className="text-black text-center text-[40px] font-[700] pb-6">Register</h1>
        <form action="">
          <div className="mt-3">
            <label htmlFor="name" className=" font-[500] ps-2">Name:</label>
            <input type="text" name="name" id="name" placeholder="Enter Your Name" className="rounded-full w-full py-2 px-4" />
          </div>
          <div className="mt-3">
            <label htmlFor="email" className=" font-[500] ps-2">Email:</label>
            <input type="email" name="email" id="email" placeholder="Enter Your email" className="rounded-full w-full py-2 px-4" />
          </div>

          <div className="mt-3">
            <label htmlFor="phone" className=" font-[500] ps-2">Phone:</label>
            <input type="text" name="phone" id="phone" placeholder="Enter Your Phone" className="rounded-full w-full py-2 px-4" />
          </div>
          <div className="mt-3">
            <label htmlFor="password" className=" font-[500] ps-2">Password:</label>
            <input type="password" name="password" id="password" placeholder="Enter Password" className="rounded-full w-full py-2 px-4" />
          </div>
          <div className="mt-3">
            <label htmlFor="repassword" className=" font-[500] ps-2">RePassword:</label>
            <input type="password" name="repassword" id="repassword" placeholder="Please Enter The password again" className="rounded-full w-full py-2 px-4" />
          </div>
          <div className="mt-3">
            <button className="mainBtn w-full">Login</button>
            <Link to="" className="underline text-black">I already have an account</Link>
          </div>

        </form>
      </div>
    </section>
  </>
}
