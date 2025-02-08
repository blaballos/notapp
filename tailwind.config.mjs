/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
	  "./src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte}",
	  "./node_modules/flowbite/**/*.js"
	],
	theme: {
	  extend: {},
	},
	safelist: [
		"text-red-500", "border-red-500",
		"text-yellow-500", "border-yellow-500",
		"text-green-500", "border-green-500",
		"hover:cursor-grab",
	  ],
	plugins: [
	  require('flowbite/plugin')
	],
  };