import React, { useContext, useEffect, useState } from 'react'
import style from "./Navbar.module.css";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from "framer-motion";
import { UserContext } from '../../context/userContext';
import { Dropdown, DropdownItem } from "flowbite-react";
import axios from 'axios';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  let navigate = useNavigate();
  let { userLogin, setUserLogin } = useContext(UserContext);
  let [categories, setCategories] = useState([]);
  
  function getAllCategories() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then(({ data }) => {
        console.log(data.data);
        setCategories(data.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  function handleLogOut() {
    localStorage.removeItem('userToken');
    setUserLogin(null);
    // setUserLogin(false);
    navigate('/login');
  }

  useEffect(()=>{
    getAllCategories();
  },[])

  return <>
    <nav className="px-6 z-50 lg:px-14 py-6 flex md:flex-col lg:flex-row justify-center items-center lg:justify-between bg-white fixed top-0 right-0 left-0">

      {/* Burger Icon - Visible on Mobile */}
      <div className="md:hidden px-3">
        <button onClick={() => setIsOpen(!isOpen)}>
          <i className="fa-solid fa-bars text-2xl"></i>
        </button>
      </div>

      {/* logo */}
      <div className="flex justify-center items-center">
        <div className="logo uppercase">
          <Link to="" className={style.navTitle}>Shop.co</Link>
        </div>

        {/* login? */}
        {userLogin ?
          <div className="hidden md:flex items-center gap-8 px-12">
            <ul className="flex items-center gap-6">
              <li><NavLink to="" className="hover:text-gray-600">Home</NavLink></li>
              <li><NavLink to="products" className="hover:text-gray-600">Products</NavLink></li>
              <li>
                <Dropdown label="Categories" dismissOnClick={false} className='foonr-[600] text-[17px] hover:text-gray-600 text-black'>
                  {categories?.map((category) => (
                    <DropdownItem key={category._id}>
                      <NavLink to={`/categories/${category.name}`} className="w-full block text-start">
                        {category.name}
                      </NavLink>
                    </DropdownItem>
                  ))}
                </Dropdown>
              </li>
              <li><NavLink to="brands" className="hover:text-gray-600">Brands</NavLink></li>
            </ul>
          </div> : null}

      </div>

      {/* login? : */}
      {/* Right Side */}
      {userLogin ?
        <div className="hidden md:flex justify-center items-center gap-6">
          <div className="relative">
            <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"></i>
            <input
              type="search"
              placeholder="Search"
              className="pl-10 border rounded-[24px] py-2 px-3 w-[280px] lg:w-[400px] bg-gray-100"
            />
          </div>
          <i className="fa-solid fa-cart-shopping text-xl"></i>
          <button className="mainBtn" onClick={handleLogOut}>Sign Out</button>
        </div> 
        :
        <div className="hidden md:flex justify-center items-center gap-6">
          <Link className="mainBtn" to="login">Login</Link>
          <Link className="mainBtn" to="register">Register</Link>
        </div>
      }

    </nav>

    {/* Mobile Menu with Animation */}
    {userLogin ?
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="md:hidden bg-white shadow-md px-6 py-4 overflow-hidden"
          >
            <ul className="flex flex-col gap-4">
              <li><NavLink to="" className="hover:text-gray-600">Home</NavLink></li>
              <li><NavLink to="products" className="hover:text-gray-600">Products</NavLink></li>
              <li>
                <Dropdown label="Categories" dismissOnClick={false} className='foonr-[600] text-[17px] hover:text-gray-600 text-black'>
                  {categories?.map((category) => (
                    <DropdownItem key={category._id}>
                      <NavLink to={`/categories/${category.name}`} className="w-full block text-start">
                        {category.name}
                      </NavLink>
                    </DropdownItem>
                  ))}
                </Dropdown>
              </li>
              <li><NavLink to="brands" className="hover:text-gray-600">Brands</NavLink></li>
            </ul>

            <div className="flex flex-col gap-4 mt-4">
              <input
                type="search"
                placeholder="Search"
                className="border rounded-[24px] py-2 px-3 bg-gray-100"
              />
              <button className="mainBtn" onClick={handleLogOut}> Sign Out </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence> :
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
              <Link className="mainBtn" to="login">Login</Link>
              <Link className="mainBtn" to="register">Register</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    }
  </>
}
