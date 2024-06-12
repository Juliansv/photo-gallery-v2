import type { Config } from "tailwindcss";

const config: Config = {
	content: ["./app/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			animation: {
				"pulse-slow": "pulse 40s infinite",
			},
		},
	},
};

module.exports = config;
