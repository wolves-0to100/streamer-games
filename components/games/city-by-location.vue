<template>
	<div class="gameContainer">
		<h1>Kartenparadies</h1>
		<div v-if="!currentCity" class="settings">
			<p>
				Auf der Karte wird dir ein Marker angezeigt. Nenne die Stadt auf welcher der Marker sitzt. Wenn du weißt
				um welche Stadt es sich handelt tippe den Namen in den Chat. Die Städtnamen sind auf Englisch!
			</p>
			<div v-if="!isSelected">
				<button @click="setCities(true)">Hauptstädte</button>
				<button @click="setCities(false)">Alle Städte</button>
			</div>
		</div>
		<div v-else class="game">
			<h2>Wie heißt diese Stadt?</h2>

			<MapboxMap :cords="marker" />

			<p v-if="soulutionShown">Das ist {{ currentCity.city }}.</p>

			<p v-if="correctGuesses && soulutionShown">Richtig geantwortet haben: {{ correctGuesses }}</p>
			<p>T-00:{{ doubleDigitCountdown }}</p>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import tmi from 'tmi.js';
import MapboxMap from '~/components/general/Mapbox';
import cities from '~/assets/games/cities/cityData.json';

export default {
	name: 'CityByLocation',
	components: {
		MapboxMap,
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
			leftCities: [],
			currentCity: null,
			countdown: 25,
			interval: null,
			answered: [],
			isSelected: false,
			map: null,
			zoomLevel: 2.6,
			marker: [0, 0],
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
				this.answered = [];
				this.soulutionShown = false;
				this.currentCity = this.leftCities.pop();
				this.countdown = 25;
				this.startCountdown();
			}
		},
		currentCity() {
			this.marker = [this.currentCity.lng, this.currentCity.lat];
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
				if (message.toLowerCase() === this.currentCity.city.toLowerCase()) {
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
		setCities(capitales) {
			if (capitales) {
				const filteredCities = cities.filter((c) => c.capital === 'primary');
				this.leftCities = this.shuffleArray([...filteredCities]);
			} else {
				this.leftCities = this.shuffleArray([...cities]);
			}
			this.isSelected = true;
		},
		stopCountdown() {
			clearInterval(this.interval);
			this.interval = null;
			if (!this.soulutionShown) {
				this.zoomLevel = 5;
				this.soulutionShown = true;
				this.countdown = 10;
				this.startCountdown();
			} else if (this.isStarted) {
				this.zoomLevel = 2.6;
				this.answered = [];
				this.soulutionShown = false;
				this.currentCity = this.leftCities.pop();
				this.countdown = 25;
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
