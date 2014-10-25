/* * * * * * * * * * * * * * * * * * * * *
 * 
 *  Requires
 *
 * * * * * * * * * * * * * * * * * * * * */

var win = Titanium.UI.createWindow();
var Map = require('./map_functions');
var TopBar = require('./top_bar');
var BottomBar = require('./bottom_bar');
var constants = require('./constants');

/* * * * * * * * * * * * * * * * * * * * *
 * 
 *  Variables
 *
 * * * * * * * * * * * * * * * * * * * * */


 // This is in case we don't have Geolocation
var defaultLat = 33.74511, defaultLong = 84.38993, defaultTime = 0; 
var deviceHeight = Titanium.Platform.displayCaps.platformHeight, 
     deviceWidth = Titanium.Platform.displayCaps.platformWidth,
     topSpace = 60,
     bottomSpace = 120;
var mainMap = new Map(defaultLat, defaultLong, defaultTime, topSpace, bottomSpace, deviceHeight);
var bottomBar = new BottomBar(bottomSpace, deviceHeight);


/* * * * * * * * * * * * * * * * * * * * *
 * 
 *  Get locations & initialize Map
 *
 * * * * * * * * * * * * * * * * * * * * */

if (Ti.Geolocation.locationServicesEnabled) {
    Ti.Geolocation.purpose = 'Get Current Location';
    Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
    Ti.Geolocation.distanceFilter = 10;
    Ti.Geolocation.preferredProvider = Ti.Geolocation.PROVIDER_GPS;

    Ti.Geolocation.getCurrentPosition(function(e) { // Gets starting position
        if (e.error) {
            alert('Couldn\'t get location');

        } else {
            mainMap.updateValues(e.coords.latitude, e.coords.longitude, e.coords.timestamp);
            bottomBar.updateDistance(Math.round(Math.random()*1000));
        }
    });

    // Updates when location changes
    Ti.Geolocation.addEventListener('location', function(e) {
        if (e.error) {
            alert('Couldn\'t get location');
        } else {
            Ti.API.info(e.coords);
            mainMap.updateValues(e.coords.latitude, e.coords.longitude, e.coords.timestamp);
            bottomBar.updateDistance(Math.round(Math.random()*1000));
        }
    });
} else {
    alert('Please enable location services');
}

/* * * * * * * * * * * * * * * * * * * * *
 * 
 *  Create views
 *
 * * * * * * * * * * * * * * * * * * * * */

var topbarView = TopBar.makeTopBar(topSpace);



/* * * * * * * * * * * * * * * * * * * * *
 * 
 *  Add views to window
 *
 * * * * * * * * * * * * * * * * * * * * */
win.add(topbarView);
win.add(bottomBar.getBottomBar());
win.add(mainMap.getMapView());
win.open();



