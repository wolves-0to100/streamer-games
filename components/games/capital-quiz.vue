<template>
	<div class="gameContainer">
		<h1>Hauptstadtjungel</h1>
		<div v-if="!currentCapital" class="settings">
			<p>
				Hier geht es darum die Haupstadt zu einem Land zu nennen. Wenn du die Antwort kennst, tippe sie in den
				Chat. Dabei sollte deine Nachricht nur den Namen der Stadt beinhalten. (Auf Deutsch)
			</p>
		</div>
		<div v-else class="game">
			<h2>Wie heißt die Haupstadt von {{ currentCapital.country }}</h2>

			<p v-if="soulutionShown">Die Hauptstadt ist: {{ currentCapital.city }}</p>

			<p v-if="correctGuesses && soulutionShown">Richtig geantwortet haben: {{ correctGuesses }}</p>
			<p>T-00:{{ doubleDigitCountdown }}</p>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import tmi from 'tmi.js';
import capitals from '~/assets/games/capitals/capitalsData.json';

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
			soulutionShown: false,
			leftCapitals: [],
			currentCapital: null,
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
			return this.answered.join(', ');
		},
	},
	watch: {
		isStarted() {
			if (this.isStarted) {
				this.answered = [];
				this.soulutionShown = false;
				this.currentCapital = this.leftCapitals.pop();
				this.countdown = 16;
				this.startCountdown();
			}
		},
	},
	mounted() {
		this.leftCapitals = this.shuffleArray([...capitals]);
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
				if (message.toLowerCase() === this.currentCapital.city.toLowerCase()) {
					if (!this.answered.includes(tags['display-name'])) {
						this.answered.push(tags['display-name']);
						this.$store.commit('updateScore', {
							username: tags.username,
							points: this.countdown,
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
				this.soulutionShown = true;
				this.countdown = 10;
				this.startCountdown();
			} else if (this.isStarted) {
				this.answered = [];
				this.soulutionShown = false;
				this.currentCapital = this.leftCapitals.pop();
				this.countdown = 16;
				this.startCountdown();
			}
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
