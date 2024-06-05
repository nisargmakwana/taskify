import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../index";
import { useDispatch, useSelector } from "react-redux";
import authService from "../../../appwrite/authService";
import { logout } from "../../../store/appSlice";

function Header({ user }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const logoutHandler = () => {
		authService.logout().then(() => {
			dispatch(logout());
			navigate("/login");
		});
	};
	return (
		<>
			<nav className="grid grid-cols-[1.2fr_3.5fr_1fr_0.2fr] text-white bg-[#0077B6] items-center justify-items-center">
				<div className=" py-[0.8rem]">
					<Link
						to="/"
						className="text-white font-semibold text-[1.2rem] hover:underline">
						Taskify: To Do
					</Link>
				</div>
				{/* <div>
					<form className="flex">
						<Input
							type="search"
							placeholder="Search"
							className={`h-[1.7rem] w-[25rem] p-[1rem] text-slate-950 rounded-md`}
						/>
					</form>
				</div> */}
				<div className="flex gap-[3rem] items-center">
					<p className="text-[1rem]">Welcome {user}!</p>
				</div>
				<div>
					<button
						className="flex items-center mr-[0.3rem]"
						onClick={logoutHandler}>
						<ion-icon name="log-out-outline" size="large"></ion-icon>
					</button>
				</div>
			</nav>
		</>
	);
}

export default Header;
