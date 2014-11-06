var constants = require('./constants');
var animations = require('./animations');

/* * * * * * * * * * * * * * * * * * * * *
 * 
 *  the Events constructor should take in
 *  all views that will need to be 
 *  used in the events
 *
 * * * * * * * * * * * * * * * * * * * * */

function Events(bottom_menu_view, corner_tab_view, social_button, time_button, option_button) {

	// State Variables
	this.menuBarOpen = false;

	// Views
	this.bottom_menu_view = bottom_menu_view;
	this.corner_tab_view = corner_tab_view;
	this.social_button = social_button;
	this.time_button = time_button;
	this.option_button = option_button;

	// Noe actually add events to these views
	this.addEventListeners();
}

Events.prototype.isMenuBarOpen = function() {
	return this.menuBarOpen;
}

/* * * * * * * * * * * * * * * * * * * * *
 * 
 *  Events, which will be added in 
 *  addEventListeners
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

Events.prototype.socialButton = function() {
	alert("socialButton");
}

Events.prototype.timeButton = function() {
	alert("timeButton");
}

Events.prototype.optionButton = function() {
	alert("optionButton");
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

	self.social_button.addEventListener('click', function() {
		self.socialButton();
	});

	self.time_button.addEventListener('click', function() {
		self.timeButton();
	});

	self.option_button.addEventListener('click', function() {
		self.optionButton();
	});

}

module.exports = Events;