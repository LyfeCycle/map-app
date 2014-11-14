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
		duration: 300
	});
}

var openNavBar = function() {
	return Ti.UI.createAnimation({
		left: constants.navLeft,
		duration: 300
	});
}

var closeNavOpenButton = function() {
	return Ti.UI.createAnimation({
		left: constants.navOpenButtonLeftWhenClosed,
		duration: 200
	});
}

var openNavOpenButton = function() {
	return Ti.UI.createAnimation({
		left: constants.navOpenButtonLeft,
		duration: 200
	});
}

var openNavDirStartButton = function() {
	return Ti.UI.createAnimation({
		top: constants.startButtonTop,
		duration: 200
	});
}

var closeNavDirStartButton = function() {
	return Ti.UI.createAnimation({
		top: constants.startButtonTopWhenClosed,
		duration: 1,
		delay: 200
	});
}

var fadeNavDirStartButton = function() {
	return Ti.UI.createAnimation({
		duration: 200,
		opacity: 0
	});
}

var solidNavDirStartButton = function() {
	return Ti.UI.createAnimation({
		duration: 10,
		opacity: 1,
		delay: 300
	});
}

module.exports.openBottomBar = openBottomBar;
module.exports.closeBottomBar = closeBottomBar;
module.exports.closeNavBar = closeNavBar;
module.exports.openNavBar = openNavBar;
module.exports.closeNavOpenButton = closeNavOpenButton;
module.exports.openNavOpenButton = openNavOpenButton;
module.exports.openNavDirStartButton = openNavDirStartButton;
module.exports.closeNavDirStartButton = closeNavDirStartButton;
module.exports.fadeNavDirStartButton = fadeNavDirStartButton;
module.exports.solidNavDirStartButton = solidNavDirStartButton;



