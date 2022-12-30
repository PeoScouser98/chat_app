import React from "react";
import Avatar from "./Avatar";

const UserInfo = ({ photoUrl, username, text, status }, { children }) => {
	return (
		<div className="flex items-center gap-4">
			<Avatar imageUrl={photoUrl} isOnline={status} />
			<div>
				<h3 className=" font-bold text-white">{username}</h3>
				{children}
			</div>
		</div>
	);
};

export default UserInfo;
