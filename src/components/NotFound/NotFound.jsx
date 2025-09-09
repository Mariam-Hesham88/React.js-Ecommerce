import React, { useEffect, useState } from 'react'
import style from "./NotFound.module.css";
import { Link } from 'react-router-dom';

export default function NotFound() {
    let [count, setCount]= useState(0);
    useEffect(()=>{},[]);

  return <>
  <section className='flex flex-wrap justify-center py-20'>
    <div className="w-2/3 text-center">
      <h1 className='font-[900] text-[80px] mb-3'>Not Found 404</h1>
      {/* <h1 className='font-[900] text-[70px]'>404</h1> */}
      <Link to="/" className='mainBtn'> <i className="fa-solid fa-arrow-left"></i> Go Back </Link>
    </div>
  </section>
  </>
}
