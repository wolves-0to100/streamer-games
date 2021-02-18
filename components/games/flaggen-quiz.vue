<template>
	<div class="gameContainer">
		<h1>Flaggen Quiz</h1>
		<div v-if="!currentCountry" class="settings">
			<p>Wähle aus in welcher Form das Land in den Chat geschrieben werden muss.</p>
			<div v-if="!answerType">
				<button @click="answerType = 'de'">Deutsch</button>
				<button @click="answerType = 'name'">Englisch</button>
				<button @click="answerType = 'code'">Ländercode</button>
			</div>
			<div v-else>
				<p>Gebt eure Antworten in in folgendem Format:</p>
				<p>
					z.B. wenn die deutsche Flagge zu sehen ist: <b v-if="answerType === 'de'">Deutschland</b
					><b v-if="answerType === 'name'">Germany</b><b v-if="answerType === 'code'">DE</b>
				</p>
			</div>
		</div>
		<div v-else class="game">
			<h2>
				<span>Ländername: </span>
				<span v-if="soulutionsShown">{{ currentCountry.name }} ({{ currentCountry.de }})</span>
				<span v-else>?</span>
			</h2>

			<div class="imageWrapper">
				<img :src="require('~/assets/games/flaggen-quiz/flags/' + currentCountry.code + '.svg')" />
			</div>

			<p v-if="correctGuesses">Richtig geantwortet haben: {{ correctGuesses }}</p>
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
			answerType: '',
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
				if (message.toLowerCase() === this.currentCountry[this.answerType].toLowerCase()) {
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
			if (!this.soulutionsShown) {
				this.soulutionsShown = true;
				this.countdown = 10;
				this.startCountdown();
			} else if (this.isStarted) {
				this.answered = [];
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

.settings {
	p {
		margin: 1em 0;
	}
}
</style>
