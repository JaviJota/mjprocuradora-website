import typography from '@tailwindcss/typography'
import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	future: {
		// Evita estados hover "pegados" al tocar en móviles
		hoverOnlyWhenSupported: true,
	},
	theme: {
		extend: {
			colors: {
				brand: {
					navy: '#2A3B47',
					ink: '#1e2a33',
					gold: '#bfa76a',
					'gold-light': '#d4c08d',
					'gold-dark': '#a18550',
				},
			},
			fontFamily: {
				sans: ['"Onest Variable"', ...defaultTheme.fontFamily.sans],
			},
			transitionTimingFunction: {
				out: 'cubic-bezier(0.23, 1, 0.32, 1)',
			},
		},
	},
	plugins: [typography],
}
