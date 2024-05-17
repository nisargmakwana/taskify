import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
	Input,
	Button,
	buttonVariants,
	Card,
	CardHeader,
	CardFooter,
	CardTitle,
	CardDescription,
	CardContent,
	Label,
} from "../../index";
import { login as authLogin } from "../../../store/appSlice";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import authService from "../../../appwrite/authService";

function LoginComp() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [error, setError] = useState(null);
	const { register, handleSubmit } = useForm();

	const loginFun = async (data) => {
		setError("");
		try {
			const session = await authService.login(data);
			if (session) {
				const loggedUser = await authService.getCurrentUser();
				console.log(loggedUser);
				if (loggedUser) {
					dispatch(authLogin(loggedUser));
				}
				navigate("/home");
			}
		} catch (error) {
			setError(error.message);
			console.log(error);
		}
	};

	return (
		<>
			<Card className=" w-[25rem] mx-auto">
				<CardHeader className="text-center">
					<CardTitle className="mb-[1rem] text-[2rem]">Sign In</CardTitle>
					<CardDescription className="text-[0.8rem]">
						Simplify your workflow and boost your productivity with an amazing
						<strong> ToDo app</strong>. Get started for free.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit(loginFun)}>
						<Label className="ml-[0.3rem]" htmlFor="email">
							Email Address
						</Label>
						<Input
							id="email"
							placeholder="Email address"
							type="email"
							{...register("email", { required: true })}
							className=" w-full mb-[1rem]"></Input>
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
							Login
						</Button>
					</form>
				</CardContent>
				<div className="mb-[3rem]  text-center text-slate-900">
					<p className="text-[0.9rem]">
						Not a member?{" "}
						<Link to="/signup" className="font-semibold underline">
							Register now!
						</Link>
					</p>
					{error && <p className="text-red-600 mt-8 text-center">{error}</p>}
				</div>
			</Card>
		</>
	);
}

export default LoginComp;

// https://coolors.co/palette/03045e-023e8a-0077b6-0096c7-00b4d8-48cae4-90e0ef-ade8f4-caf0f8
