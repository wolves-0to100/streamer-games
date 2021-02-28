<template>
	<CardItem class="game" @click="$emit('click')">
		<h2>{{ game.name }}</h2>
		<p class="description">{{ game.description }}</p>
		<p class="details">Maximale Spieler: {{ game.maxPlayer || 'kein Limit' }}</p>
	</CardItem>
</template>

<script>
import CardItem from '~/components/general/CardItem';

export default {
	name: 'GameCard',
	components: { CardItem },
	props: {
		game: {
			type: Object,
			default: () => {
				return {
					name: '',
					description: '',
					maxPlayers: 0,
				};
			},
		},
	},
};
</script>

<style scoped>
.game {
	cursor: pointer;
}

.description {
	margin: 1em 0;
}

.details {
	color: rgb(66, 66, 66);
}

.dark-mode .details {
	color: rgb(212, 212, 212);
}
</style>
