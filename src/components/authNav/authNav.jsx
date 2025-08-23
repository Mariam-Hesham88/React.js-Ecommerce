import React, { useEffect, useState } from 'react'
import style from "./AuthNav.module.css";
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from "framer-motion";

export default function AuthNav() {
  const [isOpen, setIsOpen] = useState(false);

  return <>
    <nav className="px-6 lg:px-14 py-8 flex md:flex-col lg:flex-row justify-center items-center lg:justify-between bg-white ">

      {/* Burger Icon - Visible on Mobile */}
      <div className="md:hidden px-3">
        <button onClick={() => setIsOpen(!isOpen)}>
          <i className="fa-solid fa-bars text-2xl"></i>
        </button>
      </div>


      <div className="flex justify-center items-center">
        <div className="logo uppercase">
          <Link to="" className={style.navTitle}>Shop.co</Link>
        </div>
      </div>

      {/* Right Side */}
      <div className="hidden md:flex justify-center items-center gap-6">
        <Link className="mainBtn" to="">Login</Link>
        <Link className="mainBtn" to="register">Register</Link>
      </div>
    </nav>

    {/* Mobile Menu with Animation */}
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="md:hidden bg-white shadow-md px-6 py-4 overflow-hidden"
        >
          <div className="flex flex-col gap-4 mt-4">
            <Link className="mainBtn" to="">Login</Link>
            <Link className="mainBtn" to="register">Register</Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </>
}
