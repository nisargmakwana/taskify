import {
	Button,
	LoginComp,
	SignupComp,
	Signup,
	Login,
	LandingPage,
	Home,
	Header,
} from "./index";
import conf from "./conf";
import authService from "../appwrite/authService";
import { useEffect, useState } from "react";
import { login } from "../store/appSlice";
import { useDispatch } from "react-redux";

export default function App() {
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();
	useEffect(async () => {
		const user = await authService.getCurrentUser();
		if (user) {
			dispatch(login(user));
		} else {
			dispatch(logout());
		}
		setLoading(false);
	}, []);
	return (
		<div>
			{/* <SignupComp /> */}
			{/* <LoginComp /> */}
			{/* <Login /> */}
			{/* <LandingPage /> */}
			{/* <Signup /> */}
			{/* <Home /> */}
			{/* <Header /> */}
		</div>
	);
}
