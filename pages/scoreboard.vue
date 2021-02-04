<template>
	<div class="page">
		<scoreboard />
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
