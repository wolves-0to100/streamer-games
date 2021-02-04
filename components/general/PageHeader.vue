<template>
	<header id="header">
		<div class="wrapper">
			<nuxt-link to="/" class="logo">
				<img :src="logoLink" alt="0to100 Logo" />
			</nuxt-link>
			<nav>
				<nuxt-link to="/games/">Spiele</nuxt-link>
				<nuxt-link to="/scoreboard/">Scoreboard</nuxt-link>
				<button aria-label="Color Mode" @click="toggleColorMode">
					<svg
						fill="none"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						viewBox="0 0 24 24"
						:stroke="currentColor"
						class="w-6 h-6"
					>
						<path
							d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
						></path>
					</svg>
				</button>
			</nav>
		</div>
	</header>
</template>

<script>
export default {
	name: 'PageHeader',
	computed: {
		currentColor() {
			return this.$colorMode.value === 'light' ? 'rgba(0, 0, 0, 0.8)' : '#ebf4f1';
		},
		logoLink() {
			return this.$colorMode.value === 'light' ? '/LogoDark.svg' : '/Logo.svg';
		},
	},
	methods: {
		toggleColorMode() {
			if (this.$colorMode.value === 'light') {
				this.$colorMode.preference = 'dark';
			} else {
				this.$colorMode.preference = 'light';
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.dark-mode #header {
	background: rgba(26, 26, 26, 0.6);
	a.nuxt-link-active {
		border-bottom: 1px solid #e0e0e0;
	}
	.wrapper .logo {
		border-bottom: none;
	}
}

#header {
	display: flex;
	justify-content: center;
	position: sticky;
	top: 0;
	width: 100%;
	font-weight: 600;
	padding: 0 80px;
	height: 100px;
	backdrop-filter: blur(8px);
	background: rgba(255, 255, 255, 0.6);
	z-index: 1;
	perspective: 1000px;

	@media (max-width: 600px) {
		height: 80px;
		padding: 0 20px;
	}

	.wrapper {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 100%;
		width: 100%;
		max-width: 1200px;

		.logo {
			border-bottom: none;
		}
	}

	img {
		cursor: pointer;
		height: 30px;
		width: auto;
		@media (max-width: 600px) {
			height: 20px;
		}
	}

	nav a {
		margin: 0 10px;
	}

	a {
		padding: 6px 0;
		text-decoration: none;
		&.nuxt-link-active {
			border-bottom: 1px solid #1a1a1a;
		}
	}
	button {
		padding: 0;
		width: 20px;
		height: 20px;
		background-color: transparent;
		svg {
			width: 100%;
			height: 100%;
			transition: stroke 200ms ease-in-out;
			&:hover {
				stroke: #d90000;
			}
		}
	}
}
</style>
