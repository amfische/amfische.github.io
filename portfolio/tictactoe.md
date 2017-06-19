---
layout: main
title: Tic-Tac-Toe
permalink: /portfolio/tictactoe
---

<div class="container" id="tictactoe">
	
	<div class="row">
		<div class="col-md-6 col-sm-12">
			<div id="board">
				<div class="board-row">
					<div class="board-space 1-3" id="6">X</div>
					<div class="board-space 2-3" id="7">O</div>
					<div class="board-space 3-3" id="8">X</div>
				</div>
				<div class="board-row">
					<div class="board-space 1-2" id="3">O</div>
					<div class="board-space 2-2" id="4">X</div>
					<div class="board-space 3-2" id="5">O</div>
				</div>
				<div class="board-row">
					<div class="board-space 1-1" id="0">X</div>
					<div class="board-space 2-1" id="1">O</div>
					<div class="board-space 3-1" id="2">X</div>
				</div>
			</div>
		</div> <!-- END COLUMN -->
		<div class="col-md-3 col-sm-12" id="controls">
			<div class="single">
				<div class="game-type">
				    <div class="round-checkbox">
				      <input type="radio" value="single-player" id="single" name="game"/>
				      <label for="single"></label>
				    </div>
					<h4>Single Player</h4>
				</div>
				<div class="player-options">
					<h4>Player</h4>
					<select id="user">
						<option value="X" selected>X</option>
						<option value="O">O</option>
					</select>
				</div>
				<div class="player-options">
					<h4>Computer</h4>
					<select id="computer">
						<option value="X">X</option>
						<option value="O">O</option>
					</select>
				</div>
			</div>
			<div class="multi">
				<div class="game-type">
				    <div class="round-checkbox">
				      <input type="radio" value="multiplayer" id="multi" name="game"/>
				      <label for="multi"></label>
				    </div>
					<h4>Multiplayer</h4>
				</div>
				<div class="player-options">
					<h4>Player 1</h4>
					<select id="p1">
						<option value="X">X</option>
						<option value="O">O</option>
					</select>
				</div>
				<div class="player-options">
					<h4>Player 2</h4>
					<select id="p2">
						<option value="X">X</option>
						<option value="O">O</option>
					</select>
				</div>
			</div>
			<button id="start">Start</button>
		</div> <!-- END COLUMN -->
		<div class="col-md-3 col-sm-12">
			<div id="description">
				<h3>Minimax Algorithm</h3>
				<p>The A.I. for the computer was created using the minimax algorithm. This algorithm is a common tool for building artificial intelligence in zero sum games like chess, checkers, and tic tac toe. For a complex game like chess the algorithm has limitations because of how long the calculations can take. Additional tools can be used to help with these limitations.</p>
				<p>The algorithm is a recursive function that will take all available moves at a given state of the game and evaluate each move with a numeric score.</p>
				<p>The score is determined by essentially playing out each possible move as a separate game. This quickly turns into thousands of calculations every turn
				the computer gets. In a game like tic tac toe there are somewhere around 255,000 possible game states, but in a game like chess there are over 10<sup>40</sup> 
				possibilities.</p>
			</div>
		</div> <!-- END COLUMN -->
	</div> <!-- END ROW -->
</div> <!-- END CONTAINER -->

{% include tictactoe-footer.html %}