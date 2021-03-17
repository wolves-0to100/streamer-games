<template>
	<div class="gameContainer">
		<h1>Flughafenkürzel</h1>
		<div v-if="!currentAirport" class="settings">
			<p>
				Hier geht es darum Flughäfen ihr IATA Kürzel zuzuordnen. Zum Beispiel kommt als Frage: Wie lautet der
				IATA Code für: Munich Airport. Die Antwort wäre: MUC.
			</p>
		</div>
		<div v-else class="game">
			<h2>Wie ist der IATA Code von: {{ currentAirport.name }}, {{ currentAirport.iso_country }}?</h2>

			<p v-if="soulutionShown">Das IATA Kürzel ist: {{ currentAirport.iata_code }}</p>

			<p v-if="correctGuesses && soulutionShown">Richtig geantwortet haben: {{ correctGuesses }}</p>
			<p>T-00:{{ doubleDigitCountdown }}</p>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import tmi from 'tmi.js';
import airports from '~/assets/games/airports/airportData.json';

export default {
	name: 'IATACodes',
	props: {
		isStarted: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			soulutionShown: false,
			leftAirports: [],
			currentAirport: null,
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
				this.currentAirport = this.leftAirports.pop();
				this.countdown = 16;
				this.startCountdown();
			}
		},
	},
	mounted() {
		this.leftAirports = this.shuffleArray([...airports]);
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
				if (message.toLowerCase() === this.currentAirport.iata_code.toLowerCase()) {
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
				this.currentAirport = this.leftAirports.pop();
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
