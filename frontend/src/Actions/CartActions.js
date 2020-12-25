import axios from 'axios'
import {CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS,CART_SAVE_PAYMENT_METHOD} from '../Constants/CartConstants'


export const addToCart = (productId, qty) => async (dispatch, getState) => {

    const {data} = await axios(`/api/products/${productId}`)
    
    dispatch({
        type: CART_ADD_ITEM,
        payload:{
            productId: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty 
        }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => async(dispatch, getState) => {
    
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (data) => async(dispatch) => {
    
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data
    })

    localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = (paymentMethodData) => async(dispatch) => {
    
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: paymentMethodData
    })

    localStorage.setItem('paymentMethod', JSON.stringify(paymentMethodData))
}