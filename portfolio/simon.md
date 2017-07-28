---
layout: main
title: Simon Game
permalink: /portfolio/simon
---

<div class="container" id="simon">
	<div class="game-circle">
		<div class="buttons">
			<div class="green"></div>
			<div class="red"></div>
			<div class="yellow"></div>
			<div class="blue"></div>
		</div>
		<div class="controls-circle">
			<h1>Simon<sup>&reg;</sup></h1>
			<div class="settings">
				<div class="settings-col">
					<input class="level-count" type="text" disabled value="00">
					<p>Count</p>
				</div>
				<div class="settings-col">
					<button class="start"></button>
					<p>Start</p>
				</div>
				<div class="settings-col">
					<div class="strict-light"></div>
					<button class="strict"></button>
					<p>Strict</p>
				</div>
			</div>
			<div class="switch">
			  <input type="checkbox" id="on-off">
			  <label class="slider round" for="on-off"></label>
			</div>
		</div>
	</div>
	<div class="game-description">
		<ul>
			<li><i class="fa fa-angle-right"></i> A replica of the original 1970's game Simon.</li>
			<li><i class="fa fa-angle-right"></i> Built with vanilla JavaScript and OOP principles</li>
			<li><i class="fa fa-angle-right"></i> Uses flexbox for board layout</li>
			<li><i class="fa fa-angle-right"></i> Player wins after successfully completing level 20</li>
			<li><i class="fa fa-angle-right"></i> Strict mode causes the game to reset if any mistakes are made</li>
			<li><i class="fa fa-angle-right"></i> Check out the git repository <a href="https://github.com/amfische/simon" target="_blank">here</a></li>
		</ul>
	</div>
</div>

{% include simon-footer.html %}