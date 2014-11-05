var constants = require('./constants');

var cornerTab = function() {

	return Ti.UI.createView({
		height: constants.cornerTabSize,
		width: constants.cornerTabSize,
		backgroundColor: constants.green,
		borderRadius: constants.cornerTabSize/2,
		top: constants.deviceHeight - constants.cornerTabSize/2,
		left: constants.deviceWidth - constants.cornerTabSize/2
	});
}

module.exports.cornerTab = cornerTab;