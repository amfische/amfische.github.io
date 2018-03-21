'use strict';

var mistake = new Audio('/assets/sounds/buzz.mp3');
var win = new Audio('/assets/sounds/ping.mp3');

const ui = {
	level: 0,
	strictLight: document.querySelector('.strict-light'),
	levelDisplay: document.querySelector('.level-count'), 
	toggleStrictMode(isStrict) {
		console.log('toggleStrictMode')
		this.strictLight.style.backgroundColor = isStrict ? 'red' : 'white'
	},
	update_count() {
		this.level++
		let str = this.level.toLocaleString('en-US', {minimumIntegerDigits: 2})
		this.levelDisplay.setAttribute('value', str)
	},
	reset() {
		this.level = 0
		this.levelDisplay.setAttribute('value', '00')
	},
	mistake() {
		this.levelDisplay.setAttribute('value', '!!!');
		mistake.volume = 0.1;
		mistake.play();
		var flash_error = setInterval(function() {
			this.levelDisplay.setAttribute('value', this.levelDisplay.getAttribute('value') === '!!!' ? " " : "!!!"); 
		}, 400);
		setTimeout(function() {
			clearInterval(flash_error);
		}, 2800);
	},
	win() {
		this.levelDisplay.setAttribute('value', 'WIN');
		win.volume = 0.1;
		win.play();
		var flash_win = setInterval(function() {
			this.levelDisplay.setAttribute('value', this.levelDisplay.getAttribute('value') === 'WIN' ? " " : "WIN"); 
		}, 400);
		setTimeout(function() {
			clearInterval(flash_win);
		}, 2800);
	}
}

