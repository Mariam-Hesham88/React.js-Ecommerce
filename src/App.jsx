import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Home from './components/Home/Home';
import Products from './components/Products/Products';
import Categories from './components/Categories/Categories';
import Cart from './components/Cart/Cart';
import Brands from './components/Brands/Brands';
import ProductDetails from './components/ProductDetails/ProductDetails';
import NotFound from './components/NotFound/NotFound';
import AuthLayout from './components/authLayout/authLayout';
import BlankLayout from './components/blankLayout/blankLayout';

function App() {
  let router = createBrowserRouter([
    {path:'',element:<AuthLayout/> , children:[
      {index:true, element:<Login/>},
      {path:'register', element:<Register/>}
    ]},
    {path:'',element:<BlankLayout/> , children:[
      {index:true, element:<Home/>},
      {path:'products', element:<Products/>},
      {path:'categories', element:<Categories/>},
      {path:'cart', element:<Cart/>},
      {path:'brands', element:<Brands/>},
      {path:'productDetails', element:<ProductDetails/>},
      {path:'*', element:<NotFound/>}
    ]},
  ]);

  return <> <RouterProvider router={router}></RouterProvider></>

}

export default App
