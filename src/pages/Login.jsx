import React from "react";
import { LoginComp } from "../index";
import signin from "../img/login.svg";

function Login() {
	return (
		<div className="grid grid-cols-[1.3fr_1fr] items-center justify-items-center">
			<LoginComp />
			<img src={signin} className="max-h-screen" />
		</div>
	);
}

export default Login;
