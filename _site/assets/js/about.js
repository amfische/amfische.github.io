new Vue({
	el: '.about-page',
	data: {
		showModal: false
	},
	methods: {
		showResume() {
			this.showModal = true
			document.documentElement.classList.add('overflow-hidden')
		},
		close() {
			this.showModal = false
			document.documentElement.classList.remove('overflow-hidden')
		}
	}
})