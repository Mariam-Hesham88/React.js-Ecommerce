import { useContext, useState } from 'react'
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
import BlankLayout from './components/blankLayout/blankLayout';
import UserContextProvider, { UserContext } from './context/userContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

function App() {
  let router = createBrowserRouter([
    {
      path: '', element: <BlankLayout />, children: [
        { index: true, element: <ProtectedRoute> <Home/> </ProtectedRoute> },
        { path: 'products', element: <ProtectedRoute> <Products/> </ProtectedRoute> },
        { path: 'categories/:categoryName', element: <ProtectedRoute> <Categories/> </ProtectedRoute> },
        { path: 'cart', element: <ProtectedRoute> <Cart/> </ProtectedRoute> },
        { path: 'brands', element: <ProtectedRoute> <Brands /> </ProtectedRoute> },
        { path: 'productDetails/:id/:category', element: <ProtectedRoute> <ProductDetails /> </ProtectedRoute> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '*', element: <NotFound /> }
      ]
    },
  ]);

  return <UserContextProvider>
    <RouterProvider router={router}></RouterProvider>
  </UserContextProvider>

}

export default App
