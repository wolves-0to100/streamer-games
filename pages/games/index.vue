<template>
	<div class="page">
		<main>
			<h1>Spiele</h1>
			<p class="description">
				Hier hast du die Auswahl von verschiednen Spielen, welche du mit deinem Twitch Chat spielen kannst.
			</p>
			<p>Tippt <b>!join</b> in den Chat um mit zu spielen.</p>
			<div class="games">
				<game-card v-for="game in games" :key="game.name" :game="game" @click="selectGame(game)" />
			</div>
		</main>
		<aside>
			<scoreboard />
			<button @click="resetScore">Reset</button>
		</aside>
	</div>
</template>

<script>
import { mapState } from 'vuex';

import GameCard from '~/components/general/GameCard.vue';
import Scoreboard from '~/components/general/Scoreboard';

export default {
	name: 'Games',
	components: { Scoreboard, GameCard },
	layout: 'game-layout',
	computed: {
		...mapState(['games']),
	},
	methods: {
		selectGame(game) {
			this.$router.push('/games/' + game.slug);
		},
		resetScore() {
			this.$store.commit('resetScore');
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
	padding: 60px 80px;
	margin: 0 auto;
	max-width: 1800px;
}

main {
	width: 100%;
	.description {
		margin: 1em 0;
		max-width: 460px;
	}
}

.games {
	margin: 20px 0;
	display: grid;
	grid-gap: 12px;
	grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

aside {
	position: sticky;
	top: 120px;
}

button {
	margin: 1em 0;
}
</style>
