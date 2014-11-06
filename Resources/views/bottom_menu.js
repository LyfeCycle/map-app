var constants = require('./constants');

function MenuBar() {
    this.social_button = this.createSocialButton();
    this.time_button = this.createTimeButton();
    this.option_button = this.createOptionButton();
    this.menu_bar = this.createMenuBar();
}

/* * * * * * * * * * * * * * * * * * * * *
 * 
 *  Creators
 *
 * * * * * * * * * * * * * * * * * * * * */

MenuBar.prototype.createSocialButton = function() {
    return image = Ti.UI.createImageView({
        height: constants.bottomBarButtonSize,
        width: 'auto',
        top: constants.bottomBarButtonSpace,
        image: 'images/social.png'
    });
}

MenuBar.prototype.createTimeButton = function() {
    return image = Ti.UI.createImageView({
        height: constants.bottomBarButtonSize,
        width: 'auto',
        top: constants.bottomBarButtonSpace,
        image: 'images/timer.png'
    });
}

MenuBar.prototype.createOptionButton = function() {
    return image = Ti.UI.createImageView({
        height: constants.bottomBarButtonSize,
        width: 'auto',
        top: constants.bottomBarButtonSpace,
        image: 'images/gear.png'
    });
}

MenuBar.prototype.createMenuBar = function() {

	var menu = Ti.UI.createView({
        width: constants.deviceWidth,
        height: constants.bottomSize,
        bottom: constants.bottomSize*-1,
        left: 0,
        backgroundColor: constants.green
    });


    // Space buttons
	var rowWidth = constants.deviceWidth - constants.cornerTabSize*constants.cornerTabSizeRatio;
    var leftFirst = (rowWidth*0.25);//-constants.bottomBarButtonSize/2;
    var leftSecond = (rowWidth*0.50);//-constants.bottomBarButtonSize/2;
    var leftThird = (rowWidth*0.75);//-constants.bottomBarButtonSize/2;
    this.social_button.left = leftFirst;
    this.time_button.left = leftSecond;
    this.option_button.left = leftThird;

    menu.add(this.social_button);
    menu.add(this.time_button);
    menu.add(this.option_button);

	return menu;
}

/* * * * * * * * * * * * * * * * * * * * *
 * 
 *  Getters
 *
 * * * * * * * * * * * * * * * * * * * * */

 MenuBar.prototype.getMenuBar = function() {
    return this.menu_bar;
 }

 MenuBar.prototype.getSocialButton = function() {
    return this.social_button;
 }

 MenuBar.prototype.getTimeButton = function() {
    return this.time_button;
 }

 MenuBar.prototype.getOptionButton = function() {
    return this.option_button;
 }


module.exports = MenuBar;
