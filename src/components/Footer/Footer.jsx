import React, { useEffect, useState } from 'react'
import style from "./Footer.module.css";
import apple from "../../assets/images/apple.png";
import google from "../../assets/images/google.png";

export default function Footer() {

  return <>
    <footer>
      <div className="up lg:flex lg:justify-center bg-black rounded-3xl p-10 m-4">
        <div className="w-full lg:w-1/2">
          <h1 className="text-white font-[900] text-[30px] lg:text-[40px] leading-[40px] lg:leading-[60px] uppercase"> STAY UPTO DATE ABOUT OUR LATEST OFFERS </h1>
        </div>
        <div className="w-full lg:w-1/3">
          <input type="search" placeholder='Enter your email address' className="w-full py-3 ps-8 my-4 rounded-full" />
          <button className="rounded-full bg-white text-black w-full py-3"> Subscribe to Newsletter </button>
        </div>
      </div>

      <div className="down bg-gray-100 p-6">

        <div className="lg:flex p-6 lg:flex-nowrap">
          <div className="lg:w-1/4 w-full logo py-6">
            <h1 to="" className={style.footerTitle}>SHOP.CO</h1>
            <p className="text-sm py-2">
              We have clothes that suits your style and which you’re proud to wear. From women to men.
            </p>
            <div className="icons">
              <ul className="flex gap-3 text-black">
                <li className="rounded-full p-1 bg-white border">
                  <i className="fa-brands fa-twitter"></i>
                </li>
                <li className="rounded-full p-1 bg-white border">
                  <i className="fa-brands fa-facebook-f"></i>
                </li>
                <li className="rounded-full p-1 bg-white border">
                  <i className="fa-brands fa-instagram"></i>
                </li>
                <li className="rounded-full p-1 bg-white border">
                  <i className="fa-brands fa-github"></i>
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:w-3/4 w-full">
            <div className="flex flex-wrap">
              <div className="w-1/2 md:w-1/3 lg:w-1/4 p-5 ps-1">
                <h2 className="text-black uppercase font-[600]">Company</h2>
                <ul>
                  <li className="pt-3 font-[400]">About</li>
                  <li className="pt-3 font-[400]">Features</li>
                  <li className="pt-3 font-[400]">Works</li>
                  <li className="pt-3 font-[400]">Career</li>
                </ul>
              </div>

              <div className="w-1/2 md:w-1/3 lg:w-1/4 p-5 ps-1">
                <h2 className="text-black uppercase font-[600]">help</h2>
                <ul>
                  <li className="pt-3 font-[400]">Customer Support</li>
                  <li className="pt-3 font-[400]">Delivery Details</li>
                  <li className="pt-3 font-[400]">Terms & Conditions</li>
                  <li className="pt-3 font-[400]">Privacy Policy</li>
                </ul>
              </div>

              <div className="w-1/2 md:w-1/3 lg:w-1/4 p-5 ps-1">
                <h2 className="text-black uppercase font-[600]">faq</h2>
                <ul>
                  <li className="pt-3 font-[400]">Account</li>
                  <li className="pt-3 font-[400]">Manage Deliveries</li>
                  <li className="pt-3 font-[400]">Orders</li>
                  <li className="pt-3 font-[400]">Payments</li>
                </ul>
              </div>

              <div className="w-1/2 md:w-1/3 lg:w-1/4 p-5 ps-1">
                <h2 className="text-black uppercase font-[600]">resources</h2>
                <ul>
                  <li className="pt-3 font-[400]">Free EBooks</li>
                  <li className="pt-3 font-[400]">Development Tutorial</li>
                  <li className="pt-3 font-[400]">How To - Blog</li>
                  <li className="pt-3 font-[400]">Youtube Playlist</li>
                </ul>
              </div>

            </div>
          </div>
        </div>

        <div className="w-full h-[1px] bg-gray-300"></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 items-center py-6">
          <div>
            <p className="text-center lg:text-start">Shop.co © 2000-2023, All Rights Reserved</p>
          </div>
          <div className="flex justify-center lg:justify-end items-center">
            <ul className="flex w-1/2 ">
              <li>
                <img className=" w-full" src={apple} alt="mac-pay" />
              </li>
              <li>
                <img className=" w-full" src={google} alt="google-pay" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </>


}
