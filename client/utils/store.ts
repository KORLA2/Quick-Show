import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"
import movieReducer from "./movieSlice"
import theaterReducer from "./theaterSlice"
export let store=configureStore({
    reducer:{
        auth:authReducer,
        movie:movieReducer,
        theater:theaterReducer
    }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;