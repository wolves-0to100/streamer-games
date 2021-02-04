<template>
	<div>
		<page-header></page-header>
		<Nuxt />
	</div>
</template>

<script>
import PageHeader from '~/components/general/PageHeader';

export default {
	components: {
		PageHeader,
	},
};
</script>

<style lang="scss" scoped>
.page {
	width: 100%;
	margin: 0 auto;
	padding: 100px 10%;
	max-width: 1080px;
	@media (min-width: 1600px) {
		padding: 100px 160px;
	}
}
</style>
