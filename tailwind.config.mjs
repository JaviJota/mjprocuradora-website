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
					// Fondos claros, cálidos como la pared del retrato
					cream: '#F7F2EA',
					paper: '#FFFDF8',
					sand: '#EFE6D8',
					// Tinta azul profunda: texto principal y secciones oscuras
					ink: '#16212B',
					navy: '#233441',
					muted: '#56636E',
					// Latón: acento. brass solo como relleno o sobre fondos oscuros;
					// brass-deep es la variante para texto sobre crema/papel (4,7:1)
					brass: '#B8955A',
					'brass-light': '#D9C29A',
					'brass-deep': '#876631',
				},
			},
			fontFamily: {
				sans: ['"Onest Variable"', ...defaultTheme.fontFamily.sans],
				serif: ['"Fraunces Variable"', ...defaultTheme.fontFamily.serif],
			},
			transitionTimingFunction: {
				out: 'cubic-bezier(0.23, 1, 0.32, 1)',
			},
			typography: ({ theme }) => ({
				brand: {
					css: {
						'--tw-prose-body': theme('colors.brand.muted'),
						'--tw-prose-headings': theme('colors.brand.ink'),
						'--tw-prose-bold': theme('colors.brand.ink'),
						'--tw-prose-links': theme('colors.brand.ink'),
						'--tw-prose-bullets': theme('colors.brand.brass'),
					},
				},
			}),
		},
	},
	plugins: [typography],
}
