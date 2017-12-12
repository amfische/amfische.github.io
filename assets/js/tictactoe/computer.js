class Computer {

	constructor() {
		this.board = {}
		this.opponent = {}
		this.marker = ''
		this.turn = false	
	}

	availableMoves(state) {
		return state.spaces.filter(space => !space.occupied)
	}

	possibleStates(available, board) {
		return available.map((emptySquare) => {
			let nextState = new Board()

			//update new board object to current game state
			for (let i = 0; i < board.spaces.length; i++) {
				if (board.spaces[i].occupied) {
					nextState.spaces[i].occupied = true
					nextState.spaces[i].value = board.spaces[i].value
				}
			}

			//take a possible move on new board object
			nextState.spaces.forEach((e) => {
				if (e.x === emptySquare.x && e.y === emptySquare.y) {
					e.occupied = true
					e.value = board.availableMoves % 2 === 0 ? "O" : "X"
				}
			})

			nextState.availableMoves = board.availableMoves - 1
			return nextState
		})
	}

	//compute minimax value for a particular state/move
	minimax(state) {
		//Need to check for terminal game state at beginning of function
		if (state.gameover) {
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

			var availableMoves = this.availableMoves(state);
			var possibleBoardStates = this.possibleStates(availableMoves, state);		

			//calculate the minimax value for all available next states and evaluate the current state's value 
      possibleBoardStates.forEach(function(nextState) {
        let nextScore = minimax(nextState);
        if(marker === "X") {
          // X wants to maximize --> update stateScore if nextScore is larger
          if(nextScore > stateScore)
            stateScore = nextScore
        }
        else {
          // O wants to minimize --> update stateScore if nextScore is smaller
          if(nextScore < stateScore)
            stateScore = nextScore
        }
      })
      return stateScore
		}
	}
}