"use strict"

function BoardInterface(board, boardSelector, controlSelector) {
	this.board = board;
	this.boardSelector = boardSelector;
	this.controlSelector = controlSelector;
}

BoardInterface.prototype.render = function() {
	$(this.boardSelector).empty().append(this.renderBoard());
	$(this.controlSelector).empty().append(this.renderControls());
}

BoardInterface.prototype.renderBoard = function() {
	var $boardRow, $boardSpace;
	for (var y = 1; y <= this.board.height; y += 1) {
		$boardRow = $('<div class="boardRow">').prependTo(this.boardSelector);
		for (var x = 1; x <= this.board.width; x += 1) {
			$boardSpace = $('<div class="boardSpace">').appendTo($boardRow);
			$boardSpace.addClass(x + "-" + y);
			if (x === 1 || x === 2) {
				$boardSpace.addClass("right");
			}
			if (y === 2 || y === 3) {
				$boardSpace.addClass("bottom");
			}
		}
	}
}

BoardInterface.prototype.renderControls = function() {
	var $table, $tableHead, $tableBody, $tableFoot;
	$table = $('<table class="table table-bordered">').appendTo(this.controlSelector);
	$tableHead = $('<thead><tr><th>Choose Marker</th>').appendTo($table);
	$tableBody = $('<tbody><tr><td><input type="radio" name="marker" value="X">X</td>' + 
					'<td><input type="radio" name="marker" value="O">O</td>').appendTo($table);
	$tableFoot = $('<tfoot><tr><td><button class="btn btn-primary btn-block" id="start-button">Start</button>').appendTo($table);
}

BoardInterface.prototype.reset = function() {
	//clear board object values
	for (var i = 0; i < this.board.spaces.length; i += 1) {
		this.board.spaces[i].occupied = false;
		this.board.spaces[i].value = "";
	}
	//reset available moves
	this.board.availableMoves = 9;

	//clear DOM elements
	$('.boardSpace').empty();
}