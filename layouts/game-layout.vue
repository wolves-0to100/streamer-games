<template>
	<div>
		<page-header></page-header>
		<Nuxt />
	</div>
</template>

<script>
import tmi from 'tmi.js';
import { mapState } from 'vuex';
import PageHeader from '~/components/general/PageHeader';

export default {
	components: {
		PageHeader,
	},
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

<style lang="scss" scoped>
.page {
	width: 100%;
	margin: 0 auto;
	padding: 60px 10%;
	max-width: 1080px;
	@media (min-width: 1600px) {
		padding: 60px 160px;
	}
}
</style>
