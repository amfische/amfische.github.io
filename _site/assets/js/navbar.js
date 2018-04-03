new Vue({
	el: '.navbar',
	data: {
		isOpen: false,
		navbarBurger: 'navbar-burger',
		isActive: 'is-active'
	},
	mounted() {
		if (window.outerWidth > 1023) {
			switch(window.location.pathname) {
				case '/':
					this.$refs.home.style.borderBottom = '3px solid #c6c6c6'
					this.$refs.home.firstChild.style.color = '#c6c6c6'
					this.$refs.about.style.borderBottom = 'none'
					this.$refs.about.firstChild.style.color = '#000'
					this.$refs.projects.style.borderBottom = 'none'
					this.$refs.projects.firstChild.style.color = '#000'
					break;
				case '/about/':
					this.$refs.home.style.borderBottom = 'none'
					this.$refs.home.firstChild.style.color = '#000'
					this.$refs.about.style.borderBottom = '3px solid #c6c6c6'
					this.$refs.about.firstChild.style.color = '#c6c6c6'
					this.$refs.projects.style.borderBottom = 'none'	
					this.$refs.projects.firstChild.style.color = '#000'
					break;
				default:
					this.$refs.home.style.borderBottom = 'none'
					this.$refs.home.firstChild.style.color = '#000'
					this.$refs.about.style.borderBottom = 'none'
					this.$refs.about.firstChild.style.color = '#000'
					this.$refs.projects.style.borderBottom = '3px solid #c6c6c6'
					this.$refs.projects.firstChild.style.color = '#c6c6c6'
			}
		}
	},
	methods: {
		toggleNavbar() {
			this.isOpen = !this.isOpen
			this.$refs.navmenu.style.marginTop = this.isOpen ? '0px' : '-200px'
		}
	}
})