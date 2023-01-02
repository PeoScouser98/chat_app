import React from "react";

const Avatar = ({ imageUrl, isOnline, size }) => {
	return (
		<div className={isOnline ? "avatar online" : "avatar"}>
			<div className={`rounded-full`} style={{ width: size * 0.25 + "rem", height: size * 0.25 + "rem" }}>
				<img src={imageUrl} />
			</div>
		</div>
	);
};

export default Avatar;
