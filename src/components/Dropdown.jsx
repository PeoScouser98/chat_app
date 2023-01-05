import React from "react";
import tw from "tailwind-styled-components";

const DropdownWrapper = tw.div`dropdown dropdown-hover dropdown-top dropdown-end`;

const Dropdown = ({ dropdownButtonElement, dropdownContentElement, buttonStyle, spacingY, spacingX }) => {
	return (
		<DropdownWrapper>
			<label tabIndex={0} class={`${buttonStyle}`}>
				{dropdownButtonElement}
			</label>
			<div className={`dropdown-content w-fit py-${spacingY} px-${spacingX}`}>{dropdownContentElement}</div>
		</DropdownWrapper>
	);
};

export default Dropdown;
