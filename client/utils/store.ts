import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"
import movieReducer from "./movieSlice"

export let store=configureStore({
    reducer:{
        auth:authReducer,
        movie:movieReducer
    }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;