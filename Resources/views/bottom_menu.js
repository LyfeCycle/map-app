var constants = require('./constants');

var createMenuBar = function() {

	var menu = Ti.UI.createView({
        width: constants.deviceWidth,
        height: 30,
        bottom: -30,
        left: 0,
        //bottom: -constants.bottomSize,
        backgroundColor: constants.green
    });

    var text = Ti.UI.createLabel({
        text: constants.titleText,
        font: {fontSize: 21, fontFamily: constants.labelFontFamily, fontWeight:'bold'},
        color: 'white',
        shadowColor: constants.shadowColor,
        shadowOffset: constants.shadowOffset,
        shadowRadius: constants.shadowRadius
    });

	menu.add(text);

	return menu;
}

module.exports.createMenuBar = createMenuBar;
