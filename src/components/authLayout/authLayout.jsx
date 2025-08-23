import React, { useEffect, useState } from 'react'
import style from "./AuthLayout.module.css";
import AuthNav from '../authNav/authNav';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';

export default function AuthLayout() {
    let [count, setCount]= useState(0);

  return<>
  <AuthNav/>
  <Outlet></Outlet>
  <Footer/>
  </>
}
