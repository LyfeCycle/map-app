var constants = require('./constants');
var animations = require('./animations');

/* * * * * * * * * * * * * * * * * * * * *
 * 
 *  the Events constructor should take in
 *  all views that will need to be 
 *  used in the events
 *
 * * * * * * * * * * * * * * * * * * * * */

function Events(bottom_menu_view, corner_tab_view) {

	// State Variables
	this.menuBarOpen = false;

	// Views
	this.bottom_menu_view = bottom_menu_view;
	this.corner_tab_view = corner_tab_view;

	// Noe actually add events to these views
	this.addEventListeners();
}

Events.prototype.isMenuBarOpen = function() {
	return this.menuBarOpen;
}

/* * * * * * * * * * * * * * * * * * * * *
 * 
 *  Events, which 
 *
 * * * * * * * * * * * * * * * * * * * * */

Events.prototype.toggleMenuBar = function(bottom_menu) {
	if (this.menuBarOpen) {
		this.bottom_menu_view.animate(animations.closeBottomBar());
		this.menuBarOpen = false;
	} else {
		this.bottom_menu_view.animate(animations.openBottomBar());
		this.menuBarOpen = true;
	}
}

/* * * * * * * * * * * * * * * * * * * * *
 * 
 *  All event listeners should go in here
 *
 * * * * * * * * * * * * * * * * * * * * */

// I am going to introduce a certain syntax:
	// (Type of event) View listener is on -> What will be affected when event occurs
Events.prototype.addEventListeners = function() {
	var self = this;

	// corner_tab listener, which will event bottom_menu
	// (Click) Corner_Tab -> Bottom_Menu
	self.corner_tab_view.addEventListener('click', function() {
		self.toggleMenuBar();
	});



}

module.exports = Events;