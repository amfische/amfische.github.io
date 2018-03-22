new Vue({
	el: '.about-page',
	methods: {
		showResume() {
			this.$refs.modal.classList.add('is-active')
		},
		close() {
			this.$refs.modal.classList.remove('is-active')
		}
	}
})