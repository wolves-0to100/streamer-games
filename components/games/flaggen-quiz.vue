<template>
	<div class="gameContainer">
		<h1>Flaggen Quiz</h1>
		<div v-if="currentCountry" class="game">
			<h2>
				<span>Ländername: </span>
				<span v-if="soulutionsShown">{{ currentCountry.name }} ({{ currentCountry.de }})</span>
				<span v-else>?</span>
			</h2>

			<div class="imageWrapper">
				<img :src="require('~/assets/games/flaggen-quiz/flags/' + currentCountry.code + '.svg')" />
			</div>

			<p>T-00:{{ doubleDigitCountdown }}</p>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import tmi from 'tmi.js';
import countries from '~/assets/games/flaggen-quiz/countries.json';

export default {
	name: 'FlaggenQuiz',
	props: {
		isStarted: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			soulutionsShown: false,
			leftCountries: [],
			currentCountry: null,
			countdown: 16,
			interval: null,
		};
	},
	computed: {
		...mapState(['channelName', 'players']),
		playersByScore() {
			return [...this.players].sort((a, b) => b.score - a.score).slice(0, 6);
		},
		doubleDigitCountdown() {
			return this.countdown.toString().padStart(2, '0');
		},
	},
	watch: {
		isStarted() {
			if (this.isStarted) {
				this.soulutionsShown = false;
				this.currentCountry = this.leftCountries.pop();
				this.countdown = 16;
				this.startCountdown();
			}
		},
	},
	mounted() {
		this.leftCountries = this.shuffleArray([...countries]);
		const client = new tmi.Client({
			connection: {
				secure: true,
				reconnect: true,
			},
			channels: [this.channelName],
		});

		client.connect();

		client.on('message', (channel, tags, message, self) => {
			if (this.interval && !this.soulutionsShown) {
				if (
					message.toLowerCase() === this.currentCountry.name.toLowerCase() ||
					message.toLowerCase() === this.currentCountry.code.toLowerCase() ||
					message.toLowerCase() === this.currentCountry.de.toLowerCase()
				) {
					this.$store.commit('updateScore', {
						username: tags.username,
						points: this.countdown,
					});
				}
			}
		});
	},
	methods: {
		stopCountdown() {
			clearInterval(this.interval);
			this.interval = null;
			if (!this.soulutionsShown) {
				this.soulutionsShown = true;
				this.countdown = 10;
				this.startCountdown();
			} else if (this.isStarted) {
				this.soulutionsShown = false;
				this.currentCountry = this.leftCountries.pop();
				this.countdown = 16;
				this.startCountdown();
			}
		},
		startCountdown() {
			if (!this.channelName) this.$router.push('/');
			this.interval = setInterval(() => {
				this.countdown--;
				if (this.countdown === 0) this.stopCountdown();
			}, 1000);
		},
		shuffleArray(arr) {
			return arr.sort(() => Math.random() - 0.5);
		},
	},
};
</script>

<style lang="scss" scoped>
.gameContainer {
	width: 100%;
}
h1 {
	margin: 0 0 0.8em;
}

.imageWrapper {
	width: 100%;
	margin: 1em 0;
}

img {
	display: block;
	width: 100%;
	max-width: 800px;
}
</style>
