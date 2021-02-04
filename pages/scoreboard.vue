<template>
	<div class="page">
		<scoreboard :display-limit="200" />
	</div>
</template>

<script>
import Scoreboard from '~/components/general/Scoreboard.vue';
export default {
	name: 'ScoreboardView',
	layout: 'game-layout',
	components: { Scoreboard },
};
</script>

<style scoped>
.scoreboard {
	width: 100%;
}
</style>
