import React from 'react'
import style from "./BlankLayout.module.css";
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';

export default function BlankLayout() {
  return<>
  <Navbar/>
  <Outlet></Outlet>
  <Footer/>
  </>
}
