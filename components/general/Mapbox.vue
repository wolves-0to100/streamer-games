<template>
	<div id="map"></div>
</template>

<script>
import mapbox from 'mapbox-gl/dist/mapbox-gl';

export default {
	name: 'MapboxMap',
	props: {
		cords: {
			type: Array,
			default: () => {
				return [0, 0];
			},
		},
	},
	data() {
		return {
			map: null,
			marker: null,
			accessToken: 'pk.eyJ1IjoiMHRvMTAwIiwiYSI6ImNrbTNmNDE4ZjMzY2MycG13M3N6NzNpMm0ifQ.oSzlIlebBntxNYyLoNB6yA',
		};
	},
	computed: {
		mapStyle() {
			if (this.$colorMode.preference === 'dark') {
				return 'mapbox://styles/0to100/ckm3du74n0xrb17pg7ak7a3e6';
			} else {
				return 'mapbox://styles/0to100/ckm3dh4540fmn17q3vf92h0vq';
			}
		},
	},
	watch: {
		cords() {
			if (this.map) {
				this.marker.setLngLat(this.cords);
				this.map.panTo(this.cords, { duration: 1000 }).zoomTo(1);
			}
		},
		mapStyle() {
			this.map.setStyle(this.mapStyle);
		},
	},
	mounted() {
		mapbox.accessToken = this.accessToken;
		this.map = new mapbox.Map({
			container: 'map',
			style: this.mapStyle,
		});
		this.marker = new mapbox.Marker();
		this.marker.setLngLat(this.cords).addTo(this.map);
		this.map.panTo(this.cords, { duration: 1000 }).zoomTo(1);
	},
};
</script>

<style scoped>
.map {
	height: 50vh;
}
</style>
