import React, { useContext, useEffect, useState } from 'react'
import style from "./ProductDetails.module.css";
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from "react-slick";
import { CartContext } from '../../context/CartContext';
import toast from 'react-hot-toast';

export default function ProductDetails() {
  let [productDetails, setProductDetails] = useState(null);
  let [relatedProduct, setRelatedProduct] = useState([]);
  let { id, category } = useParams();
  let [isLoading, setIsLoading] = useState(false);
    let [btnIsLoading, setBtnIsLoading] = useState(false);
  let { addToCart } = useContext(CartContext)

  function getProductDetails(id) {
    setIsLoading(true);
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => {
        setIsLoading(false);
        console.log(data.data);
        setProductDetails(data.data);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      })
  }

  function getAllProduct(category) {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        console.log(data.data);
        let allProducts = data.data;
        let related = allProducts.filter((products) => products.category.name == category)
        setRelatedProduct(related);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  async function addProductToCart(productId) {
    try {
      let response = await addToCart(productId);
      setBtnIsLoading(true);
      if (response?.data?.status === "success") {
        toast.success(response?.data?.message || "added", {
          duration: 3000,
          position: 'bottom-right',
        });
        setBtnIsLoading(false);
      } else {
        toast.error(response?.data?.message || "error", {
          duration: 3000,
          position: 'bottom-right',
        });
        setBtnIsLoading(false);
      }
    } catch (err) {
      console.error(err);
      toast.error("something went wrong", {
        duration: 3000,
        position: 'bottom-right',
      });
    }
  }


  useEffect(() => {
    getProductDetails(id);
    getAllProduct(category);
    window.scrollTo(0, 0);
  }, [id, category]);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return <>
    {isLoading ?
      <div className="flex justify-center items-center h-screen">
        <span className="text-2xl font-bold animate-pulse">Loading...</span>
      </div>
      :
      <section className='mx-auto lg:w-[90%]'>
        <div className="flex flex-wrap justify-center items-center">
          <div className="w-full md:w-1/3 p-20">
            <Slider {...settings}>
              {productDetails?.images.map((src) => <img src={src} alt={productDetails?.title} className='w-full' />)}
            </Slider>
          </div>
          <div className="w-full md:w-2/3 px-6">
            <h1 className='font-[700] text-[30px]'>{productDetails?.title}</h1>
            <p className='text-gray-500 py-3 text-[14px]'>{productDetails?.description}</p>
            <h1 className='font-[500] text-[18px]'>{productDetails?.category.name}</h1>
            <div className='flex justify-between pb-2'>
              <span className='font-[600] text-[18px]'>{productDetails?.price} LE</span>
              <span> {productDetails?.ratingsAverage} <i className="fa-solid fa-star text-yellow-400"></i></span>
            </div>
            {/* <button onClick={() => addProductToCart(productDetails?.id)} className="mainBtn w-full">Add To Cart</button>
             */}
             <button onClick={() => addProductToCart(productDetails?.id)} type='submit' className='mainBtn m-2 w-[95%]' disabled={btnIsLoading}>
              Add to cart
            </button>
          </div>
        </div>
      </section>
    }

    <section className="related">
      <div className="py-6">
        <h1 className='uppercase mainTitle text-center pb-8'>Related products</h1>
        <div className="flex flex-wrap px-11">
          {relatedProduct.map((product) =>
            <div key={product.id} className="product p-8 w-full md:w-1/4 lg:w-1/5 ">
              <div className='rounded-t-3xl border border-black hover:shadow-2xl cr'>
                <Link to={`/productDetails/${product.id}/${product.category.name}`} >
                  <div className="img rounded-3xl">
                    <img src={product.imageCover} alt={product.title} className="w-full rounded-t-3xl" />
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
                <button onClick={() => addProductToCart(product.id)} className='mainBtn m-2 w-[95%]'>Add to cart</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  </>
}
