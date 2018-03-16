new Vue({
	el: '.navbar',
	data: {
		isMobile: false
	},
	methods: {
		toggleNavbar() {
			this.isMobile = !this.isMobile
			this.$refs.navbrand.style.borderBottom = this.isMobile ? '1px solid black' : 'none'
		}
	}
})