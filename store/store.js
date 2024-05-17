import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice";

const store = configureStore({
	reducer: {
		auth: appSlice,
	},
});

export default store;
