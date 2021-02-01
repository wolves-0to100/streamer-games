<template>
	<CardItem class="scoreboard">
		<h2>Scoreboard</h2>
		<p v-for="player in players" :key="player.username" class="player">
			{{ player.displayName }} <span>{{ player.score }}</span>
		</p>
	</CardItem>
</template>

<script>
import { mapState } from 'vuex';
import CardItem from '~/components/general/CardItem';

export default {
	name: 'Scoreboard',
	components: {
		CardItem,
	},
	computed: {
		...mapState(['players']),
	},
};
</script>

<style>
.scoreboard {
	width: 400px;
	height: auto;
}
.player {
	display: flex;
	justify-content: space-between;
}
</style>
