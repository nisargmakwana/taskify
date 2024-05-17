import React, { useEffect, useState } from "react";
import { Header, Main } from "../index";
import { useDispatch, useSelector } from "react-redux";
import authService from "../../appwrite/authService";
import { login } from "../../store/appSlice";

function Home() {
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();

	useEffect(() => {
		authService
			.getCurrentUser()
			.then((userData) => {
				if (userData) {
					dispatch(login(userData));
				} else {
					dispatch(logout());
				}
			})
			.finally(() => setLoading(false));
	}, []);

	const user = useSelector((state) => {
		if (state.auth.userData) {
			return state.auth.userData.name;
		}
	});

	return loading ? (
		<div>Loading...</div>
	) : (
		<>
			<Header user={user} />
			<Main />
		</>
	);
}

export default Home;
