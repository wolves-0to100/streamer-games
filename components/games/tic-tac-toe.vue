<template>
	<div id="ttt" class="gameContainer">
		<h1>Tic Tac Toe</h1>
		<div v-if="!gameIsStarted">
			<p>Wähle aus wie Tic Tac Toe gespielt werden soll.</p>
			<div v-if="!player2" class="selectPlayStyle">
				<button @click="selectPlayers(true)">Streamer vs. Zuschauer</button>
				<button @click="selectPlayers(false)">Zuschauer vs. Zuschauer</button>
			</div>
			<p v-else>
				<span>{{ player1 }}</span> vs. <span>{{ player2 }}</span>
			</p>
		</div>
		<div v-else>
			<p>
				<span :class="{ active: player1Turn }">{{ player1 }}</span> vs.
				<span :class="{ active: !player1Turn }">{{ player2 }}</span>
			</p>
			<div id="board">
				<p v-if="winner" class="winner">{{ winner }}</p>
				<div v-for="(field, i) in gameState" :key="`field-${i}`" :class="{ done: winner }">
					<p v-if="field" class="player">{{ field }}</p>
					<p v-else class="number">{{ i }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import tmi from 'tmi.js';

export default {
	name: 'TicTacToeGame',
	props: {
		isStarted: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			gameIsStarted: false,
			player1: null,
			player2: null,
			gameState: {
				1: null,
				2: null,
				3: null,
				4: null,
				5: null,
				6: null,
				7: null,
				8: null,
				9: null,
			},
			player1Turn: true,
			winner: null,
		};
	},
	computed: {
		...mapState(['channelName', 'players']),
		currentPlayer() {
			return this.player1Turn ? this.player1 : this.player2;
		},
	},
	watch: {
		isStarted() {
			if (this.isStarted) {
				this.gameIsStarted = true;
			} else {
				// Game is stopped
			}
		},
	},
	mounted() {
		const client = new tmi.Client({
			connection: {
				secure: true,
				reconnect: true,
			},
			channels: [this.channelName],
		});

		client.connect();

		client.on('message', (channel, tags, message, self) => {
			const field = parseInt(message);
			if (field >= 1 && field <= 9 && this.gameIsStarted) {
				if (this.gameIsStarted && !this.winner) {
					if (tags.username === this.currentPlayer && !this.gameState[field]) {
						this.gameState[field] = tags.username;
						this.checkForWin();
						this.player1Turn = !this.player1Turn;
					}
					// TODO: Sollte ein Spieler nicht innerhalb von 30s spielen gewinnt der andere
				}
			}
		});
	},
	methods: {
		selectPlayers(streamerGame = false) {
			if (this.player1) {
				this.player2 = this.players[Math.floor(Math.random() * this.players.length)].username;
			} else if (streamerGame) {
				this.player1 = this.channelName.toLowerCase();
				this.player2 = this.players[Math.floor(Math.random() * this.players.length)].username;
			} else {
				if (this.players.length <= 1) return;
				this.player1 = this.players[Math.floor(Math.random() * this.players.length)].username;
				this.player2 = this.players[Math.floor(Math.random() * this.players.length)].username;
			}
			if (this.player1 === this.player2) {
				this.selectPlayers();
			} else if (this.isStarted) {
				this.gameIsStarted = true;
			}
		},
		checkForWin() {
			let win = false;
			for (let row = 1; row < 4; row++) {
				if (
					this.gameState[row * 3 - 2] === this.currentPlayer &&
					this.gameState[row * 3 - 1] === this.currentPlayer &&
					this.gameState[row * 3] === this.currentPlayer
				) {
					this.setWinner();
					win = true;
				}
				if (
					this.gameState[row] === this.currentPlayer &&
					this.gameState[row + 3] === this.currentPlayer &&
					this.gameState[row + 6] === this.currentPlayer
				) {
					this.setWinner();
					win = true;
				}
			}
			if (
				this.gameState[1] === this.currentPlayer &&
				this.gameState[5] === this.currentPlayer &&
				this.gameState[9] === this.currentPlayer
			) {
				this.setWinner();
				win = true;
			}
			if (
				this.gameState[3] === this.currentPlayer &&
				this.gameState[5] === this.currentPlayer &&
				this.gameState[7] === this.currentPlayer
			) {
				this.setWinner();
				win = true;
			}
			let boardFull = true;
			for (let i = 1; i <= 9; i++) {
				if (!this.gameState[i]) boardFull = false;
			}
			if (!win && boardFull) this.resetGame();
		},
		setWinner() {
			const player = this.players.find((player) => {
				return player.username === this.currentPlayer;
			});
			player.score += 10;
			this.winner = this.currentPlayer;
			this.gameStarted = false;
			setTimeout(this.resetGame, 10000);
		},
		resetGame() {
			this.player1 = null;
			this.player2 = null;
			this.gameState = {
				1: null,
				2: null,
				3: null,
				4: null,
				5: null,
				6: null,
				7: null,
				8: null,
				9: null,
			};
			this.gameIsStarted = false;
			this.player1Turn = true;
			this.winner = null;
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

.selectPlayStyle {
	margin: 1em 0;
}

#ttt {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	color: black;
	text-align: center;
	p {
		font-size: 28px;
		color: #bababa;
		span {
			color: black;
			&.active {
				color: #d90000;
			}
		}
	}
}

#board {
	position: relative;
	display: grid;
	height: 500px;
	width: 500px;
	grid-template-columns: 1fr 1fr 1fr;
	grid-template-rows: 1fr 1fr 1fr;
	div {
		display: flex;
		justify-content: center;
		align-items: center;
		border: 2px solid black;
	}
	p {
		font-size: 18px;
	}
	.winner {
		position: absolute;
		top: 230px;
		left: 0;
		right: 0;
		width: 100%;
		line-height: 1em;
		font-size: 40px;
	}
}

.done {
	opacity: 0.4;
}

.player {
	margin: 4px;
}

.number {
	margin: 4px;
	opacity: 0.6;
}

.dark-mode {
	#ttt {
		color: white;
		p {
			span {
				color: white;
			}
		}
	}

	#board {
		div {
			border: 2px solid white;
		}
	}
}
</style>
