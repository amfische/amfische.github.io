"use strict"

//each space is an object
function BoardSpace(x,y) {
	this.occupied = false;
	this.value = "";
	this.XCoordinate = x;
	this.YCoordinate = y;
}