var constants = require('./constants');

function BottomBar() {
	this.bottomSize = constants.bottomSize;
	this.deviceHeight = constants.deviceHeight;
	this.barOpen = false;
	this.makeBottomBar();
}

BottomBar.prototype.makeBottomBar = function() {

	/* * * * * * * * * * * * * * * * * * * * *
	 * 
	 *  Main view & Labels
	 *
	 * * * * * * * * * * * * * * * * * * * * */

	this.bottomBar = Ti.UI.createView({
		height: this.bottomSize, 
		top: this.deviceHeight,
		width: Titanium.Platform.displayCaps.platformWidth,
		backgroundColor: constants.green
	});

	this.distanceLabel = Ti.UI.createLabel({
		top: this.bottomSize*0.1,
		font: {fontSize: 25, fontFamily: constants.labelFontFamily, fontWeight:'bold'},
		width: 'auto',
		text: '50m',
		color: 'black'
	});

	this.textLabel = Ti.UI.createLabel({
		top: this.bottomSize*0.6,
		font: {fontSize: 25, fontFamily: constants.labelFontFamily, fontWeight:'bold'},
		width: 'auto',
		text: 'Make a Right!',
		color: 'black'
	});

	/* * * * * * * * * * * * * * * * * * * * *
	 * 
	 *  Images
	 *
	 * * * * * * * * * * * * * * * * * * * * */

	 this.dangerIcon = Ti.UI.createImageView({
	 	image: '/images/dangerIcon.png',
	 	height: this.bottomSize*0.7,
	 	top: this.bottomSize*0.3,
	 	width: this.bottomSize*0.3,
	 	visible: false
	 });

	 this.warningIcon = Ti.UI.createImageView({
	 	image: '/image/warningIcon.png',
	 	height: this.bottomSize*0.7,
	 	top: this.bottomSize*0.3,
	 	width: this.bottomSize*0.3,
	 	visible: false
	 });

	 this.leftArrow = Ti.UI.createImageView({
	 	image: '/image/leftArrow.png',
	 	height: this.bottomSize*0.7,
	 	top: this.bottomSize*0.3,
	 	width: this.bottomSize*0.3,
	 	visible: false
	 });

	 this.rightArrow = Ti.UI.createImageView({
	 	image: '/image/rightArrow.png',
	 	height: this.bottomSize*0.7,
	 	top: this.bottomSize*0.3,
	 	width: this.bottomSize*0.3,
	 	visible: false
	 });

	 this.turnAroundArrow = Ti.UI.createImageView({
	 	image: '/image/turnAroundArrow.png',
	 	height: this.bottomSize*0.7,
	 	top: this.bottomSize*0.3,
	 	width: this.bottomSize*0.3,
	 	visible: false
	 });

	 this.straightArrow = Ti.UI.createImageView({
	 	image: './image/straightArrow.png',
	 	//height: this.bottomSize*0.7,
	 	top: this.bottomSize*0.3,
	 	//width: this.bottomSize*0.3,
	 	visible: true
	 });

	 /* * * * * * * * * * * * * * * * * * * * *
	 * 
	 *  Add all views
	 *
	 * * * * * * * * * * * * * * * * * * * * */

	 this.bottomBar.add(this.distanceLabel);
	 this.bottomBar.add(this.textLabel);
	 this.bottomBar.add(this.dangerIcon);
	 this.bottomBar.add(this.warningIcon);
	 this.bottomBar.add(this.leftArrow);
	 this.bottomBar.add(this.rightArrow);
	 this.bottomBar.add(this.turnAroundArrow);
	 this.bottomBar.add(this.straightArrow);

}

BottomBar.prototype.updateDistance = function(distance) {
	this.distanceLabel.text = distance+'m';
}

BottomBar.prototype.dangerZone = function() {
	this.textLabel.text = "Danger Zone!"
}

BottomBar.prototype.clearText = function() {
	this.textLabel.text = '';
}

BottomBar.prototype.getBottomBar = function() {
	return this.bottomBar;
}

module.exports = BottomBar;
