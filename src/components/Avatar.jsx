import React from "react";

const Avatar = ({ imageUrl, isOnline }) => {
	return (
		<div className={`avatar ${isOnline && "online"}`}>
			<div className="w-12 h-12 rounded-full">
				<img src={imageUrl} />
			</div>
		</div>
	);
};

export default Avatar;
