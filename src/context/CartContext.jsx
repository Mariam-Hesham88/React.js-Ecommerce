import axios from "axios";
import { createContext, useState } from "react";

export let CartContext = createContext();

export default function CartContextProvider(props) {
    let headers = {
        token: localStorage.getItem('userToken'),
    }
    let [cartId, setCartId] = useState('');

    function addToCart(productId) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {
            productId: productId,
        }, {
            headers: headers,
        })
            .then((response) => response)
            .catch((error) => error)
    }

    function getCartItems() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,
            {
                headers: headers,
            })
            .then((response) => {
                if (response.data?.data?._id) {
                    setCartId(response.data.cartId);
                }
                return response;
            })
            .catch((error) => error)
    }

    function cashOnDeliver(shippingAddress) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
            {
                shippingAddress
            }, {
            headers: headers,
        })
            .then((response) => response)
            // .then((response) => {
            //     if (response?.statusText === "Created") {
            //         getCartItems();
            //     }
            //     return response;
            // })
            .catch((error) => error)
    }

    function updateItemQuantity(productId, count) {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            {
                count: count
            },
            {
                headers: headers,
            })
            .then((response) => response)
            .catch((error) => error)
    }

    function deleteCartItems(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            {
                headers: headers,
            })
            .then((response) => response)
            .catch((error) => error)
    }

    function deleteAllCart() {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,
            {
                headers: headers,
            })
            .then((response) => response)
            .catch((error) => error)
    }

    return <CartContext.Provider value={{ addToCart, getCartItems, deleteCartItems, deleteAllCart, updateItemQuantity, cashOnDeliver }}>
        {props.children}
    </CartContext.Provider>
}