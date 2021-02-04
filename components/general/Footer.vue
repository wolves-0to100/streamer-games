<template>
	<footer>
		<div>
			<h2>Social</h2>
			<a href="https://twitter.com/marcelxpfeifer" rel="noopener noreferrer"> Twitter </a>
			<a href="https://www.twitch.tv/0to100ink" rel="noopener noreferrer"> Twitch </a>
			<a href="https://gitlab.com/0to100" rel="noopener noreferrer"> GitLab </a>
			<a href="https://instagram.com/marcelxpfeifer" rel="noopener noreferrer"> Instagram </a>
		</div>
		<div>
			<h2>Seiten</h2>
			<nuxt-link to="/">Startseite</nuxt-link>
			<nuxt-link to="/games/">Games</nuxt-link>
			<nuxt-link to="/scoreboard/">Scoreboard</nuxt-link>
		</div>
		<div>
			<h2>Rechtliches</h2>
			<nuxt-link to="https://0to100.ink/datenschutz/">Datenschutz</nuxt-link>
			<nuxt-link to="https://0to100.ink/impressum/">Impressum</nuxt-link>
		</div>
		<div class="wolves">
			<p>Made live on <a href="https://0to100.ink">0to100</a></p>
		</div>
	</footer>
</template>

<script>
export default {
	name: 'Footer',
};
</script>

<style lang="scss" scoped>
footer {
	display: grid;
	grid-gap: 24px;
	grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
	margin: 4em auto 2em;
	padding: 0 80px;
	max-width: 1360px;
	font-size: 0.9em;
	h2 {
		margin-bottom: 0.5em;
	}
	a {
		display: block;
		font-weight: 400;
		padding: 2px 0;
		&:last-child {
			margin: 0;
		}
	}
	div .nuxt-link-active {
		border-bottom: none;
	}
	@media (max-width: 600px) {
		padding: 0 40px;
	}
}

.wolves {
	align-self: flex-end;
	a {
		display: inline;
		font-weight: 600;
	}
}
</style>
