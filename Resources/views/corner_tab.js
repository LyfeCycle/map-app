var constants = require('./constants');

var cornerTab = function() {

	var corner_view = Ti.UI.createView({
		height: constants.cornerTabSize,
		width: constants.cornerTabSize,
		backgroundColor: constants.green,
		borderRadius: constants.cornerTabSize/2,
		top: constants.deviceHeight - constants.cornerTabSize*constants.cornerTabSizeRatio,
		left: constants.deviceWidth - constants.cornerTabSize*constants.cornerTabSizeRatio,
		borderWidth: 2,
		borderColor: constants.secondaryColor
	});

	var corner_pic = Ti.UI.createImageView({
		image: '/images/bike_wheel.png'
	});

	corner_view.add(corner_pic);

	return corner_view;
}

module.exports.cornerTab = cornerTab;