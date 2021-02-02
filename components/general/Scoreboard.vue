<template>
	<CardItem class="scoreboard">
		<h2>Scoreboard</h2>
		<div class="players">
			<p v-for="player in players.slice(0, 14)" :key="player.username" class="player">
				{{ player.displayName }} <span>{{ player.score }}</span>
			</p>
		</div>
		<p class="info">Um mitzuspielen tippe <b>!join</b> in den Chat.</p>
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
	margin: 0.4em 0;
}

.players {
	margin: 1em 0;
}

.info {
	margin-top: 1em;
}
</style>
