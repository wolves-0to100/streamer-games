<template>
	<div class="gameContainer">
		<h1>Einwohnerzahlen</h1>
		<div v-if="!currentCity" class="settings">
			<p>
				Versuche die Einwohner einer Stadt zu schätzen. Wer am dichtesten dran ist bekommt die meisten Punkte.
				Schreibe deine Antwort als Zahl in den Chat.
			</p>
		</div>
		<div v-else class="game">
			<h2>Wie viele Menschen leben in {{ currentCity.city }}, {{ currentCity.country }}</h2>

			<p v-if="soulutionShown">In {{ currentCity.city }} wohnen {{ currentCity.population }}</p>

			<p v-if="correctGuesses && soulutionShown">Richtig geantwortet haben: {{ correctGuesses }}</p>
			<p>T-00:{{ doubleDigitCountdown }}</p>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import tmi from 'tmi.js';
import cities from '~/assets/games/cities/cityData.json';

export default {
	name: 'PopulationGuess',
	props: {
		isStarted: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			soulutionShown: false,
			leftCities: [],
			currentCity: null,
			countdown: 16,
			interval: null,
			answered: [],
		};
	},
	computed: {
		...mapState(['channelName', 'players']),
		doubleDigitCountdown() {
			return this.countdown.toString().padStart(2, '0');
		},
		correctGuesses() {
			return this.answered?.map((a) => `${a.username} (${a.diff})`).join(', ');
		},
	},
	watch: {
		isStarted() {
			if (this.isStarted) {
				this.answered = [];
				this.soulutionShown = false;
				this.currentCity = this.leftCities.pop();
				this.countdown = 16;
				this.startCountdown();
			}
		},
	},
	mounted() {
		this.leftCities = this.shuffleArray([...cities]);
		const client = new tmi.Client({
			connection: {
				secure: true,
				reconnect: true,
			},
			channels: [this.channelName],
		});

		client.connect();

		client.on('message', (channel, tags, message, self) => {
			if (this.interval && !this.soulutionShown) {
				if (/^\d+$/.test(message)) {
					if (!this.answered.map((a) => a.username).includes(tags['display-name'])) {
						this.answered.push({
							username: tags['display-name'],
							answer: parseInt(message),
							diff: Math.abs(this.currentCity.population - parseInt(message)),
						});
					}
				}
			}
		});
	},
	methods: {
		stopCountdown() {
			clearInterval(this.interval);
			this.interval = null;
			if (!this.soulutionShown) {
				this.updateScore();
				this.soulutionShown = true;
				this.countdown = 10;
				this.startCountdown();
			} else if (this.isStarted) {
				this.answered = [];
				this.soulutionShown = false;
				this.currentCity = this.leftCities.pop();
				this.countdown = 16;
				this.startCountdown();
			}
		},
		updateScore() {
			this.answered
				.sort((a, b) => {
					return a.diff - b.diff;
				})
				.forEach((a, i) => {
					if (i < 10) {
						this.$store.commit('updateScore', {
							username: a.username.toLowerCase(),
							points: 10 - i,
						});
					}
				});
		},
		startCountdown() {
			if (!this.channelName) this.$router.push('/');
			this.interval = setInterval(() => {
				this.countdown--;
				if (this.countdown <= 0) this.stopCountdown();
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

h2 {
	margin-bottom: 2em;
}

p {
	margin: 1em 0;
}
</style>
