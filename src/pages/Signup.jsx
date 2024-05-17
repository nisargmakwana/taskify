import React from "react";
import { SignupComp } from "../index";
import signup from "../img/signup.svg";

function Signup() {
	return (
		<>
			<div className="grid grid-cols-[1fr_1.3fr] items-center justify-items-center">
				<img src={signup} alt="" className="max-h-screen" />
				<SignupComp />
			</div>
		</>
	);
}

export default Signup;
