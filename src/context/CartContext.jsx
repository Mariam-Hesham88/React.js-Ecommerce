import axios from "axios";
import { createContext } from "react";

export let CartContext = createContext();

export default function CartContextProvider(props){
    let headers = {
    token: localStorage.getItem('userToken'),
}

function addToCart(productId){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{
        productId:productId,
    },{
        headers:headers,
    })
    .then((response)=> response)
    .catch((error)=> error)
}

function getCartItems(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,
        {
        headers:headers,
    })
    .then((response)=> response)
    .catch((error)=> error)
}      

function updateItemQuantity(productId,count){
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
            count:count
        },
        {
        headers:headers,
    })
    .then((response)=> response)
    .catch((error)=> error)
}

function deleteCartItems(productId){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
        headers:headers,
    })
    .then((response)=> response)
    .catch((error)=> error)
}

function deleteAllCart(){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,
        {
        headers:headers,
    })
    .then((response)=> response)
    .catch((error)=> error)
}

    return <CartContext.Provider value={{addToCart, getCartItems, deleteCartItems, deleteAllCart, updateItemQuantity}}>
         {props.children}
    </CartContext.Provider>
}