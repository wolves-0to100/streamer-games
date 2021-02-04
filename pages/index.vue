<template>
	<div class="page">
		<main>
			<h1>Streamer Games 🎮</h1>
			<p>Wilkommen bei Streamer Games. Hier hast du die Möglichkeit mit deinem Twitch Chat Spiele zu spielen.</p>

			<div class="channelInputWrapper">
				<label for="channelName">Gib hier deinen Kanalnamen ein:</label>
				<input
					id="channelName"
					v-model="channelName"
					class="input"
					placeholder="0to100ink"
					@keydown.enter="saveChannel"
				/>
				<button @click="saveChannel">Zu den Spielen</button>
			</div>
		</main>
	</div>
</template>

<script>
export default {
	name: 'Homepage',
	data() {
		return {
			channelName: '',
		};
	},
	methods: {
		saveChannel() {
			if (this.channelName) {
				this.$store.commit('setChannelName', this.channelName);
				this.$router.push('/games');
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.page {
	display: flex;
	justify-content: center;
	align-items: center;
}
main {
	max-width: 600px;
}
.channelInputWrapper {
	margin: 2em 0;
	label {
		margin-bottom: 0.2em;
	}
}
</style>
