Vue.component('character', {
	props: ['name', 'image'],
	template: '<div class="character_box"><p class="character_name">{{ name }}</p><img :src=image></div>'
})

let defaultUserNames = ['ShapeShifter', 'GeometryGenius', 'Mathpert', 'Lunatic', 'SideSlayer', 'TripleDiamond','SquareLife','Gauss','Cantor','Euler','Galileo','Archimedes','Pythagoras','Newton','Riemann','Poincare','Lagrange','Euclid','Hilbert','Leibniz','Fermat','Grothendieck','Galois','Neumann','Abel','Descartes','Jacobi','Ramanujan','Brahmagupta','Cauchy','Weyl','Cayley','Noether','DaVinci','Fibonacci','Hamilton','Pascal','TooObtuse','StraightLaced']

var app = new Vue({
  el: '#app',
	store: store,
  data: {
		user_name: defaultUserNames[Math.floor(Math.random() * defaultUserNames.length)] + "_"+ Math.floor(Math.random() * 10000),
		selected_shape: -1,
		selected_distortion: -1,
		winner: '',
		timer: null,
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
		tie: {
			name: "Tie!",
			image: "/images/shapes/tie.png",
		},
	},
	computed: {
		opponent: function() {
			return this.$store.getters.opponent;
		},
		opponent_user_name: function() {
			if (this.opponent) {
				return this.opponent.name;
			} else {
				return '';
			}
		},
		registered: function() {
			return this.$store.getters.registered;
		},
		sentShape: function() {
			return this.$store.getters.selected_shape >= 0;
		}
	},
  // created: function() {
	//
  // },
  methods: {
		register: function() {
			this.$store.dispatch('register', {
				name: this.user_name,
			});
			if (this.timer != undefined) {
				clearInterval(this.timer);
			}
			this.timer = setInterval(this.pollFight, 2000);
		},

		pollFight: function() {
			this.$store.dispatch('getOpponent', {
				name: this.user_name,
			});
			let myShape = this.$store.getters.selected_shape;
			if (myShape >= 0 && this.opponent.shape >= 0) {
				this.selected_distortion = this.opponent.shape;
				if (myShape == this.selected_distortion) {
					// Tie
					this.winner = {
						result: -1,
						image: this.tie.image,
					};
				} else if (this.shapes[myShape].beats.indexOf(this.opponent.shape) > -1) {
					this.winner = {
						result: 1,
						image: this.shapes[this.selected_shape].image,
					};
				} else {
					this.winner = {
						result: 0,
						image: this.distortions[this.selected_distortion].image,
					};
				}
				if (this.timer != undefined) {
					clearInterval(this.timer);
				}
				var timeout = setTimeout(this.unregister, 2000);
			}
		},

		selectShape: function(shapeIndex) {
			if (this.$store.getters.selected_shape < 0) {
				this.selected_shape = shapeIndex;
			}
		},

		fight: function() {
			this.$store.dispatch('fight', {
				name: this.user_name,
				shape: this.selected_shape,
			});
		},

		playAgain: function() {
			this.selected_shape = -1;
			this.selected_distortion = -1;
			this.winner = '';
			this.register();
		},

		unregister: function() {
			if (this.timer != undefined) {
				clearInterval(this.timer);
			}
			this.$store.dispatch('unregister', {
				name: this.user_name,
			});
		}
  }
});
