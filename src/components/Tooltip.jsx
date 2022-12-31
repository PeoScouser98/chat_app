import React from "react";
import tw from "tailwind-styled-components";

const StyledTooltip = tw.div`tooltip`;

const Tooltip = ({ position, dataTip, children }) => {
	return (
		<StyledTooltip className={`tooltip-${position}`} data-tip={dataTip}>
			{children}
		</StyledTooltip>
	);
};

export default Tooltip;
