Vue.component('character', {
	props: ['name', 'image'],
	template: '<div class="character_box"><p class="character_name">{{ name }}</p><img :src=image></div>'
})

var app = new Vue({
  el: '#app',
  data: {
		selected_shape: -1,
		selected_distortion: -1,
		winner: '',
		shapes: [
		{
			name: "Lenny",//0
			image: "/images/shapes/Lenny.png",
			beats: [1,3,5,6], // Beats Perry, Trent, Sherry, Simon
		},
		{
			name: "Perry",//1
			image: "/images/shapes/Perry.png",
			beats: [2,6,7], // Beats Trixie, Simon, Tiff
		},
		{
			name: "Trixie",//2
			image: "/images/shapes/Trixie.png",
			beats: [0,4,7], // Beats Lenny, Bruce, Tiff
		},
		{
			name: "Trent",//3
			image: "/images/shapes/Trent.png",
			beats: [1,2,4,7],// Beats Perry, Trixie, Bruce, Tiff
		},
		{
			name: "Bruce",//4
			image: "/images/shapes/Bruce.png",
			beats: [0,1,6,7],// Beats Lenny, Perry, Simon, Tiff
		},
		{
			name: "Sherry",//5
			image: "/images/shapes/Sherry.png",
			beats: [1,2,3,4],// Perry, Trixie, Trent, Bruce
		},
		{
			name: "Simon",//6
			image: "/images/shapes/Simon.png",
			beats: [1,2,3,5],// Perry, Trixie, Trent, Sherry
		},
		{
			name: "Tiff",//7
			image: "/images/shapes/Tiff.png",
			beats: [0,5,6],// Lenny, Sherry, Simon
		}
		],
		distortions: [
			{
			name: "Distorted Lenny",
			image: "/images/shapes/Lenny\ Evil\ Thumb.png",
		},
		{
			name: "Distorted Perry",
			image: "/images/shapes/Perry\ Evil.png",
		},
		{
			name: "Distorted Trixie",
			image: "/images/shapes/Trixie\ Evil.png",
		},
		{
			name: "Distorted Trent",
			image: "/images/shapes/Trent\ Evil.png",
		},
		{
			name: "Distorted Bruce",
			image: "/images/shapes/Bruce\ Evil.png",
		},
		{
			name: "Distorted Sherry",
			image: "/images/shapes/Sherry\ Evil.png",
		},
		{
			name: "Distorted Simon",
			image: "/images/shapes/Simon\ Evil.png",
		},
		{
			name: "Distorted Tiff",
			image: "/images/shapes/Tiff\ Evil.png",
		}
		],
	},
  created: function() {
		this.selectRandomDistortion();
  },
  methods: {
		selectShape: function(shapeIndex) {
			this.selected_shape = shapeIndex;
		},

		selectDistortion: function(distortionIndex) {
			this.selected_distortion = distortionIndex;
		},

		selectRandomDistortion: function() {
			this.selected_distortion = Math.floor(Math.random() * this.distortions.length);
		},

		fight: function() {
			if (this.selected_shape < 0 || this.selected_distortion < 0) {
				return
			}
			if (this.shapes[this.selected_shape].beats.indexOf(this.selected_distortion) > -1) {
				this.winner = {
					shape: true,
					index: this.selected_shape,
				};
			} else {
				this.winner = {
					shape: false,
					index: this.selected_distortion,
				};
			}
			this.selected_shape = -1;
			this.selectRandomDistortion();
		}
  }
});
