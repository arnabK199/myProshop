import {createStore, combineReducers, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import {productListReducer, productDetailsReducer, productDeleteReducer, productCreateReducer, productUpdateReducer, productCreateReviewReducer, topProductsReducer} from './Reducers/ProductReducers'
import {cartReducer} from './Reducers/CartReducers'
import {orderCreateReducer, orderDetailsReducer, orderPayReducer, listMyOrderReducer, listAllOrdersReducer, orderDeliverReducer} from './Reducers/OrderReducer'
import {userLoginReducer, userRegisterReducer, userProfileReducer, userUpdateProfileReducer, userListReducer, userDeleteReducer, userUpdateReducer} from './Reducers/UserReducer'

const rootReducer = combineReducers({
    productList: productListReducer,
    productDetail: productDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productCreateReview:productCreateReviewReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userProfile: userProfileReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userUpdate: userUpdateReducer, //This Update is for the Admin
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderDeliver: orderDeliverReducer,
    listMyOrder: listMyOrderReducer,
    listAllOrders: listAllOrdersReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    topProducts: topProductsReducer
})


const cartItemsFromStorage = localStorage.getItem('cartItems') ? 
                             JSON.parse(localStorage.getItem('cartItems')) : []
                             
const userInfoFromStorage = localStorage.getItem('userInfo') ? 
JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromStorage = localStorage.getItem('shippngAddress') ? 
JSON.parse(localStorage.getItem('shippngAddress')) : {}

const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage
    },
    userLogin:{
        userInfo: userInfoFromStorage
    }
}
const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk)))

export default store