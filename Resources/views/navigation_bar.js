var constants = require('./constants');

function NavigationBar() {
	this.open_button = this.createOpenButton();
	this.nav_button = this.createNavButton();
	this.nav_text = this.createTextField();
	this.cancel_button = this.createCancelButton();
	this.nav_bar = this.createNavBar();
	
}

NavigationBar.prototype.createTextField = function() {
	return bar = Ti.UI.createTextField({
		borderStyle: constants.navStyle,
		backgroundColor: '#FFF',
		color: '#000',
		opacity: 0.7,
		font: {fontSize:16, fontFamily: constants.labelFontFamily, },
		top: 0, 
		left: 0,
		width: constants.navWidth, 
		height: constants.navHeight,
		paddingRight: constants.navCancelWidth + constants.navCancelWidthBuffer
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
	nav_view.add(this.cancel_button);
	return nav_view;
}

NavigationBar.prototype.createNavButton = function() {
	return Ti.UI.createImageView({
		left: constants.navButtonLeft,
		top: 0,
		height: constants.navHeight,
		width: constants.navButtonWidth,
		image: constants.navButtonImage
	});
}

NavigationBar.prototype.createCancelButton = function() {
	Ti.API.info('cancel button');
	return Ti.UI.createImageView({
		top: constants.navCancelTop,
		left: constants.navCancelLeft,
		height: constants.navCancelWidth,
		width: constants.navCancelWidth,
		image: constants.navCancelImage,
		zIndex: 10
	});
}

NavigationBar.prototype.createOpenButton = function() {
	var open_view_rounded = Ti.UI.createView({
		top: constants.navTop,
		left: constants.navOpenButtonLeftWhenClosed,
		height: constants.navOpenButtonHeight,
		width: constants.navOpenButtonWidth,
		backgroundColor: constants.green,
		borderRadius: constants.navOpenButtonHeight/2
	});

	var arrow = Ti.UI.createLabel({
		text: '>',
		font:{fontSize:20,fontFamily: constants.labelFontFamily, fontWeight:'bold'},
		color: 'white',
		left: constants.navOpenButtonWidth*0.75,
		width: 'auto',
		height: 'auto'
	});

	open_view_rounded.add(arrow);
	return open_view_rounded;
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

NavigationBar.prototype.getCancelButton = function() {
	return this.cancel_button;
}

NavigationBar.prototype.getOpenButton = function() {
	return this.open_button;
}

module.exports = NavigationBar;