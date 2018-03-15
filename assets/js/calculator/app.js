new Vue({
	el: '.display',
	data: {
		display: '',
		error: false,
		buttons: ['(', ')', 'del', 'AC', 
							'7', '8', '9', '/', 
							'4', '5', '6', '*', 
							'1', '2', '3', '-', 
							'0', '.', '=', '+']
	},
	watch: {
		display: function() {
			this.display = this.display === '' ? '0' : this.display
		}
	},
	methods: {
		btnAction(event) {
			switch(event.path[0].innerHTML) {
				case 'del':
					this.display = this.display === 'Invalid Entry' 
						? '0'
						: this.display.slice(0, -1)
					this.error = false
					break;
				case 'AC':
					this.display = '0'
					this.error = false
					break;
				case '=':
					try {
						this.display = eval(this.display).toString()	
					} 
					catch(e) {
						this.display = 'Invalid Entry'
						this.error = true;
					}
					break;
				default:
					if (this.display === '0' || this.display === 'Invalid Entry') {
						this.display = event.path[0].innerHTML
					} else {
						this.display += event.path[0].innerHTML	
					}
					this.error = false
			}
		} // end btnAction
	} // end methods
})