import React, { useEffect, useState } from 'react'
import style from "./Brands.module.css";
import axios from 'axios';

export default function Brands() {
  let [brands, setBrands] = useState([]);

  function getAllBrands() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
      .then(({ data }) => {
        console.log(data.data);
        setBrands(data.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }


  useEffect(() => {
    getAllBrands();
  }, []);

  return <>
    <section className='brands mx-5 rounded-3xl bg-black py-3 px-2'>
      <h1 className='uppercase mainTitle text-center text-white pb-8'>our brands</h1>
      <div className='flex flex-wrap justify-center'>
        {brands.map((brand) =>
          <div className="w-1/4 bg-white hover:bg-gray-300 duration-[0.5s] cr rounded-2xl m-2 py-8 px-6">
            <h1 className='text-[30px] font-[700] text-center hover:text-[42px] duration-[0.5s]'>{brand.name}</h1>
          </div>
        )}
      </div>
    </section>
  </>
}
