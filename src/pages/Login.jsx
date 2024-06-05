import React from "react";
import { LoginComp } from "../index";
import signin from "../img/login.svg";

function Login() {
	return (
		<div className="md:grid md:grid-cols-[1.3fr_1fr] md:items-center md:justify-items-center">
			<LoginComp />
			<img src={signin} className="max-h-screen text-center" />
		</div>
	);
}

export default Login;
