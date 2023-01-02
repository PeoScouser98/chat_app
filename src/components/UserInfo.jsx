import Avatar from "./Avatar";

const UserInfo = ({ avatar, username, text, children, status }) => {
	return (
		<div className="flex items-center gap-4">
			<Avatar imageUrl={avatar} isOnline={status} size={10} />
			<div>
				<h3 className=" font-bold text-white">{username}</h3>
				{children}
			</div>
		</div>
	);
};

export default UserInfo;
