import React from "react";
import { useContext } from "react";
import tw from "tailwind-styled-components";
import { AppContext } from "../../context/AppContext";
import { Menu, MenuItem } from "../Menu";
import Tooltip from "../Tooltip";
import UserInfo from "../UserInfo";
import { BsCameraVideo, BsPersonPlus } from "react-icons/bs";
import { HiOutlineBars3BottomRight } from "react-icons/hi2";

const Navbar = tw.nav`navbar bg-base-300`;
const NavStart = tw.div`flex-1`;
const NavEnd = tw.div`flex-none px-4`;

const ChatHeader = () => {
	const { currentChat, makeVideoCall } = useContext(AppContext);

	return (
		<Navbar>
			<NavStart className="flex-1">
				<UserInfo avatar={currentChat?.chattingUser?.avatar} username={currentChat?.chattingUser?.username} />
			</NavStart>
			<NavEnd>
				<Menu horizontal={true}>
					<Tooltip dataTip={"Video call"} position="bottom">
						<MenuItem callback={() => makeVideoCall(currentChat)}>
							<button>
								<BsCameraVideo aria-hidden className="text-xl text-base-content" />
							</button>
						</MenuItem>
					</Tooltip>
					<Tooltip dataTip={"Add Friend"} position="bottom">
						<MenuItem>
							<BsPersonPlus aria-hidden className="text-xl text-base-content" />
						</MenuItem>
					</Tooltip>
					<MenuItem tw="hidden sm:inline-flex md:inline-flex text-xl">
						<label htmlFor="sidebar-toggle">
							<HiOutlineBars3BottomRight aria-hidden={true} />
						</label>
					</MenuItem>
				</Menu>
			</NavEnd>
		</Navbar>
	);
};

export default ChatHeader;
