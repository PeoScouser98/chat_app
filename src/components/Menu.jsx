import React from "react";

export const MenuItem = ({ children, tw }) => {
	return (
		<li className={`${tw}`}>
			<a>{children}</a>
		</li>
	);
};

export const Menu = ({ children, horizontal, tw }) => {
	return (
		<ul className={`menu rounded-box p-1 ${horizontal ? "menu-horizontal" : "menu-vertical"} ${tw}`}>{children}</ul>
	);
};
