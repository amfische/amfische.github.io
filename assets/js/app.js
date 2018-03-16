new Vue({
	el: '.navbar',
	data: {
		isMobile: false
	},
	methods: {
		toggleNavbar() {
			this.isMobile = !this.isMobile
			// this.$refs.navbrand.style.borderBottom = this.isMobile ? '1px solid black' : 'none'
			this.$refs.navmenu.style.marginTop = this.isMobile ? '0px' : '-300px'
		}
	}
})