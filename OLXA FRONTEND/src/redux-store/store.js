import {configureStore} from '@reduxjs/toolkit'
import userReducer from './userSlice'
import productReducer from './productsSlice'
import imageSlice from './ShowImageSlice'
export const store  = configureStore({
  reducer:{
    user:userReducer,
    product:productReducer,
    image:imageSlice

  }
})