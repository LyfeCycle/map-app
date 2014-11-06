var constants = require('./constants');

function OptionView() {
	this.option_view = this.makeOptionView();
}

OptionView.prototype.getOptionView = function() {
	return this.option_view;
}

OptionView.prototype.makeOptionView = function() {
	var bg_view = Ti.UI.createView({
		height: constants.deviceHeight,
		width: constants.deviceWidth,
		backgroundColor: 'rgba(0,0,0,0.5)',
		visible: true
	});

	var option_modal = Ti.UI.createView({
		height: constants.modalHeight,
		width: constants.modalWidth,
		borderRadius: constants.modalBorderRadius,
		backgroundColor: constants.modalBackgroundColor
	});

	bg_view.add(option_modal);
	return bg_view;
}

module.exports = OptionView;