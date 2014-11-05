var constants = require('./constants');

var openBottomBar = function() {
	return Ti.UI.createAnimation({ 
		bottom: 0,
		duration: 500
	});
}

var closeBottomBar = function() {
	return Ti.UI.createAnimation({
		bottom: -30,
		duration: 500
	});
}

module.exports.openBottomBar = openBottomBar;
module.exports.closeBottomBar = closeBottomBar;



