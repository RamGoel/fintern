import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import dataSlice from "./slices/dataSlice";


export const store=configureStore({
    reducer:{
        auth:authSlice,
        data:dataSlice
    }
})