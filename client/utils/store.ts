import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"
import movieReducer from "./movieSlice"
import theaterReducer from "./theaterSlice"
import adminReducer from "./adminSlice"
import showReducer from "./showSlice"
export let store=configureStore({
    reducer:{
        auth:authReducer,
        movie:movieReducer,
        theater:theaterReducer,
        admin: adminReducer,
        show:showReducer
    }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;