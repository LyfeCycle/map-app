var constants = require('../views/constants');
var animations = require('../views/animations');
var Destination = require('./destination');
var Annotation = require('controller/annotations');

/* * * * * * * * * * * * * * * * * * * * *
 * 
 *  the Events constructor should take in
 *  all views that will need to be 
 *  used in the events
 *
 * * * * * * * * * * * * * * * * * * * * */

function Events(mainMap, bottom_menu_view, corner_tab_view, social_button, time_button, option_button, nav_bar, nav_dir) {

	// State Variables
	this.menuBarOpen = false;
	this.socialButtonGrayed = false;
	this.timeButtonGrayed = false;
	this.optionButtonGrayed = false;

	// Views
	this.mainMap = mainMap;
	this.bottom_menu_view = bottom_menu_view;
	this.corner_tab_view = corner_tab_view;
	this.social_button = social_button;
	this.time_button = time_button;
	this.option_button = option_button;
	this.nav_button = nav_bar.getNavButton();
	this.nav_text = nav_bar.getTextField();
	this.nav_cancel = nav_bar.getCancelButton();
	this.nav_open = nav_bar.getOpenButton();
	this.nav_bar_view = nav_bar.getNavBar();
	this.nav_dir_start_button = nav_dir.getStartButton();
	this.nav_dir_banner = nav_dir.getNavBanner();
	this.nav_dir_cancel_button = nav_dir.getCancelButton();

	// Controllers
	this.annotations = new Annotation(this.mainMap);
	this.destination = new Destination(this.mainMap, this.annotations);

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
	if (!this.socialButtonGrayed) { 
		this.social_button.image = constants.socialButtonImageGray;
		this.socialButtonGrayed = !this.socialButtonGrayed;
	} else {
		this.social_button.image = constants.socialButtonImage;
		this.socialButtonGrayed = !this.socialButtonGrayed;
	}
}

Events.prototype.timeButton = function() {
	if (!this.timeButtonGrayed) { 
		this.time_button.image = constants.timeButtonImageGray;
		this.timeButtonGrayed = !this.timeButtonGrayed;
	} else {
		this.time_button.image = constants.timeButtonImage;
		this.timeButtonGrayed = !this.timeButtonGrayed;
	}
}

Events.prototype.optionButton = function() {
	if (!this.optionButtonGrayed) { 
		this.option_button.image = constants.optionButtonImageGray;
		this.optionButtonGrayed = !this.optionButtonGrayed;
	} else {
		this.option_button.image = constants.optionButtonImage;
		this.optionButtonGrayed = !this.optionButtonGrayed;
	}
}

Events.prototype.searchNav = function() {
	var destinationText = this.nav_text.value;
	Ti.API.info(destinationText);
	if (typeof destinationText === 'undefined' || destinationText == "") {
		alert("Please enter a destination!")
	} else {
		var currentLocation = mainMap.getCurrentLocation();
		this.destination.addDestinationToMap(destinationText);
		this.nav_dir_start_button.animate(animations.openNavDirStartButton());
	}
}

Events.prototype.cancelNav = function() {
	var destinationText = this.nav_text.value;
	if (destinationText != "") {
		this.nav_text.value = "";
	} else {
		// Animate nav out
		this.nav_bar_view.animate(animations.closeNavBar());
		this.nav_open.animate(animations.openNavOpenButton());
		// Cancel Navigation
		this.destination.removeRouteFromMap();
	}
	// animate openNav in
	this.nav_dir_start_button.animate(animations.fadeNavDirStartButton());
	this.nav_dir_start_button.animate(animations.closeNavDirStartButton());
	this.nav_dir_start_button.animate(animations.solidNavDirStartButton());
}

Events.prototype.openNav = function() {
	// Animate nav in
	this.nav_bar_view.animate(animations.openNavBar());
	// animate openNav out
	this.nav_open.animate(animations.closeNavOpenButton());
}

Events.prototype.startNavigation = function() {
	this.nav_dir_banner.animate(animations.openNavDirBanner());
	// Pass off to navigation controller
	this.nav_dir_start_button.animate(animations.fadeNavDirStartButton());
	this.nav_dir_start_button.animate(animations.closeNavDirStartButton());
	this.nav_dir_start_button.animate(animations.solidNavDirStartButton());
	// Now, take out the navigation bar and place the navOpen behind it, and clear route text
	this.nav_text.value = "";

}

Events.prototype.endNavigation = function() {
	this.nav_dir_banner.animate(animations.closeNavDirBanner());
	// Delete navigation and route from controllers
	this.cancelNav();
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

	self.nav_button.addEventListener('click', function() {
		self.searchNav();
	});

	self.nav_cancel.addEventListener('click', function() {
		self.cancelNav();
	});

	self.nav_open.addEventListener('click', function() {
		self.openNav();
	});

	self.nav_dir_start_button.addEventListener('click', function() {
		Ti.API.info("Clicked start");
		self.startNavigation();
	});

	self.nav_dir_cancel_button.addEventListener('click', function() {
		self.endNavigation();
	});
}

module.exports = Events;