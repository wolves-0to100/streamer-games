<template>
	<CardItem class="scoreboard">
		<h2>Scoreboard</h2>
		<div class="players">
			<p v-for="player in playersByScore" :key="player.username" class="player">
				{{ player.displayName }} <span>{{ player.score }}</span>
			</p>
		</div>
		<p class="info">
			Aktuell spielen <b>{{ playersByScore.length }}</b> Zuschauer mit.<br />
			Um mitzuspielen tippe <b>!join</b> in den Chat.
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
	props: {
		displayLimit: {
			type: Number,
			default: 14,
		},
	},
	computed: {
		...mapState(['players']),
		playersByScore() {
			return [...this.players].sort((a, b) => b.score - a.score).slice(0, this.displayLimit);
		},
	},
};
</script>

<style lang="scss" scoped>
.scoreboard {
	width: 400px;
	height: auto;
}
.player {
	display: flex;
	justify-content: space-between;
	margin: 0.4em 0;
	&:nth-child(even) {
		color: #d90000;
	}
}

.players {
	margin: 1em 0;
}

.info {
	margin-top: 1em;
}
</style>
