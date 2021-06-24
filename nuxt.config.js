export default {
	// Target (https://go.nuxtjs.dev/config-target)
	target: 'static',

	// Global page headers (https://go.nuxtjs.dev/config-head)
	head: {
		title: 'Streamer Games',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{
				hid: 'description',
				name: 'description',
				content:
					'Wilkommen bei Streamer Games. Hier hast du die Möglichkeit mit deinem Twitch Chat Spiele zu spielen.',
			},
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
			{ href: 'https://api.mapbox.com/mapbox-gl-js/v2.1.1/mapbox-gl.css', rel: 'stylesheet' },
		],
		script: [
			{
				defer: true,
				'data-cf-beacon': '{"token": "41df499de7a5468e9e4cca186648e8cd"}',
				src: 'https://static.cloudflareinsights.com/beacon.min.js',
			},
		],
		htmlAttrs: {
			lang: 'de',
		},
	},

	// Global CSS (https://go.nuxtjs.dev/config-css)
	css: ['~/assets/styles/main.scss', '~/assets/styles/fonts.css'],

	// Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
	plugins: [],

	// Auto import components (https://go.nuxtjs.dev/config-components)
	components: true,

	// Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
	buildModules: [
		// https://go.nuxtjs.dev/eslint
		'@nuxtjs/eslint-module',
		'@nuxtjs/color-mode',
	],

	// Modules (https://go.nuxtjs.dev/config-modules)
	modules: [
		// https://go.nuxtjs.dev/pwa
		'@nuxtjs/pwa',
	],

	// Build Configuration (https://go.nuxtjs.dev/config-build)
	build: {
		transpile: ['gsap'],
	},
};
