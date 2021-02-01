<template>
	<div class="page">
		<component :is="currentGame"></component>
	</div>
</template>

<script>
import FlaggenQuiz from '~/components/games/FlaggenQuiz.vue';

export default {
	name: 'Game',
	layout: 'game-layout',
	computed: {
		currentGame() {
			switch (this.$route.params.slug) {
				case 'flaggen-quiz':
					return FlaggenQuiz;
				default:
					return FlaggenQuiz;
			}
		},
	},
};
</script>

<style></style>
