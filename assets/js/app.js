new Vue({
	el: '.navbar',
	data: {
		isOpen: false,
		navbarBurger: 'navbar-burger',
		isActive: 'is-active'
	},
	methods: {
		toggleNavbar() {
			this.isOpen = !this.isOpen
			this.$refs.navmenu.style.marginTop = this.isOpen ? '0px' : '-200px'
		}
	}
})