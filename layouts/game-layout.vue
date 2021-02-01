<template>
	<div>
		<page-header></page-header>
		<div class="container">
			<Nuxt />
			<Scoreboard />
		</div>
	</div>
</template>

<script>
import tmi from 'tmi.js';
import { mapState } from 'vuex';
import Scoreboard from '~/components/general/Scoreboard.vue';

export default {
	name: 'GameLayout',
	components: { Scoreboard },
	computed: {
		...mapState(['channelName', 'players']),
	},
	mounted() {
		if (!this.channelName) this.$router.push('/');
		const client = new tmi.Client({
			connection: {
				secure: true,
				reconnect: true,
			},
			channels: [this.channelName],
		});

		client.connect();

		client.on('message', (channel, tags, message, self) => {
			if (message.startsWith('!join')) {
				if (this.players.findIndex((p) => p.username === tags.username) !== -1) return;
				this.$store.commit('addPlayer', {
					username: tags.username,
					score: 0,
					displayName: tags['display-name'],
				});
			}
		});
	},
};
</script>

<style lang="scss">
.page {
	width: 100%;
	margin: 0 auto;
	padding: 100px 10%;
	min-height: 100vh;
	max-width: 1080px;
	@media (min-width: 1600px) {
		padding: 100px 160px;
	}
}

.container {
	display: flex;
	justify-content: center;
	align-items: flex-start;
	gap: 12px;
	padding: 20px 80px;
	margin: 0 auto;
	max-width: 1800px;
}

.scoreboard {
	position: sticky;
	top: 0;
}
</style>
