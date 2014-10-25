var constants = require('./constants');

var makeTopBar = function(topSize) {

	var topView = Titanium.UI.createView({
		height: topSize,
		width: Titanium.Platform.displayCaps.platformWidth,
		backgroundColor: constants.green,
		top: 0
	});

	var title = Titanium.UI.createLabel({
		color: 'white',
		text: 'LyfeCycle',
		font:{fontSize:30,fontFamily: constants.labelFontFamily, fontWeight:'bold'},
		width: 200,
		left: Titanium.Platform.displayCaps.platformWidth*0.1,
		textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
		top: topSize*0.25,
		shadowColor: '#aaa',
		shadowOffset: {x:1, y:1},
		shadowRadius: 3
	});

	topView.add(title);
	return topView;
}

module.exports.makeTopBar = makeTopBar;