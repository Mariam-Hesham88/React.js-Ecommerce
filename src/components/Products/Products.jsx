import React, { useEffect, useState } from 'react'
import style from "./Products.module.css";
import axios from 'axios';

export default function Products() {
  let [products, setProducts] = useState([]);
  let [isLoading, setIsLoading] = useState(false);

  function getAllProducts() {
    setIsLoading(true)
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        setProducts(data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      })
  }

  useEffect(() => {
    getAllProducts();
  }, []);

  return <>
    {isLoading ?
      <div className="flex justify-center items-center h-screen">
        <span className="text-2xl font-bold animate-pulse">Loading...</span>
      </div>
      :
      <div className="flex flex-wrap px-11">
        {products.map((product) =>
          <div key={product.id} className="product p-8 w-full md:w-1/3 lg:w-1/4 ">
            <div className='rounded-t-3xl border border-black hover:shadow-2xl cr'>
              <div className="img rounded-3xl">
                <img src={product.imageCover} alt={product.title} className="w-full rounded-t-3xl" />
              </div>
              <div className='p-5'>
                <h3>{product.category.name}</h3>
                <h3 className='font-[700] text-[24px]'>{product.title.split(' ').slice(0, 2).join(' ')}</h3>
                <dic className='flex justify-between'>
                  <span className='font-[600] text-[18px]'>{product.price} LE</span>
                  <span>{product.ratingsAverage} <i class="fa-solid fa-star text-yellow-400"></i></span>
                </dic>
                <button className='mainBtn w-full'>Add to cart</button>
              </div>
            </div>
          </div>
        )}
      </div>
    }
  </>
}
