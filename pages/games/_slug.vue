<template>
	<div class="page">
		<component :is="currentGame" :is-started="gameIsStarted" @toggle="toggleGameState"></component>
		<aside>
			<Scoreboard />
			<div class="controls">
				<button v-if="gameIsStarted" @click="toggleGameState">Stop</button>
				<button v-else @click="toggleGameState">Start</button>
				<nuxt-link to="/games" class="button">Zurück</nuxt-link>
			</div>
		</aside>
	</div>
</template>

<script>
import Scoreboard from '~/components/general/Scoreboard';

export default {
	name: 'Game',
	layout: 'game-layout',
	components: {
		Scoreboard,
	},
	data() {
		return {
			gameIsStarted: false,
		};
	},
	computed: {
		currentGame() {
			return () => import(`~/components/games/${this.$route.params.slug}.vue`);
		},
	},
	methods: {
		toggleGameState() {
			this.gameIsStarted = !this.gameIsStarted;
		},
	},
};
</script>

<style lang="scss" scoped>
.page {
	display: flex;
	justify-content: center;
	align-items: flex-start;
	gap: 12px;
	padding: 20px 80px;
	margin: 0 auto;
	max-width: 1800px;
}

aside {
	position: sticky;
	top: 120px;
}

.controls {
	margin: 12px 0;
}
</style>
