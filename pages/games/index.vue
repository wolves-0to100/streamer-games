<template>
	<div class="page">
		<h1>Games</h1>
		<p>Hier kommt die Spiele auswahl hin.</p>
		<div class="games">
			<CardItem v-for="game in games" :key="game.name" class="game" @click="selectGame(game)">
				<h2>{{ game.name }}</h2>
				<p>{{ game.description }}</p>
				<p>Maximale Spieler: {{ game.maxPlayers || 'kein Limit' }}</p>
			</CardItem>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import CardItem from '~/components/general/CardItem.vue';

export default {
	name: 'Games',
	layout: 'game-layout',
	components: { CardItem },
	computed: {
		...mapState(['games']),
	},
	methods: {
		selectGame(game) {
			this.$router.push('/games/' + game.slug);
		},
	},
};
</script>

<style lang="scss" scoped>
.games {
	margin: 20px 0;
	display: grid;
	grid-gap: 12px;
	grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}
</style>
