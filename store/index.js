export const state = () => ({
	channelName: '',
	players: [],
	games: [
		{
			name: 'Flaggen Quiz',
			slug: 'flaggen-quiz',
			description: 'Erkenne die Länder anhand ihrer Falgge.',
			maxPlayer: null,
		},
	],
});

export const mutations = {
	setChannelName(state, name) {
		state.channelName = name;
	},
	addPlayer(state, player) {
		state.players.push(player);
	},
	updateScore(state, { points, username }) {
		const player = state.players.find((u) => u.username === username);
		if (player) player.score += points;
	},
	resetScore(state) {
		state.players.forEach((player) => {
			player.score = 0;
		});
	},
};
