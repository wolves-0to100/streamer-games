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
		link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
		script: [
			{
				async: true,
				defer: true,
				'data-website-id': 'e906376f-9add-44cb-af90-df7dc63b8ce2',
				src: 'https://umami.wolves.ink/umami.js',
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
	build: {},
};
