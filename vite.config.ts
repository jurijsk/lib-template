/// <reference types="vitest" />
import { resolve } from 'path'
import { defineConfig } from "vite";
import packageJson from "./package.json";
import dts from 'vite-plugin-dts'

const packageName = packageJson.name;


export default defineConfig({
	root: "sources",
	plugins: [
		dts({
			outDir: 'dist', // dts.root + 'dist' => where we need to rollup.
			root: "../", //vite.root + ../ = ./ = (dts.root)
			staticImport: true,
			insertTypesEntry: true,
			rollupTypes: true
		})
	],
	build: {
		outDir: '../dist',
		lib: {
			entry: resolve(__dirname, "sources/index.ts"),
			name: 'index',
			'fileName': 'index'
		},
	},
	test: {},
	resolve: {
		alias: [{ find: packageName, replacement: resolve(__dirname, 'index.ts') }]
	}
});