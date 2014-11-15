
// Constants gloabl
module.exports.green = '#9ae588';
module.exports.cream = '#F1ECD6';
module.exports.secondaryColor = '#000000';
module.exports.labelFontFamily = 'Helvetica Neue';
module.exports.deviceHeight = Titanium.Platform.displayCaps.platformHeight;
module.exports.deviceWidth = Titanium.Platform.displayCaps.platformWidth;
module.exports.topSpace = 0;
module.exports.viewShadowOffset = 2;

// Constants for the bottom bar
module.exports.bottomSpace = 0;
module.exports.bottomSize = 55;
module.exports.buttomBarButtonRatio = 0.8;
module.exports.bottomBarButtonSize = module.exports.bottomSize*module.exports.buttomBarButtonRatio;
module.exports.bottomBarButtonSpace = module.exports.bottomSize*(1-module.exports.buttomBarButtonRatio)/2;
module.exports.socialButtonImage = 'images/social.png';
module.exports.socialButtonImageGray = 'images/social_gray.png';
module.exports.timeButtonImage = 'images/timer.png';
module.exports.timeButtonImageGray = 'images/timer_gray.png';
module.exports.optionButtonImage = 'images/gear.png';
module.exports.optionButtonImageGray = 'images/gear_gray.png';

// Constants for the map view
module.exports.defaultLat = 33.74511;
module.exports.defaultLong = 84.38993;
module.exports.defaultTime = 0; 
module.exports.titleText = 'LyfeCycle';
module.exports.shadowColor = '#aaa';
module.exports.shadowOffset = {x:1,y:1};
module.exports.shadowRadius = 3;
module.exports.cornerTabSize = 110;
module.exports.cornerTabSizeRatio = 0.75;

// Constants for option modal
module.exports.modalWidth = module.exports.deviceWidth*0.8;
module.exports.modalHeight = module.exports.modalWidth;
module.exports.modalBorderRadius = 25;
module.exports.modalBackgroundColor = 'white';
module.exports.modalColumnsPerRow = 3;

// Constants for the nav bar
module.exports.navStyle = Ti.UI.INPUT_BORDERSTYLE_ROUNDED;
module.exports.navColor = '#336699';
module.exports.navWidth = 250;
module.exports.navHeight = 35;
module.exports.navButtonWidth = 35;
module.exports.navTop = 30;
module.exports.navButtonLeftSpace = 5;
module.exports.navButtonLeft = module.exports.navWidth + module.exports.navButtonLeftSpace;
module.exports.navLeft = (module.exports.deviceWidth - 
	(module.exports.navButtonWidth + module.exports.navWidth + module.exports.navButtonLeftSpace))/2;
module.exports.navButtonImage = 'images/mag_glass.png';
module.exports.navCancelImage = 'images/cancel.png';
module.exports.navCancelWidth = 20;
module.exports.navCancelHeight = module.exports.navCancelWidth;
module.exports.navCancelWidthBuffer = 10;
module.exports.navCancelLeft = module.exports.navWidth - module.exports.navCancelWidth - module.exports.navCancelWidthBuffer/2;
module.exports.navCancelTop = (module.exports.navHeight - module.exports.navCancelHeight)/2;

// Constants for the nav open button
module.exports.navOpenButtonHeight = module.exports.navHeight;
module.exports.navOpenButtonWidth = module.exports.navOpenButtonHeight*2.2;
module.exports.navOpenButtonLeft = -1*module.exports.navOpenButtonWidth/2;
module.exports.navOpenButtonLeftWhenClosed = module.exports.navOpenButtonLeft + -1*module.exports.navOpenButtonWidth - 10;

// Constants for Navigation Directions
module.exports.startButtonWidth = 120;
module.exports.startButtonHeight = module.exports.startButtonWidth*6/16;
module.exports.startButtonText = "Start";
module.exports.startButtonColor = module.exports.green;
module.exports.startButtonTop = module.exports.navTop + module.exports.navHeight + 10;
module.exports.startButtonTopWhenClosed = -module.exports.startButtonHeight - 5;
module.exports.navBannerTop = 20;
module.exports.navBannerHeight = 60;
module.exports.navBannerColor = module.exports.green;
module.exports.navBannerTopWhenClosed = -1*module.exports.navBannerHeight - 5;
module.exports.navDirBuffer = 40;
module.exports.navDirCancelWidth = 30;
module.exports.navDirCancelHeight = module.exports.navDirCancelWidth;
module.exports.navDirCancelLeft = module.exports.deviceWidth - module.exports.navDirCancelWidth;
module.exports.navDirCancelTop = (module.exports.navBannerHeight - module.exports.navDirCancelHeight)/2;
module.exports.navDirTextWidth = module.exports.deviceWidth - module.exports.navDirCancelWidth*2;













