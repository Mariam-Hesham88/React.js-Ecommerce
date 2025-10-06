import React from 'react'
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';

export default function BlankLayout() {
  return<>
  <Navbar/>
  <div className="pt-24">
    <Outlet></Outlet>
  </div>
  <Footer/>
  </>
}
