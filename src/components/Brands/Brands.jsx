import React, { useEffect, useState } from 'react'
import style from "./Brands.module.css";
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Brands() {
  let [brands, setBrands] = useState([]);
  let [isLoading, setIsLoading] = useState(false);

  function getAllBrands() {
    setIsLoading(true);
    axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
      .then(({ data }) => {
        setIsLoading(false);
        setBrands(data.data);
      })
      .catch((error) => {
        setIsLoading(false);
      })
  }


  useEffect(() => {
    getAllBrands();
  }, []);

  return <>
    {isLoading ?
      <div className="flex justify-center items-center h-screen">
        <span className="text-2xl font-bold animate-pulse">Loading...</span>
      </div>
      :
      <section className='brands mx-5 rounded-3xl bg-black py-3 px-2'>
        <h1 className='uppercase mainTitle text-center text-white pb-8'>our brands</h1>
        <div className='flex flex-wrap justify-center'>
          {brands.map((brand) =>
            <div className="w-1/4 bg-white hover:bg-gray-300 duration-[0.5s] cr rounded-2xl m-2 py-8 px-6">
              <Link to={`/brandProducts/${brand._id}`}>
                <h1 className='text-[30px] font-[700] text-center hover:text-[42px] duration-[0.5s]'>{brand.name}</h1>
              </Link>
            </div>
          )}
        </div>
      </section>
    }
  </>
}
