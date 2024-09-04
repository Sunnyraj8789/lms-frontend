import { configureStore } from "@reduxjs/toolkit";

import AuthSliceReducer from "./Slices/AuthSlice";
import courseSliceReducer from './Slices/CourseSlice';
import razorpaySliceReducer from './Slices/RazorpaySlice';

const store=configureStore({
    reducer:{
        auth:AuthSliceReducer,
        course:courseSliceReducer,
        razorpay: razorpaySliceReducer
    },
    devTools:true
});

export default store;