import React, { useContext, useEffect, useState } from 'react'
import style from "./Cart.module.css";
import { CartContext } from '../../context/CartContext';
import { Link } from 'react-router-dom';

export default function Cart() {
  let [cartDetails, setCartDetails] = useState(null);
  let [isLoading, setIsLoading] = useState(false);
  let { getCartItems, deleteCartItems, deleteAllCart, updateItemQuantity } = useContext(CartContext);

  async function getItems() {
    setIsLoading(true);
    let response = await getCartItems();
    setIsLoading(false);
    setCartDetails(response?.data);
  }

  async function deleteItem(productId) {
    setIsLoading(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    let response = await deleteCartItems(productId);
    setIsLoading(false);
    setCartDetails(response?.data);
  }

  async function updateQuantity(productId, count) {
    setIsLoading(true);
    let response = await updateItemQuantity(productId, count);
    setIsLoading(false);
    setCartDetails(response?.data);
  }

  async function deleteCart() {
    setIsLoading(true);
    let response = await deleteAllCart();
    setIsLoading(false);
    setCartDetails(null);
  }

  useEffect(() => {
    getItems();
  }, [])

  return (
    <>
      <section className="py-12">
        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <span className="text-2xl font-bold animate-pulse">Loading...</span>
          </div>
        ) : cartDetails == null ? (
          <section className="flex flex-wrap justify-center py-20">
            <div className="w-2/3 text-center">
              <h1 className="font-[900] text-[40px] mb-3">
                <i className="fa-solid fa-heart-circle-xmark"></i> Your Cart Is
                Empty
              </h1>
              <Link to="/" className="mainBtn">
                <i className="fa-solid fa-arrow-left"></i> Go Shopping
              </Link>
            </div>
          </section>
        ) : (

          <div className="relative w-[80%] mx-auto overflow-x-auto shadow-md sm:rounded-lg">
            <div className="flex justify-end pb-4">
              <button onClick={() => deleteCart()} className='mainBtn'>Clear Cart</button>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="p-3">
                    Product
                  </th>
                  <th scope="col" className="p-3">
                    Qty
                  </th>
                  <th scope="col" className="p-3">
                    Price
                  </th>
                  <th scope="col" className="p-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartDetails?.data.products.map((product) => (
                  <tr
                    key={product.product.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="p-4">
                      <img
                        src={product.product.imageCover}
                        className="w-16 md:w-32 max-w-full max-h-full"
                        alt={product.product.title}
                      />
                      <p className="text-black font-[500]">
                        {product.product.title}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <button
                        onClick={()=> updateQuantity(product.product.id, product.count-1)}
                          className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 2"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M1 1h16"
                            />
                          </svg>
                        </button>
                        <div>
                          <span>{product.count}</span>
                        </div>
                        <button
                        onClick={()=> updateQuantity(product.product.id, product.count+1)}
                          className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 18"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 1v16M1 9h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      ${product.price}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        onClick={() => deleteItem(product.product.id)}
                        className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer"
                      >
                        Remove
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className='mainBtn w-full mt-5'>Confirm the order</button>
          </div>
        )}
      </section>
    </>
  );

}
