/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		screens: {
			sm: { min: "375px", max: "767px" },

			md: { min: "768px", max: "1023px" },

			lg: { min: "1024px", max: "1365" },

			xl: { min: "1366px", max: "1919px" },

			xxl: { min: "1920px" },
		},
		extend: {},
	},
	plugins: [require("daisyui")],
};
