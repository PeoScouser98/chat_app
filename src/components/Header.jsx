import { useContext } from "react";
import { BsCameraVideo, BsPersonPlus } from "react-icons/bs";
import { HiOutlineBars3CenterLeft } from "react-icons/hi2";
import tw from "tailwind-styled-components";
import { ChatContext } from "../Context/ChatContext";
import UserInfo from "./UserInfo";

const AvatarGroup = tw.div`avatar-group -space-x-6 sm:hidden`;
const DrawerToggleLabel = tw.label`btn btn-primary drawer-button hidden sm:inline-flex btn-ghost text-lg`;
const Button = tw.button`btn btn-square btn-ghost text-xl font-semibold`;

const Header = () => {
	const { chatState } = useContext(ChatContext);
	return (
		<header className="flex justify-between items-center px-4 py-3 bg-base-200 shadow-xl">
			<div className="flex items-center gap-4">
				<UserInfo photoUrl={chatState?.user?.photoURL} username={chatState?.user?.displayName}>
					<span>Online</span>
				</UserInfo>
			</div>

			<div>
				<Button aria-hidden>
					<BsCameraVideo />
				</Button>
				<Button aria-hidden>
					<BsPersonPlus />
				</Button>
				<DrawerToggleLabel htmlFor="sidebar-toggle">
					<HiOutlineBars3CenterLeft />
				</DrawerToggleLabel>
			</div>
		</header>
	);
};

export default Header;
