import React, { useEffect, useState } from 'react'
import style from "./BlankLayout.module.css";
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';

export default function BlankLayout() {
    let [count, setCount]= useState(0);
    useEffect(()=>{},[]);

  return<>
  <Navbar/>
  <Outlet></Outlet>
  <Footer/>
  </>
}
