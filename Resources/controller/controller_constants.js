var apiConstants = require('../api_constants');

// Constants for destination
module.exports.startReq = 'https://maps.googleapis.com/maps/api/directions/json?origin=';
module.exports.endReq = '&key=' + apiConstants.apiKey + '&avoid=highways&mode=bicycling&sensor=false';
module.exports.destinationFailMessage = 'Unfortunately, we couldn\'t find that route.\nTry again.';
module.exports.timeoutReq = 8000;
module.exports.routeColor = 'blue';
module.exports.routeWidth = 4;
module.exports.deltaMultiplier = 2.4;

// 
module.exports.warningIcon = 'images/warning_icon.png'