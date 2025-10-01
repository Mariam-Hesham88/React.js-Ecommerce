import React, { useContext, useEffect, useState } from 'react'
import style from "./Products.module.css";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import toast from 'react-hot-toast';

export default function Products() {
  let [products, setProducts] = useState([]);
  let [isLoading, setIsLoading] = useState(false);
  let { addToCart } = useContext(CartContext);

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

async function addProductToCart(productId) {
  try {
    let response = await addToCart(productId);

    // console.log(response.data); 

    if (response?.data?.status === "success") {
      console.log("added");
      toast.success(response?.data?.message || "added", {
        duration: 3000,
        position: 'bottom-right',
      });
    } else {
      console.log("error");
      toast.error(response?.data?.message || "error", {
        duration: 3000,
        position: 'bottom-right',
      });
    }
  } catch (err) {
    console.error(err);
    toast.error("something went wrong", {
      duration: 3000,
      position: 'bottom-right',
    });
  }
}


  return <>
    {isLoading ?
      <div className="flex justify-center items-center h-screen">
        <span className="text-2xl font-bold animate-pulse">Loading...</span>
      </div>
      :
      <div className="flex flex-wrap px-11">
        {products.map((product) =>
          <div key={product.id} className="product p-5 w-full md:w-1/4 lg:w-1/5 ">
            <div className='rounded-t-3xl border border-black  hover:shadow-2xl duration-[0.5s] overflow-hidden group cr'>
              <Link to={`/productDetails/${product.id}/${product.category.name}`}>
                <div className="img rounded-3xl">
                  <img src={product.imageCover} alt={product.title} className="w-full rounded-t-3xl  transition-transform group-hover:scale-110" />
                </div>
                <div className='p-5'>
                  <h3>{product.category.name}</h3>
                  <h3 className='font-[600] text-[22px]'>{product.title.split(' ').slice(0, 2).join(' ')}</h3>
                  <div className='flex justify-between pb-2'>
                    <span className='font-[600] text-[18px]'>{product.price} LE</span>
                    <span>{product.ratingsAverage} <i className="fa-solid fa-star text-yellow-400"></i></span>
                  </div>
                </div>
              </Link>
              <button className='mainBtn m-2 w-[95%]' onClick={()=>addProductToCart(product.id)}>Add to cart</button>
            </div>
          </div>
        )}
      </div>
    }
  </>
}
