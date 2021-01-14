<template>
	<div class="container">
		<div>
			<h1>Twitch Games</h1>
			<p>Wilkommen bei Twitch Games. Hier hast du die Möglichkeit mit deinem Chat Spiele zu spielen.</p>

			<div class="channelInputWrapper">
				<input
					id="channelName"
					v-model="channelName"
					class="input"
					placeholder="0to100ink"
					@keydown.enter="saveChannel"
				/>
				<label for="channelName">Twitch Channel Name</label>
			</div>
		</div>
	</div>
</template>

<script>
export default {};
</script>

<style>
.container {
	margin: 0 auto;
	min-height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
}

.channelInputWrapper {
	margin: 2em 0;
}
</style>
