var constants = require('./constants');

var makeSplashScreen = function makeSplashScreen() {

	var buttonHeight = 80;
	var buttonBuffer = 30;
	var buttonBorderRadius = 8;
	var buttonBorderWidth = 3;

	/* * * * * * * * * * * * * * * * * * * * *
	 * 
	 *  Splash top bar
	 *
	 * * * * * * * * * * * * * * * * * * * * */

	var topBar = Ti.UI.createView({
		height: constants.topSpace,
		width: constants.deviceWidth,
		backgroundColor: constants.green,
		top: 0
	});

	var splashTitle = Ti.UI.createLabel({
		text: constants.titleText,
		font:{fontSize:30,fontFamily: constants.labelFontFamily, fontWeight:'bold'},
		width: 200,
		left: Titanium.Platform.displayCaps.platformWidth*0.1,
		textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
		top: this.topSpace*0.25
	});

	topBar.add(splashTitle);

	/* * * * * * * * * * * * * * * * * * * * *
	 * 
	 *  Main view
	 *
	 * * * * * * * * * * * * * * * * * * * * */

	var splashMainView = Ti.UI.createView({
		height: constants.deviceHeight - constants.topSpace,
		top: constants.topSpace,
		backgroundColor: constants.cream,
		width: constants.deviceWidth
	});

	/* * * * * * * * * * * * * * * * * * * * *
	 * 
	 *  Buttons
	 *
	 * * * * * * * * * * * * * * * * * * * * */

	var navigationButton = Ti.UI.createView({
		height: buttonHeight,
		width: constants.deviceWidth*0.6,
		top: constants.topSpace + buttonBuffer,
		backgroundColor: constants.green,
		borderRadius: buttonBorderRadius,
		borderColor: 'black',
		borderWidth: buttonBorderWidth
	});

	var navigationButtonText = Ti.UI.createLabel({
		color: 'white',
		text: 'Route',
		font: {fontSize: 20, fontFamily: constants.labelFontFamily},
		shadowColor: constants.shadowColor,
		shadowOffset: constants.shadowOffset,
		shadowRadius: constants.shadowRadius
	});

	navigationButton.add(navigationButtonText);

	navigationButton.addEventListener('click', function(e) {

	});

}