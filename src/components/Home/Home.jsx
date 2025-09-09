import React, { useEffect, useState } from 'react'
import style from "./Home.module.css";
import hero from '../../assets/images/hero.png';
import Products from '../Products/Products';
import Slider from "react-slick";
import axios from 'axios';

export default function Home() {
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

  var settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay:true,
    arrows:false,
  };

  return <>
    <section className="hero py-10 flex flex-wrap bg-gray-100">
      <div className="w-full lg:w-1/2 p-4 lg:p-12 lg:pt-0 ">
        <h1 className='heroTitle'>FIND CLOTHES THAT MATCHES YOUR STYLE</h1>
        <p className='py-4 text-second'>Browse through our diverse range of meticulously crafted garments,
          designed to bring out your individuality and cater to your sense of
          style.</p>
        <button className=' w-[400px] lg:w-[200px] py-3 mainBtn'>Shop Now</button>
        <div className="flex flex-wrap justify-center pt-8">
          <div className="item w-1/2 lg:w-1/3">
            <h2 className='text-[25px] font-[600] leading-[30px] lg:text-[34px] lg:leading-[40px]'>200+</h2>
            <p className='text-second'>International Brands</p>
          </div>

          <div className="item w-1/2 lg:w-1/3">
            <h2 className='text-[25px] font-[600] leading-[30px] lg:text-[34px] lg:leading-[40px]'>2,000+</h2>
            <p className='text-second'>High-Quality Products</p>
          </div>

          <div className="item w-1/2 lg:w-1/3">
            <h2 className='text-[25px] font-[600] leading-[30px] lg:text-[34px] lg:leading-[40px]'>30,000+</h2>
            <p className='text-second'>Happy Customers</p>
          </div>


        </div>
      </div>

      <div className="w-full lg:w-1/2">
        <img src={hero} alt="models" className="w-2/3 mx-auto" />
      </div>
    </section>

    <section className='brands flex flex-wrap bg-black text-white py-3 px-2'>
      <div className="w-full mx-auto">
        <Slider {...settings}>
          {brands.map((brand) =>
            <h1 className='text-[30px] font-[700] text-center'>{brand.name}</h1>
          )}
        </Slider>
      </div>
    </section>

    <div className="py-10">
      <h1 className='uppercase mainTitle text-center pb-8'>new arrivals</h1>
      <div className="">
        <Products />
      </div>
    </div>
  </>
}
