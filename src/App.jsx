import { Suspense, lazy } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import BlankLayout from './components/blankLayout/blankLayout'
import UserContextProvider from './context/userContext'
import CartContextProvider from './context/CartContext'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import { Toaster } from 'react-hot-toast'
// import Checkout from './components/checkout/checkout'

// Lazy imports
const Login = lazy(() => import('./components/Login/Login'))
const Register = lazy(() => import('./components/Register/Register'))
const Home = lazy(() => import('./components/Home/Home'))
const Products = lazy(() => import('./components/Products/Products'))
const Categories = lazy(() => import('./components/Categories/Categories'))
const Cart = lazy(() => import('./components/Cart/Cart'))
const Checkout = lazy(() => import('./components/checkout/checkout'))
const Brands = lazy(() => import('./components/Brands/Brands'))
const ProductDetails = lazy(() => import('./components/ProductDetails/ProductDetails'))
const NotFound = lazy(() => import('./components/NotFound/NotFound'))
const BrandProducts = lazy(() => import('./components/BrandProducts/BrandProducts'))
 

function App() {
  let router = createBrowserRouter([
    {
      path: '',
      element: <BlankLayout/>, 
      children: [
        { index: true, element: <ProtectedRoute><Home/></ProtectedRoute> },
        { path: 'products', element: <ProtectedRoute><Products/></ProtectedRoute> },
        { path: 'categories/:categoryName', element: <ProtectedRoute><Categories/></ProtectedRoute> },
        { path: 'cart', element: <ProtectedRoute><Cart/></ProtectedRoute> },
        { path: 'checkout', element: <ProtectedRoute><Checkout/></ProtectedRoute> },
        { path: 'brands', element: <ProtectedRoute><Brands/></ProtectedRoute> },
        { path: 'brandProducts/:id', element: <ProtectedRoute><BrandProducts/></ProtectedRoute> },
        { path: 'productDetails/:id/:category', element: <ProtectedRoute><ProductDetails/></ProtectedRoute> },
        { path: 'login', element: <Login/> },
        { path: 'register', element: <Register/> },
        { path: '*', element: <NotFound/> }
      ]
    },
  ]);

  return (
    <UserContextProvider>
      <CartContextProvider>
        <Suspense fallback={<div className="flex justify-center items-center ">Loading...</div>}>
          <RouterProvider router={router}/>
        </Suspense>
        <Toaster/>
      </CartContextProvider>
    </UserContextProvider>
  )
}

export default App
