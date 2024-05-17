import React from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "../index";
import { Link } from "react-router-dom";

function LandingPage() {
	return (
		<>
			<div className="grid grid-cols-[1fr_0.7fr_1fr] justify-items-center items-center">
				<img
					className="max-w-full block max-h-screen"
					src="welcome-left.png"
					alt="a guy using todo app"
				/>

				<div>
					<div className="border-0 text-center">
						<CardHeader className="mb-[1rem]">
							<img
								className="max-w-[7rem] block self-center"
								src="logo.png"
								alt="logo"
							/>
							<CardTitle className="text-[3rem]">Tasks To Do</CardTitle>
							<CardDescription className="text-[1.3rem] ">
								To Do gives you focus, from work to play.
							</CardDescription>
						</CardHeader>
						<div className="inline-block bg-[#0077b6] hover:bg-[#0096c7] align-items-center px-[1.2rem] py-[0.4rem] rounded-md ">
							<Link to="/login" className="text-white ">
								Get Started!
							</Link>
						</div>
					</div>
				</div>

				<img
					className="max-w-full block max-h-screen"
					src="welcome-right.png"
					alt="a girl using todo app"
				/>
			</div>
		</>
	);
}

export default LandingPage;
