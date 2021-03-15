<template>
	<div v-show="loading" class="v-spinner">
		<div class="v-dot v-dot1" :style="spinnerBasicStyle">
			<div class="v-dot v-dot2" :style="spinnerStyle"></div>
			<div class="v-dot v-dot3" :style="spinnerStyle"></div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'DotLoader',

	props: {
		loading: {
			type: Boolean,
			default: true,
		},
		color: {
			type: String,
			default: '#d90000',
		},
		size: {
			type: String,
			default: '46px',
		},
		margin: {
			type: String,
			default: '2px',
		},
		radius: {
			type: String,
			default: '100%',
		},
	},
	computed: {
		spinnerStyle() {
			return {
				backgroundColor: this.color,
				height: parseFloat(this.size) / 2 + 'px',
				width: parseFloat(this.size) / 2 + 'px',
				borderRadius: this.radius,
			};
		},
		spinnerBasicStyle() {
			return {
				height: this.size,
				width: this.size,
				position: 'relative',
			};
		},
	},
};
</script>

<style>
.v-spinner {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 80vh;
	width: 100%;
}

.v-spinner .v-dot1 {
	-webkit-animation: v-dotRotate 2s 0s infinite linear;
	animation: v-dotRotate 2s 0s infinite linear;
	-webkit-animation-fill-mode: forwards;
	animation-fill-mode: forwards;
}

.v-spinner .v-dot2 {
	animation: v-dotBounce 2s 0s infinite linear;
	animation-fill-mode: forwards;
}

.v-spinner .v-dot3 {
	animation: v-dotBounce 2s -1s infinite linear;
	animation-fill-mode: forwards;
}

@-webkit-keyframes v-dotRotate {
	100% {
		transform: rotate(360deg);
	}
}

@keyframes v-dotRotate {
	100% {
		transform: rotate(360deg);
	}
}

@-webkit-keyframes v-dotBounce {
	0%,
	100% {
		transform: scale(0);
	}
	50% {
		transform: scale(1);
	}
}

@keyframes v-dotBounce {
	0%,
	100% {
		transform: scale(0);
	}
	50% {
		transform: scale(1);
	}
}
</style>
