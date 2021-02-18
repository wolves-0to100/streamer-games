<template>
	<div class="gameContainer">
		<h1>Quiz</h1>
		<div v-if="!currentQuestion" class="intro">
			<p>
				Beim Quiz werden Fragen aus verschiednen Bereichen gestellt. Wenn du mitmachen möchtest tippe:
				<b>!join</b> in den Chat. Danach kannst du die Antworten einfach in den Chat schreiben.
			</p>
		</div>
		<div v-else class="quiz">
			<h2>{{ currentQuestion.question }}</h2>
			<p v-if="solutionShown">
				Die Antwort lautet: <b>{{ currentQuestion.answer }}</b>
			</p>
		</div>
		<div v-if="currentQuestion">
			<p v-if="correctGuesses">Richtig geantwortet haben: {{ correctGuesses }}</p>
			<p>T-00:{{ doubleDigitCountdown }}</p>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import tmi from 'tmi.js';
import quizData from '~/assets/games/quiz/quizData.json';

export default {
	name: 'Quiz',
	props: {
		isStarted: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			solutionShown: false,
			leftQuestions: [],
			answered: [],
			currentQuestion: null,
			countdown: 20,
			interval: null,
			guessTime: 20,
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
				this.solutionShown = false;
				this.currentQuestion = this.leftQuestions.pop();
				this.countdown = this.guessTime;
				this.startCountdown();
			}
		},
	},
	mounted() {
		this.leftQuestions = this.shuffleArray([...quizData]);
		const client = new tmi.Client({
			connection: {
				secure: true,
				reconnect: true,
			},
			channels: [this.channelName],
		});

		client.connect();

		client.on('message', (channel, tags, message, self) => {
			if (this.interval && !this.solutionShown) {
				if (this.currentQuestion.accept.includes(message.toLowerCase())) {
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
			if (!this.solutionShown) {
				this.solutionShown = true;
				this.countdown = 10;
				this.startCountdown();
			} else if (this.isStarted) {
				this.answered = [];
				this.solutionShown = false;
				this.currentQuestion = this.leftQuestions.pop();
				this.countdown = this.guessTime;
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
.quiz {
	min-height: 50vh;
}
h2 {
	margin: 1em 0;
}

p {
	font-size: 1.2em;
}

.intro {
	max-width: 600px;
}
</style>
