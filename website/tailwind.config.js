/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
		'./app/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		fontFamily:{
			'lexend': ['Lexend','sans-serif']
		},
		colors: {
			'main': "#005F9F",
			'secondary': "#FFFFFF",
			'base': "#E2E1E5",
		},
		screens: {
			'small':{
					'max':'800px'
			}
	 },
		extend: {
			animation: {
				'spin-slow': 'spin 3s linear infinite',
			}
		},
	},
	plugins: [],
}
