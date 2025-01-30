/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
	  "./src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte}",
	  "./node_modules/flowbite/**/*.js"
	],
	theme: {
	  extend: {},
	},
	plugins: [
	  require('flowbite/plugin')
	],
  };