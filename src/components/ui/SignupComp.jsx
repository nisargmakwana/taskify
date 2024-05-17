import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import authService from "../../../appwrite/authService";
import {
	Card,
	CardHeader,
	CardFooter,
	CardTitle,
	CardDescription,
	CardContent,
	Label,
	Input,
	Button,
	buttonVariants,
} from "../../index";
import { Link } from "react-router-dom";

function SignupComp() {
	const { register, handleSubmit } = useForm();
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const signup = async (data) => {
		setError("");
		try {
			const user = await authService.createAccount(data);
			if (user) {
				navigate("/login");
			}
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<>
			<Card className=" w-[28rem] mx-auto">
				<CardHeader className="text-center">
					<CardTitle className="mb-[1rem] text-[2rem]">Sign Up</CardTitle>
					<CardDescription className="text-[0.8rem]">
						Just a few quick things to get started!
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit(signup)}>
						<Label className="ml-[0.3rem]" htmlFor="name">
							Name
						</Label>
						<Input
							id="name"
							type="text"
							className="mb-[1rem] w-full"
							placeholder="name"
							{...register("name", {
								required: true,
							})}
						/>
						<Label className="ml-[0.3rem]" htmlFor="email">
							Email Address
						</Label>
						<Input
							id="email"
							placeholder="Email address"
							type="email"
							{...register("email", { required: true })}
							className="mb-[1rem] w-full"></Input>
						<Label className="ml-[0.3rem]" htmlFor="password">
							Password
						</Label>
						<Input
							id="password"
							placeholder="Password"
							type="password"
							{...register("password", {
								required: true,
							})}
							className="mb-[2rem] w-full"></Input>
						<Button
							type="submit"
							className="w-full bg-[#0077b6] hover:bg-[#0096c7]">
							Sign up
						</Button>
					</form>
				</CardContent>
				<div className="mb-[3rem] text-[0.9rem] text-center text-slate-900">
					Already a member?{" "}
					<Link to="/login" className="font-semibold underline">
						Log in!
					</Link>
				</div>
			</Card>
		</>
	);
}

export default SignupComp;
