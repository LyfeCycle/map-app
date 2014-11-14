var constants = require('./constants');

var openBottomBar = function() {
	return Ti.UI.createAnimation({ 
		bottom: 0,
		duration: 500
	});
}

var closeBottomBar = function() {
	return Ti.UI.createAnimation({
		bottom: constants.bottomSize*-1,
		duration: 500
	});
}

var closeNavBar = function() {
	return Ti.UI.createAnimation({
		left: (constants.navLeft + constants.navWidth + 10)*-1,
		duration: 500
	});
}

var openNavBar = function() {
	return Ti.UI.createAnimation({
		left: constants.navLeft,
		duration: 500
	});
}

var closeNavButton = function() {
	return Ti.UI.createAnimation({
		left: (constants.navButtonLeft + constants.navButtonWidth + 10)*-1,
		duration: 500
	});
}

var closeNavOpenButton = function() {
	return Ti.UI.createAnimation({
		left: constants.navOpenButtonLeftWhenClosed,
		duration: 250
	});
}

var openNavOpenButton = function() {
	return Ti.UI.createAnimation({
		left: constants.navOpenButtonLeft,
		duration: 250
	});
}

module.exports.openBottomBar = openBottomBar;
module.exports.closeBottomBar = closeBottomBar;
module.exports.closeNavBar = closeNavBar;
module.exports.openNavBar = openNavBar;
module.exports.closeNavOpenButton = closeNavOpenButton;
module.exports.openNavOpenButton = openNavOpenButton;



