<template>
	<div class="gameContainer">
		<h1>Länder der Welt</h1>
		<div v-if="!currentCountry && !isDone" class="settings">
			<p>
				Auf der Karte wird ein Land mit rot makiert. Nenne dieses Land und tippe den Namen in den Chat. Hier
				hast du noch die Möglichkeit anzugeben in welcher Sprache du die Antwort geben möchtest.
			</p>
			<div v-if="!isSelected">
				<button @click="setAnswerFormat('de')">Deutsch</button>
				<button @click="setAnswerFormat('name')">Englisch</button>
			</div>
		</div>
		<div v-if="currentCountry" class="game">
			<h2>Wie heißt das Land?</h2>

			<WorldMap :current-country="currentCountry.code" />

			<p v-if="soulutionShown">
				Das ist <b>{{ currentCountry.de }}</b>
			</p>

			<p v-if="correctGuesses && soulutionShown">Richtig geantwortet haben: {{ correctGuesses }}</p>
			<p>T-00:{{ doubleDigitCountdown }}</p>
		</div>
		<div v-if="isDone">
			<p>
				<b>Das waren alle Länder!</b> Wenn du neu starten möchtest wähle erneut die Sprache aus und drücke
				Start.
			</p>
			<button @click="setAnswerFormat('de')">Deutsch</button>
			<button @click="setAnswerFormat('name')">Englisch</button>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import tmi from 'tmi.js';
import cities from '~/assets/games/world/world.json';
import WorldMap from '~/components/general/WorldMap.vue';

export default {
	name: 'CountryByLocation',
	components: {
		WorldMap,
	},
	props: {
		isStarted: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			soulutionShown: false,
			leftCountries: [],
			currentCountry: null,
			countdown: 15,
			interval: null,
			answered: [],
			isSelected: false,
			answerFormat: 'de',
			isDone: false,
		};
	},
	computed: {
		...mapState(['channelName', 'players']),
		doubleDigitCountdown() {
			return this.countdown.toString().padStart(2, '0');
		},
		correctGuesses() {
			return this.answered?.join(', ');
		},
	},
	watch: {
		isStarted() {
			if (this.isStarted) {
				this.isDone = false;
				this.answered = [];
				this.soulutionShown = false;
				this.currentCountry = this.leftCountries.pop();
				this.countdown = 15;
				this.startCountdown();
			}
		},
	},
	mounted() {
		this.leftCountries = this.shuffleArray([...cities]);
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
				if (message.toLowerCase() === this.currentCountry[this.answerFormat].toLowerCase()) {
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
		setAnswerFormat(answerFormat) {
			this.answerFormat = answerFormat;
			this.isSelected = true;
		},
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
				this.currentCountry = this.leftCountries.pop();
				if (!this.currentCountry) {
					this.leftCountries = this.shuffleArray([...cities]);
					this.isDone = true;
					this.isSelected = false;
					this.$emit('toggle');
					return;
				}
				this.countdown = 15;
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

#map {
	height: 50vh;
}
</style>
