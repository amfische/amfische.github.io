/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
	$('.navbar-side').css('width', '100vw');
	$('.main-content').css('margin-left', '100vw');

}

/*275px*/

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
	$('.navbar-side').css('width', '0px');
	$('.main-content').css('margin-left', '0px');
}