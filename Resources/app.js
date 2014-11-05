/* * * * * * * * * * * * * * * * * * * * *
 * 
 *  Requires
 *
 * * * * * * * * * * * * * * * * * * * * */

var win = Titanium.UI.createWindow();
var Map = require('views/map_functions');
var TopBar = require('views/top_bar');
var constants = require('views/constants');
var corner_tab = require('views/corner_tab');
var bottom_menu = require('views/bottom_menu');
var open_button = require('views/corner_tab');
var Events = require('views/events');
var animations = require('views/animations');

/* * * * * * * * * * * * * * * * * * * * *
 * 
 *  Variables
 *
 * * * * * * * * * * * * * * * * * * * * */


 // This is in case we don't have Geolocation

var mainMap = new Map(constants.defaultLat, constants.defaultLong, constants.defaultTime);
var menuBarOpen = false;


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
           // bottomBar.updateDistance(Math.round(Math.random()*1000));
        }
    });

    // Updates when location changes
    Ti.Geolocation.addEventListener('location', function(e) {
        if (e.error) {
            alert('Couldn\'t get location');
        } else {
            Ti.API.info(e.coords);
            mainMap.updateValues(e.coords.latitude, e.coords.longitude, e.coords.timestamp);
          //  bottomBar.updateDistance(Math.round(Math.random()*1000));
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

//var topbarView = TopBar.makeTopBar();
var corner_tab_view = corner_tab.cornerTab();
var bottom_menu_view = bottom_menu.createMenuBar();

/* * * * * * * * * * * * * * * * * * * * *
 * 
 *  Add event listeners
 *
 * * * * * * * * * * * * * * * * * * * * */

corner_tab_view.addEventListener('click', function() {
    if (menuBarOpen) {
        bottom_menu_view.animate(animations.closeBottomBar());
        menuBarOpen = false;
    } else {
        bottom_menu_view.animate(animations.openBottomBar());
        menuBarOpen = true;
    }
});

/* * * * * * * * * * * * * * * * * * * * *
 * 
 *  Add views to window
 *
 * * * * * * * * * * * * * * * * * * * * */

win.add(mainMap.getMapView());
win.add(corner_tab_view);
win.add(bottom_menu_view);
//win.add(bottom_menu.getBottomMenu());
win.open();









