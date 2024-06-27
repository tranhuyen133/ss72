import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
// đi tạo kho 
const store = configureStore({
    reducer: {
        userReducer,
    },
});
// xuất kho 
export default store;