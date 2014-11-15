var constants = require('./constants');

function NavigationDirectionsView() {
	this.start_button = this.createStartButton();
	this.navigation_text = this.createNavText();
	this.navigation_sub_text = this.createNavSubText();
	this.cancel_button = this.createNavCancelButton();
	this.nav_banner = this.createNavBanner();
}

NavigationDirectionsView.prototype.createStartButton = function() {
	var start = Ti.UI.createView({
		width: constants.startButtonWidth,
		height: constants.startButtonHeight,
		top: constants.startButtonTopWhenClosed,
		backgroundColor: constants.startButtonColor,
		borderRadius: 20
	});

	var startLabel = Ti.UI.createLabel({
		color: 'white',
		font: {fontSize:16, fontFamily: constants.labelFontFamily },
		width: 'auto',
		height: 'auto',
		text: 'Start'
	});

	start.add(startLabel);
	return start;
}

NavigationDirectionsView.prototype.createNavCancelButton = function() {
	var container = Ti.UI.createView({
		backgroundColor: constants.navBannerColor,
		width: constants.navDirCancelWidth,
		height: constants.navDirCancelHeight,
		left: constants.navDirCancelLeft,
		top: constants.navDirCancelTop
	});

	var x = Ti.UI.createLabel({
		text: 'X',
		color: 'white',
		font: {fontSize:18, fontFamily: constants.labelFontFamily },
		width: 'auto',
		height: 'auto'
	});

	container.add(x);
	return container;
}

NavigationDirectionsView.prototype.createNavText = function() {
	return Ti.UI.createLabel({
		minimumFontSize: 14,
		color: 'white',
		font: {fontSize:25, fontFamily: constants.labelFontFamily },
		width: constants.navDirTextWidth,
		top: 3,
		textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER
	});
}

NavigationDirectionsView.prototype.createNavSubText = function() {
	return Ti.UI.createLabel({
		minimumFontSize: 14,
		color: 'white',
		font: {fontSize:25, fontFamily: constants.labelFontFamily },
		width: constants.navDirTextWidth,
		bottom: 3,
		textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER
	});
}

NavigationDirectionsView.prototype.createNavBanner = function() {
	var background = Ti.UI.createView({
		top: constants.navBannerTopWhenClosed,
		backgroundColor: constants.navBannerColor,
		height: constants.navBannerHeight,
		width: constants.deviceWidth
	});

	background.add(this.navigation_text);
	background.add(this.navigation_sub_text);
	background.add(this.cancel_button);
	return background;
}

NavigationDirectionsView.prototype.setNavText = function(new_text) {
	this.navigation_text.text = new_text;
}

NavigationDirectionsView.prototype.getStartButton = function() {
	return this.start_button;
}

NavigationDirectionsView.prototype.getCancelButton = function() {
	return this.cancel_button;
}

NavigationDirectionsView.prototype.getNavBanner = function() {
	return this.nav_banner;
}

NavigationDirectionsView.prototype.getNavText = function() {
	return this.navigation_text;
}

NavigationDirectionsView.prototype.getNavSubText = function() {
	return this.navigation_sub_text;
}

module.exports = NavigationDirectionsView;