'use strict';

var simon = {
	level: 0,
	strict: false,
	pattern: [],
	player_pattern: [],
	toggleStrictMode() {
		this.strict = !this.strict
		ui.toggleStrictMode(this.strict)
	},
	reset() {
		console.log('resetting')
		this.level = 0;
		this.pattern = [];
		this.player_pattern = [];
		ui.reset()
	},
	start() {
		console.log('starting')
		this.reset()
		this.next_level()
	},
	next_level() {
		this.player_pattern = [];
		this.random_color();
		this.level++;
		ui.update_count();
		setTimeout(function() {
			simon.play_pattern();
		}, 1500);
	},
	random_color() {
		//generate random color and apply to simon pattern array
		var num = Math.floor(Math.random() * 4);
		var colors = ['green', 'red', 'yellow', 'blue'];
		this.pattern.push(colors[num]);
	},
	play_pattern() {
		for (var i = 0; i < this.pattern.length; i++) {
			//need to create closure around each iteration
			(function(j) {
				setTimeout(function() {
					switch(simon.pattern[j]) {
						case 'blue':
							$blue.setOffColor()
							$blue.enableAudio()
							setTimeout(() => {
								$blue.disableAudio()
								$blue.setOriginalColor()
							}, 500);
							break;
						case 'green':
							$green.setOffColor()
							$green.enableAudio()
							setTimeout(() => {
								$green.disableAudio()
								$green.setOriginalColor()
							}, 500);
							break;
						case 'yellow':
							$yellow.setOffColor()
							$yellow.enableAudio()
							setTimeout(() => {
								$yellow.disableAudio()
								$yellow.setOriginalColor()
							}, 500);
							break;
						case 'red':
							$red.setOffColor()
							$red.enableAudio()
							setTimeout(() => {
								$red.disableAudio()
								$red.setOriginalColor()
							}, 500);
							break;
					}
				}, 1000 * j);
			})(i);
		}
		setTimeout(function() {
			controls.enableUserInput();
		}, 1000 * simon.pattern.length);
	},
	check_player_input() {
		controls.disableUserInput();
		var pass_level = true;
		for (var i = 0; i < this.player_pattern.length; i++) {
			if (this.player_pattern[i] !== this.pattern[i]) {
				pass_level = false;
			}
		}
		if (!pass_level) {
			ui.mistake();
			if (!this.strict) {
				setTimeout(function() {
					ui.update_count();
				}, 4000)
				setTimeout(function() {
					simon.player_pattern = [];
					simon.play_pattern();
				}, 5500);
			} else {
				setTimeout(function() {
					simon.reset();
				}, 4000);
			}
		} else if (pass_level && this.player_pattern.length === this.pattern.length && this.level === 20) {
			ui.win();
		} else if (pass_level && this.player_pattern.length === this.pattern.length) {
			setTimeout(function() {
				simon.next_level();
			}, 500);
		} else {
			controls.enableUserInput();
		}
	}
}




//allows me to pass functions with parameters as arguments without invoking the function
function partial(func /*, 0..n args */) {
  var args = Array.prototype.slice.call(arguments, 1);
  return function() {
    var allArguments = args.concat(Array.prototype.slice.call(arguments));
    return func.apply(this, allArguments);
  };
}