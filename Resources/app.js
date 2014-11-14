/* * * * * * * * * * * * * * * * * * * * *
 * 
 *  Requires
 *
 * * * * * * * * * * * * * * * * * * * * */

var win = Titanium.UI.createWindow();
var Map = require('views/map_view');
var TopBar = require('views/top_bar');
var constants = require('views/constants');
var corner_tab = require('views/corner_tab');
var MenuBar = require('views/bottom_menu');
var open_button = require('views/corner_tab');
var Events = require('controller/events');
var Markers = require('controller/markers');
var animations = require('views/animations');
var OptionView = require('views/option_view');
var NavBar = require('views/navigation_bar');

/* * * * * * * * * * * * * * * * * * * * *
 * 
 *  Variables
 *
 * * * * * * * * * * * * * * * * * * * * */


 // This is in case we don't have Geolocation

var mainMap = new Map(constants.defaultLat, constants.defaultLong, constants.defaultTime);
var bottom_menu = new MenuBar();
var option_view = new OptionView();
var nav_bar = new NavBar();


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
        }
    });

    // Updates when location changes
    Ti.Geolocation.addEventListener('location', function(e) {
        if (e.error) {
            alert('Couldn\'t get location');
        } else {
            Ti.API.info(e.coords);
            mainMap.updateValues(e.coords.latitude, e.coords.longitude, e.coords.timestamp);
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

var corner_tab_view = corner_tab.cornerTab();
var bottom_menu_view = bottom_menu.getMenuBar();
var map_view = mainMap.getMapView();
var nav_view = nav_bar.getNavBar();
var nav_open_view = nav_bar.getOpenButton();

/* * * * * * * * * * * * * * * * * * * * *
 * 
 *  Add controllers
 *
 * * * * * * * * * * * * * * * * * * * * */

 var events = new Events(mainMap,
                         bottom_menu_view, 
                         corner_tab_view, 
                         bottom_menu.getSocialButton(),
                         bottom_menu.getTimeButton(),
                         bottom_menu.getOptionButton(),
                         nav_bar
                         );
 var markers = new Markers(mainMap);
 markers.retrieveAndAddMarkers();

/* * * * * * * * * * * * * * * * * * * * *
 * 
 *  Add views to window
 *
 * * * * * * * * * * * * * * * * * * * * */

win.add(map_view);
win.add(bottom_menu_view);
win.add(corner_tab_view);
win.add(nav_view);
win.add(nav_open_view);
//win.add(option_view.getOptionView());
//win.add(bottom_menu.getBottomMenu());
win.open();









