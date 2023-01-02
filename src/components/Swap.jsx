import React from "react";

const Swap = ({ tw, swapOn, swapOff, checked, handleChange }) => {
	return (
		<label className={`swap swap-rotate ${tw}`}>
			<input type="checkbox" onChange={(e) => handleChange(e)} />
			<div className="swap-on">{swapOn}</div>
			<div className="swap-off">{swapOff}</div>
		</label>
	);
};

export default Swap;
