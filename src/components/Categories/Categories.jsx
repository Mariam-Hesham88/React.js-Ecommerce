import React, { useEffect, useState } from 'react'
import style from "./Categories.module.css";
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

export default function Categories() {
  let [products, setProducts] = useState([]);
  let [isLoading, setIsLoading] = useState(false);
  let { categoryName } = useParams();

  function getproducts() {
    setIsLoading(true);
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        setProducts(data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      })
  }

  useEffect(() => {
    getproducts();
  }, []);

  return <>
    {isLoading ?
      <div className="flex justify-center items-center h-screen">
        <span className="text-2xl font-bold animate-pulse">Loading...</span>
      </div>
      :
      <div className="flex flex-wrap px-11">
        {products.length > 0 ? 
          products.filter((product) => product.category.name === categoryName).length > 0 ? (
            products
              .filter((product) => product.category.name === categoryName)
              .map((product) => 
                <div
                  key={product.id}
                  className="product p-8 w-full md:w-1/4 lg:w-1/5 "
                >
                  <Link
                    to={`/productDetails/${product.id}/${product.category.name}`}
                  >
                    <div className="rounded-t-3xl border border-black hover:shadow-2xl cr">
                      <div className="img rounded-3xl">
                        <img
                          src={product.imageCover}
                          alt={product.title}
                          className="w-full rounded-t-3xl"
                        />
                      </div>
                      <div className="p-5">
                        <h3>{product.category.name}</h3>
                        <h3 className="font-[600] text-[22px]">
                          {product.title.split(" ").slice(0, 2).join(" ")}
                        </h3>
                        <div className="flex justify-between pb-2">
                          <span className="font-[600] text-[18px]">
                            {product.price} LE
                          </span>
                          <span>
                            {product.ratingsAverage}{" "}
                            <i className="fa-solid fa-star text-yellow-400"></i>
                          </span>
                        </div>
                        <button className="mainBtn w-full">Add to cart</button>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
           : 
            <div className="w-2/3 text-center mx-auto">
              <h1 className="font-[900] text-[40px] mb-3 pt-32 capitalize">
                This category does not contain any products.
              </h1>
              <Link to="/" className="mainBtn">
                <i className="fa-solid fa-arrow-left"></i> Go Back
              </Link>
            </div> 
         : 
          <div className="w-2/3 text-center mx-auto pb-8">
            <h1 className="font-[900] text-[40px] mb-3 capitalize">
              No products available at all.
            </h1>
            <Link to="/" className="mainBtn">
              <i className="fa-solid fa-arrow-left"></i> Go Back
            </Link>
          </div>
        }
      </div>
    }
  </>
}
