import { configureStore } from "@reduxjs/toolkit";

import {commonSlice, postSlice} from "./slice";

const store = configureStore({
    reducer:{
        common : commonSlice.reducer,
        post : postSlice.reducer
    }
});

export default store;
