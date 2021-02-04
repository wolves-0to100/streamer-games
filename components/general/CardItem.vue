<template>
	<div class="card" @mousemove="$emit('mouseover')" @mouseleave="$emit('mouseleave')" @click="$emit('click')">
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: 'CardItem',
};
</script>

<style scoped>
.card {
	border-radius: 12px;
	padding: 20px 25px;
	box-shadow: 0 0 12px 3px rgba(212, 212, 212, 0.1);
	border: 1px solid rgba(0, 0, 0, 0.05);
}

.dark-mode .card {
	box-shadow: 0 0 12px 3px rgba(0, 0, 0, 0.1);
	border: 1px solid rgba(255, 255, 255, 0.05);
}
</style>
