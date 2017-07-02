---
layout: main
title: Tic-Tac-Toe
permalink: /portfolio/tictactoe
---

<div class="container" id="tictactoe">

	<div class="game-board">
		<div id="board">
			<div class="board-row">
				<div class="board-space 1-3 six" id="6">X</div>
				<div class="board-space 2-3 seven" id="7">O</div>
				<div class="board-space 3-3 eight" id="8">X</div>
			</div>
			<div class="board-row">
				<div class="board-space 1-2 three" id="3">O</div>
				<div class="board-space 2-2 four" id="4">X</div>
				<div class="board-space 3-2 five" id="5">O</div>
			</div>
			<div class="board-row">
				<div class="board-space 1-1 zero" id="0">X</div>
				<div class="board-space 2-1 one" id="1">O</div>
				<div class="board-space 3-1 two" id="2">X</div>
			</div>
		</div>
		<div id="controls">
			<div class="choose-symbol">
				<h3>Choose Symbol</h3>
				<div class="symbols">
					<label><input type="radio" name="symbol" class="x"><span>X</span></label>
					<label><input type="radio" name="symbol" class="o"><span>O</span></label>	
				</div>
			</div>

			<button class="start">Start</button>
		</div>
	</div>

	<div class="game-description">
		<h1>Tic Tac Toe</h1>
		<ul class="fa-ul">
			<li><i class="fa-li fa fa-angle-right"></i>Built with vanilla JavaScript and OOP principles</li>
			<li><i class="fa-li fa fa-angle-right"></i>The player with the X symbol will always go first</li>
			<li><i class="fa-li fa fa-angle-right"></i>Check out the git repository <a href="https://github.com/amfische/tictactoe" target="_blank">here</a></li>
		</ul>
		<h1>Minimax Algorithm</h1>
		<ul class="fa-ul">
			<li><i class="fa-li fa fa-angle-right"></i>The computer's A.I. is designed to be unbeatable; at best a player will tie.</li>
			<li><i class="fa-li fa fa-angle-right"></i>The A.I. uses the minimax algorithm and is a common tool in zero-sum games like chess and checkers.</li>
			<li><i class="fa-li fa fa-angle-right"></i>The algorithm works by evaluating all available moves and assigning a point value to each possibility. Point values are determined by calculating every way the game could end if that square were taken. This means each move branches out into a tree of possible game states that in turn must also be evaluated. The algorithm is therefore recursive because it will repeatedly call itself as the calculations bubble down the tree of possibilities.</li>
			<li><i class="fa-li fa fa-angle-right"></i>Surprisingly, there are around 255,000 possible game states in Tic Tac Toe.</li>
			<li><i class="fa-li fa fa-angle-right"></i>Click <a href="http://neverstopbuilding.com/minimax" target="_blank">here</a> to learn more.</li>
		</ul>
	</div>
</div>

{% include tictactoe-footer.html %}