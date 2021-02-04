<template>
	<div>
		<div class="container">
			<page-header />
			<Nuxt />
		</div>

		<Footer />
	</div>
</template>

<script>
import Footer from '~/components/general/Footer.vue';
import PageHeader from '~/components/general/PageHeader';

export default {
	components: {
		PageHeader,
		Footer,
	},
};
</script>

<style lang="scss" scoped>
.container {
	min-height: 100vh;
}

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
