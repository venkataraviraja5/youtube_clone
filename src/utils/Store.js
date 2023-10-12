import { configureStore } from "@reduxjs/toolkit";
import YoutubeSlice from "./YoutubeSlice";

export const Store = configureStore({
    reducer:{
        app:YoutubeSlice
    }
})