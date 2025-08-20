import React, { useEffect, useState } from 'react'
import style from "./BlankLayout.module.css";

export default function BlankLayout() {
    let [count, setCount]= useState(0);
    useEffect(()=>{},[]);

  return (
    <div>BlankLayout</div>
  )
}
