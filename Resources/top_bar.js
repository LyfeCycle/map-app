var constants = require('./constants');

var makeTopBar = function() {

	var topView = Titanium.UI.createView({
		height: constants.topSpace,
		width: constants.deviceWidth,
		backgroundColor: constants.green,
		top: 0
	});

	var title = Titanium.UI.createLabel({
		color: 'white',
		text: constants.titleText,
		font:{fontSize:30,fontFamily: constants.labelFontFamily, fontWeight:'bold'},
		width: 200,
		left: Titanium.Platform.displayCaps.platformWidth*0.1,
		textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
		top: constants.topSpace*0.25,
		shadowColor: constants.shadowColor,
		shadowOffset: constants.shadowOffset,
		shadowRadius: constants.shadowRadius
	});

	topView.add(title);
	return topView;
}

module.exports.makeTopBar = makeTopBar;