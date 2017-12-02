"use strict"

class Player {

	constructor() {
		this.board = {}
		this.opponent = {}
		this.marker = ''
		this.computer = false
		this.turn = false	
	}

	setMarker(value) {
		this.marker = value
		this.opponent.marker = value === 'X' ? 'O' : 'X'
	}

	set setTurn(value) {
		this.turn = value;
		this.opponent.turn = !value;
		if (value) {
			if (this.computer) {
				this.move_AI();
			} else {
				this.move_user();
			}
		} else {
			if (this.opponent.computer) {
				this.opponent.move_AI();
			} else {
				this.opponent.move_user();
			}
		}
	}

	set changeTurns(value) {
		this.turn = value
		this.opponent = !value
	}

	endTurn() {
		this.turn = false
		this.opponent.turn = true
		if (this.opponent.computer) {
			this.opponent.move_AI()	
		}
	}
}

Player.prototype.settings = function(board, opponent, isComputer) {
	this.board = board
	this.opponent = opponent
	this.computer = isComputer
}

Player.prototype.move_user = function() {
	var that = this;
	var successfulMove = false;

	$(".board-space").on('click', function(event) {
		event.preventDefault();

		if (!successfulMove && this.innerHTML === "") {
			var status = that.board.update(this.id, that.marker);
			successfulMove = true;
			if (status[0]) {
				switch(status[1]) {
					case "X":
						setTimeout(function() {
							alert("X is the Winner!");
						}, 500);
						break;
					case "O":
						setTimeout(function() {
							alert("O is the Winner!");
						}, 500);
						break;
					case "draw":
						setTimeout(function() {
							alert("Cats Game!");
						}, 500);
						break;
				}
			} else {
				that.setTurn = false;
			}			
		}
	});	
}

Player.prototype.move_AI = function() {
	//function to return array of available moves
	function available(board) {
		var available = [];
		for (var i = 0; i < board.spaces.length; i++) {
			if (!board.spaces[i].occupied) {
				available.push(board.spaces[i]);
			}
		}
		return available; 
	}

	//function to return array of board objects that represent possible game states
	//takes available moves array, and current board state as parameters
	function possible_states(available, board) {
		var possible_states = available.map(function(empty_space) {
			var nextState = new Board();
			var x = empty_space.XCoordinate;
			var y = empty_space.YCoordinate;

			//update new board object to current game state
			for (var i = 0; i < board.spaces.length; i++) {
				if (board.spaces[i].occupied) {
					nextState.spaces[i].occupied = true;
					nextState.spaces[i].value = board.spaces[i].value;
				}
			}

			//take a possible move on new board object
			for (var i = 0; i < nextState.spaces.length; i++) {
				if (nextState.spaces[i].XCoordinate === x && nextState.spaces[i].YCoordinate === y) {
					nextState.spaces[i].occupied = true;
					nextState.spaces[i].value = board.availableMoves % 2 === 0 ? "O" : "X";

				}
			}

			nextState.availableMoves = board.availableMoves - 1;

			return nextState;
		});

		return possible_states;
	}

	//compute minimax value for a particular state/move
	function minimax(state) {

		//Need to check for terminal game state at beginning of function
		var status = state.game_status();
		if (status[0]) {
			//need to return a score
			return state.score();
		} else {
			var marker = state.availableMoves % 2 === 0 ? "O" : "X";	//keep track of whose turn it is
			var stateScore;		// this stores the minimax value we'll compute
			if (marker === "X") {
				// X wants to maximize --> initialize to a value smaller than any possible score
				stateScore = -1000;
			} else {
				// O wants to minimize --> initialize to a value larger than any possible score
				stateScore = 1000;
			}			

			var availableMoves = available(state);
			var possibleBoardStates = possible_states(availableMoves, state);		

			//calculate the minimax value for all available next states and evaluate the current state's value 
            possibleBoardStates.forEach(function(nextState) {
                var nextScore = minimax(nextState);
                if(marker === "X") {
                    // X wants to maximize --> update stateScore if nextScore is larger
                    if(nextScore > stateScore)
                        stateScore = nextScore;
                }
                else {
                    // O wants to minimize --> update stateScore if nextScore is smaller
                    if(nextScore < stateScore)
                        stateScore = nextScore;
                }
            });
            return stateScore;
		}
	}

	var availableMoves = available(this.board);
	var possibleBoardStates = possible_states(availableMoves, this.board);
	var state_values = possibleBoardStates.map(function(state) {
		return minimax(state);
	});

	//map minimax values with corresponding square
	for (var i = 0; i < availableMoves.length; i++) {
		state_values[i] = [state_values[i], availableMoves[i]];
	}

	//arrange values in ascending order
	state_values.sort(function(a, b) {
		return a[0] - b[0];
	});

	//if computer is playing as X grab maximum value
	//if computer is playing as O grab minimum value
	var best_move = [];
	if (this.marker === "X") {
		best_move = state_values[state_values.length - 1];
	} else {
		best_move = state_values[0];
	}

	//use boardSpace coordinates to grab correct DOM element
	// best_move = document.getElementsByClassName(best_move[1].XCoordinate + "-" + best_move[1].YCoordinate);
	// best_move = best_move[0].id;
	
	//play the best move
	var status = this.board.update(best_move, this.marker);
	if (status[0]) {
		switch(status[1]) {
			case "X":
				setTimeout(function() {
					alert("X is the Winner!");
				}, 500);
				break;
			case "O":
				setTimeout(function() {
					alert("O is the Winner!");
				}, 500);
				break;
			case "draw":
				setTimeout(function() {
					alert("Cats Game!");
				}, 500);
				break;
		}
	} else {
		this.endTurn()
	}
}