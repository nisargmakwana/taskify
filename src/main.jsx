import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
	createBrowserRouter,
	RouterProvider,
	Route,
	createRoutesFromElements,
} from "react-router-dom";
import {
	Home,
	Login,
	Signup,
	LandingPage,
	ErrorPage,
	AuthLayout,
} from "./index.js";
import store from "../store/store.js";
import { Provider } from "react-redux";

const router = createBrowserRouter([
	{
		path: "/",
		element: <LandingPage />,
		errorElement: <ErrorPage />,
	},
	{
		path: "/login",
		element: (
			<AuthLayout authentication={false}>
				<Login />
			</AuthLayout>
		),
		errorElement: <ErrorPage />,
	},
	{
		path: "/signup",
		element: (
			<AuthLayout authentication={false}>
				<Signup />
			</AuthLayout>
		),
		errorElement: <ErrorPage />,
	},
	{
		path: "home",
		element: (
			 <AuthLayout authentication>
			<Home />
			</AuthLayout> 
		),

		errorElement: <ErrorPage />,
	},
]);

// const router = createBrowserRouter(
// 	createRoutesFromElements(
// 		<>
// 			<Route path="/" element={<LandingPage />} />
// 			<Route path="/home" element={<Home />} />
// 			<Route path="/login" element={<Login />} />
// 			<Route path="/signup" element={<Signup />} />
// 		</>
// 	)
// );

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);
