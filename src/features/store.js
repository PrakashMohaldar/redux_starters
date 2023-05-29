import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./movies/movieSlice.js"

// import reducers
export const store = configureStore({
    reducer:{
        movies:moviesReducer
    }
})
