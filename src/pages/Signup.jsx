import React from "react";
import { SignupComp } from "../index";
import signup from "../img/signup.svg";

function Signup() {
	return (
		<>
			<div className="md:grid md:grid-cols-[1fr_1.3fr] md:items-center md:justify-items-center">
				<img src={signup} alt="" className=" text-center max-w-screen" />
				<SignupComp />
			</div>
		</>
	);
}

export default Signup;
