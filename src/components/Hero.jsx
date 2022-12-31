import React from "react";
import { HiOutlineBars3BottomRight } from "react-icons/hi2";
import { DrawerToggleButton } from "../pages";

const Default = () => {
	return (
		<div className="hero min-h-screen bg-base-200 bg-[url('./chatting.webp')] bg-cover  bg-no-repeat">
			<div className="hero-overlay"></div>
			<DrawerToggleButton htmlFor="sidebar-toggle" className="absolute top-2 right-2">
				<HiOutlineBars3BottomRight aria-hidden />
			</DrawerToggleButton>
			<div className="hero-content text-center text-white">
				<div className="max-w-md">
					<h1 className="text-5xl font-bold">HELLO THERE</h1>
					<p className="py-6 text-xl">
						Getting start chat with your others by selecting available chat or creating a new one
					</p>
				</div>
			</div>
		</div>
	);
};

export default Default;
