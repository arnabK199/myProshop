import {PRODUCT_LIST_REQUEST, 
        PRODUCT_LIST_SUCCESS, 
        PRODUCT_LIST_FAIL, 
        PRODUCT_DETAIL_REQUEST, 
        PRODUCT_DETAIL_SUCCESS, 
        PRODUCT_DETAIL_FAIL,
        PRODUCT_DELETE_REQUEST,
        PRODUCT_DELETE_SUCCESS,
        PRODUCT_DELETE_FAIL,
        PRODUCT_CREATE_REQUEST,
        PRODUCT_CREATE_SUCCESS,
        PRODUCT_CREATE_FAIL,
        PRODUCT_UPDATE_REQUEST,
        PRODUCT_UPDATE_SUCCESS,
        PRODUCT_UPDATE_RESET,
        PRODUCT_CREATE_REVIEW_REQUEST,
        PRODUCT_CREATE_REVIEW_SUCCESS,
        PRODUCT_CREATE_REVIEW_FAIL,
        PRODUCT_TOP_REQUEST,
        PRODUCT_TOP_FAIL,
        PRODUCT_TOP_SUCCESS} from '../Constants/ProductConstants'

import axios from 'axios'

export const listProducts = (keyword='', pageNumber='') => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST})

        const {data} = await axios(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`)

        dispatch({ 
            type: PRODUCT_LIST_SUCCESS, 
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.message ? 
                        error.response.data.message : error.message
        })
    }
}

export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAIL_REQUEST})

        const {data} = await axios(`/api/products/${id}`)

        dispatch({ 
            type: PRODUCT_DETAIL_SUCCESS, 
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAIL_FAIL,
            payload: error.response && error.response.data.message ? 
                        error.response.data.message : error.message
        })
    }
}

export const deleteProduct = (productId) => async(dispatch, getState) => {
    try {
        dispatch({
            type:PRODUCT_DELETE_REQUEST
        })

        const { userLogin: { userInfo }} = getState()

        const config = {
            headers:{
                'Authorization': `Bearer ${userInfo.token}`
            }
        }

        await axios.delete(`/api/products/${productId}`, config)
        
        dispatch({
            type:PRODUCT_DELETE_SUCCESS
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: error.response && error.response.data.message ? 
                        error.response.data.message : error.message
        })
    }
} 

export const createProduct = () => async(dispatch, getState) => {
    try {
        dispatch({
            type:PRODUCT_CREATE_REQUEST
        })

        const { userLogin: { userInfo }} = getState()

        const config = {
            headers:{
                'Authorization': `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.post(`/api/products`, {}, config)
        
        dispatch({
            type:PRODUCT_CREATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: error.response && error.response.data.message ? 
                        error.response.data.message : error.message
        })
    }
} 

export const updateProduct = (product) => async(dispatch, getState) => {
    try {
        dispatch({
            type:PRODUCT_UPDATE_REQUEST
        })

        const { userLogin: { userInfo }} = getState()

        const config = {
            headers:{
                'Content-Type':'Application/JSON',
                'Authorization': `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.put(`/api/products/${product._id}`, product, config)
        
        dispatch({
            type:PRODUCT_UPDATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_UPDATE_RESET,
            payload: error.response && error.response.data.message ? 
                        error.response.data.message : error.message
        })
    }
}

export const productCreateReviews = (productId, review) => async(dispatch, getState) => {
    try {
        dispatch({
            type:PRODUCT_CREATE_REVIEW_REQUEST
        })

        const { userLogin: { userInfo }} = getState()

        const config = {
            headers:{
                'Content-Type':'Application/JSON',
                'Authorization': `Bearer ${userInfo.token}`
            }
        }

        await axios.post(`/api/products/${productId}/reviews`, review, config)
        
        dispatch({
            type:PRODUCT_CREATE_REVIEW_SUCCESS,
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAIL,
            payload: error.response && error.response.data.message ? 
                        error.response.data.message : error.message
        })
    }
}

export const getTopProducts = () => async(dispatch, getState) => {
    try {
        dispatch({
            type:PRODUCT_TOP_REQUEST
        })

        const { userLogin: { userInfo }} = getState()

        const config = {
            headers:{
                'Authorization': `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get(`/api/products/top`, config)
        
        dispatch({
            type:PRODUCT_TOP_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_TOP_FAIL,
            payload: error.response && error.response.data.message ? 
                        error.response.data.message : error.message
        })
    }
}