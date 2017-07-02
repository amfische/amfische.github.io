"use strict";

//initial board object
function Board() {
	this.width = 3;
	this.height = 3;
	this.availableMoves = 9;

	this.spaces = [];
	for (var y = 1; y <= this.height; y++) {
		for (var x = 1; x <= this.width; x++) {
			this.spaces.push(new BoardSpace(x,y));
		}
	}
}

Board.prototype.reset = function() {
	//clear board object values
	for (var i = 0; i < this.spaces.length; i += 1) {
		this.spaces[i].occupied = false;
		this.spaces[i].value = "";
	}
	//reset available moves
	this.availableMoves = 9;

	//clear DOM elements
	$('.board-space').empty();
}

Board.prototype.play = function(p1, p2) {
	p1.opponent = p2;
	p2.opponent = p1;
	if (p1.marker === "X") {
		p1.setTurn = true;
	} else {
		p2.setTurn = true;
	}
}

Board.prototype.update = function(number, marker) {
	var spacesObject = document.getElementsByClassName("board-space");
	var x = this.spaces[number].XCoordinate;
	var y = this.spaces[number].YCoordinate;
	var color = marker === 'X' ? '#4666FF' : '#C2FF46';

	//update board interface, HTML
	for (var i = 0; i < spacesObject.length; i += 1) {
		if (spacesObject[i].className.indexOf(x + "-" + y) !== -1) {
			spacesObject[i].innerHTML = marker;
			spacesObject[i].style.color = color;
		}
	}

	//update board object
	this.spaces[number].occupied = true;
	this.spaces[number].value = marker;
	this.availableMoves--;

	return this.game_status();
}

Board.prototype.game_status = function() {

	//need to return if game is over, and which symbol won to determine score for minimax
	var gameover = [false, ""];

	//check rows - [0,1,2] or [3,4,5] or [6,7,8]
	for (var r = 0; r <= 6; r += 3) {
		if (this.spaces[r].value !== "" && this.spaces[r].value === this.spaces[r+1].value && this.spaces[r+1].value === this.spaces[r+2].value) {
			//alert(this.spaces[r].value + " is the winner!");
			gameover[0] = true;
			gameover[1] = this.spaces[r].value;
		}
	}

	//check columns - [0,3,6] or [1,4,7] or [2,5,8]
	for (var c = 0; c <= 2; c++ ) {
		if (this.spaces[c].value !== "" && this.spaces[c].value === this.spaces[c+3].value && this.spaces[c+3].value === this.spaces[c+6].value) {
			//alert(this.spaces[c].value + " is the winner!");
			gameover[0] = true;
			gameover[1] = this.spaces[c].value;
		}
	}

	//check diaganols - [0,4,8] or [2,4,6]
	for (var d1 = 0, d2 = 4; d1 <= 2; d1 += 2, d2 -= 2) {
		if (this.spaces[d1].value !== "" && this.spaces[d1].value === this.spaces[d1+d2].value && this.spaces[d1+d2].value === this.spaces[d1+d2*2].value) {
			//alert(this.spaces[d1].value + " is the winner!");
			gameover[0] = true;
			gameover[1] = this.spaces[d1].value;
		}
	}

	//check for draw
	if (this.availableMoves === 0 && gameover[1] === "") {
		//alert("Cats game!");
		gameover[0] = true;
		gameover[1] = "draw";
	}

	return gameover;
}

Board.prototype.score = function() {
	var status = this.game_status();
	if (status[1] === "X") {
		//if X wins return positive score minus number of moves it took to win
		return 10 - this.availableMoves;
	} else if (status[1] === "O") {
		//if X loses return negative score plus number of moves it took to lose
		return -10 + this.availableMoves;
	} else {
		//return 0 points for a draw
		return 0;
	}
}