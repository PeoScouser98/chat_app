import { formatRelative } from "date-fns";

const formatDate = (seconds) => {
	let output = "";
	if (seconds) {
		output = formatRelative(new Date(seconds * 1000), new Date());
		output = output.charAt(0).toUpperCase() + output.slice(1);
		return output;
	}
};

export default formatDate;
