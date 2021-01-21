<template>
	<div class="page">
		<h1>Games</h1>
		<p>Hier kommt die Spiele auswahl hin.</p>
		<CardItem v-for="game in games" :key="game.name" @click="selectGame(game)">
			<h2>{{ game.name }}</h2>
			<p>{{ game.description }}</p>
			<p>Maximale Spieler: {{ game.maxPlayers || 'kein Limit' }}</p>
		</CardItem>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import CardItem from '~/components/general/CardItem.vue';

export default {
	name: 'Games',
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

<style></style>
