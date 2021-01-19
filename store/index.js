export const state = () => ({
	channelName: '',
	players: [],
});

export const mutations = {
	setChannelName(state, name) {
		state.channelName = name;
	},
	setPlayers(state, players) {
		state.players = players;
	},
	updateScore(state, { points, username }) {
		const player = state.players.find((u) => u.username === username);
		if (player) player.score += points;
	},
};
