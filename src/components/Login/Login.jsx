import React, { useEffect, useState } from 'react'
import style from "./Login.module.css";
import { Link } from 'react-router-dom';

export default function Login() {
  let [count, setCount] = useState(0);
  useEffect(() => { }, []);

  return <>
    <section className="flex justify-center items-center py-12">
      <div className="p-8 m-2 w-full rounded-3xl lg:w-1/3 bg-gray-200">
        <h1 className="text-black text-center text-[40px] font-[700] pb-6">LogIn</h1>
        <form action="">
          <div className="mt-3">
            <label htmlFor="email" className=" font-[500] ps-2">Email:</label>
            <input type="email" name="email" id="email" placeholder="Enter Your Name" className="rounded-full w-full py-2 px-4" />
          </div>
          <div className="mt-3">
            <label htmlFor="password" className=" font-[500] ps-2">Password:</label>
            <input type="password" name="password" id="password" placeholder="Enter Your Name" className="rounded-full w-full py-2 px-4" />
          </div>
          <div className="mt-3">
            <button className="mainBtn w-full">Login</button>
            <div className="flex justify-between">
              <Link className="underline text-black">ForgetPassword</Link>
              <Link to="register" className="underline text-black">Craete Account</Link>
            </div>
          </div>

        </form>
      </div>
    </section>
  </>
}
