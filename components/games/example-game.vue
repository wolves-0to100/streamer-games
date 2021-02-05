<template>
	<div class="gameContainer">
		<h1>Example Game</h1>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import tmi from 'tmi.js';

export default {
	name: 'FlaggenQuiz',
	props: {
		isStarted: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {};
	},
	computed: {
		...mapState(['channelName', 'players']),
	},
	watch: {
		isStarted() {
			if (this.isStarted) {
				// Streamer pressed start button
			}
		},
	},
	mounted() {
		const client = new tmi.Client({
			connection: {
				secure: true,
				reconnect: true,
			},
			channels: [this.channelName],
		});

		client.connect();

		client.on('message', (channel, tags, message, self) => {
			// Message in chat
		});
	},
	methods: {},
};
</script>

<style lang="scss" scoped>
.gameContainer {
	width: 100%;
}
h1 {
	margin: 0 0 0.8em;
}
</style>
