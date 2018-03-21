class Button {
	constructor($audioContext, $color, $offColor, $frequency) {
    this.element = document.querySelector('.' + $color),
    this.audio = new OscillatorNode($audioContext, { type: 'triangle', frequency: $frequency })
    this.color = $color
    this.offColor = $offColor
    this.context = $audioContext
    this.audio.start()
  }
	setOriginalColor() {
		this.element.style.backgroundColor = this.color
	}
	setOffColor() {
		this.element.style.backgroundColor = this.offColor
	}
	enableAudio() {
		this.audio.connect(this.context.destination)
	}
	disableAudio() {
		this.audio.disconnect(this.context.destination)
	}
	mousedown() {
		this.setOffColor()
		this.enableAudio()
	}
	mouseup() {
		this.setOriginalColor()
		this.disableAudio()
		simon.player_pattern.push(this.color)
		simon.check_player_input()
	}
	enable() {
		this.element.addEventListener('mousedown', this.mousedown.bind(this))
		this.element.addEventListener('mouseup', this.mouseup.bind(this))
		this.element.style.cursor = 'pointer'
	}
	disable() {
		this.element.removeEventListener('mousedown', this.mousedown.bind(this))
		this.element.removeEventListener('mouseup', this.mouseup.bind(this))
		this.element.style.cursor = 'initial'
	}
}

