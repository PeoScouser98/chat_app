import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import alias from "@rollup/plugin-alias";

import path, { resolve } from "path";
const rootDir = resolve(__dirname);
export default defineConfig({
	plugins: [
		react(),
		alias({
			entries: [
				{
					find: "@",
					replacement: resolve(rootDir, "src"),
				},
			],
		}),
	],
	resolve: {
		alias: {
			"@/*": path.resolve(__dirname, "./src/"),
		},
	},

	server: {
		port: 3000,
		hmr: { overlay: false },
	},
});
