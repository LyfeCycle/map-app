var constants = require('./constants');

function NavigationBar() {
	this.nav_button = this.createNavButton();
	this.nav_text = this.createTextField();
	this.nav_bar = this.createNavBar();
}

NavigationBar.prototype.createTextField = function() {
	return bar = Ti.UI.createTextField({
		borderStyle: constants.navStyle,
		color: 'rgba(1,1,1,0.5)',
		top: 0, 
		left: 0,
		width: constants.navWidth, 
		height: constants.navHeight
	});
}

NavigationBar.prototype.createNavBar = function() {
	var nav_view = Ti.UI.createView({
		top: constants.navTop,
		left: constants.navLeft,
		width: constants.navWidth + constants.navButtonWidth,
		height: constants.navHeight
	});

	nav_view.add(this.nav_text);
	nav_view.add(this.nav_button);
	return nav_view;
}

NavigationBar.prototype.createNavButton = function() {
	return Ti.UI.createImageView({
		left: constants.navWidth + constants.navButtonLeftSpace,
		top: 0,
		height: constants.navHeight,
		width: constants.navButtonWidth,
		image: constants.navButtonImage
	});
}

NavigationBar.prototype.getNavBar = function() {
	return this.nav_bar;
}

NavigationBar.prototype.getNavButton = function() {
	return this.nav_button;
}

NavigationBar.prototype.getTextField = function() {
	return this.nav_text;
}

module.exports = NavigationBar;