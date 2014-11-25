/* * * * * * * * * * * * * * * * * * * * *
 * 
 *  Requires
 *
 * * * * * * * * * * * * * * * * * * * * */

var win = Titanium.UI.createWindow();

// Views
var Map = require('views/map_view');
var TopBar = require('views/top_bar');
var constants = require('views/constants');
var corner_tab = require('views/corner_tab');
var MenuBar = require('views/bottom_menu');
var open_button = require('views/corner_tab');
var animations = require('views/animations');
var OptionView = require('views/option_view');
var NavBar = require('views/navigation_bar');
var NavDirView = require('views/nav_directions_view');

// Controllers
var Events = require('controller/events');
var Markers = require('controller/markers');
var NavDirections = require('controller/nav_directions');
var Cyclists = require('controller/cyclists')

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
var nav_dir_view = new NavDirView();
var coordinates = [0, 0];


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
            coordinates[0] = e.coords.latitude;
            coordinates[1] = e.coords.longitude;
            mainMap.updateValues(e.coords.latitude, e.coords.longitude, e.coords.timestamp);
        }
    });

    // Updates when location changes
    Ti.Geolocation.addEventListener('location', function(e) {
        if (e.error) {
            alert('Couldn\'t get location');
        } else {
            Ti.API.info(e.coords);
            coordinates[0] = e.coords.latitude;
            coordinates[1] = e.coords.longitude;
            mainMap.updateValues(e.coords.latitude, e.coords.longitude, e.coords.timestamp);
        }
    });
} else {
    alert('Please enable location services');
}

/* * * * * * * * * * * * * * * * * * * * *
 * 
 *  Crash_Detect
 *
 * * * * * * * * * * * * * * * * * * * * */

// Crash Detection using Core Motion
var CoreMotion = require('ti.coremotion');

if (CoreMotion.isAccelerometerAvailable()) {
    // Start the service
    accelerometer_state = true;
    // Send data at 1 s (1000 ms) intervals
    CoreMotion.setAccelerometerUpdateInterval(1000);
    // Start with a callback
    CoreMotion.startAccelerometerUpdates(updateAccelData);
}

var accelX = accelY = accelZ = 0;
var lastX = lastY = lastZ = 0;
var CRASH_THRESHOLD = 2;


function updateAccelData (e) {
    
    if (e.success) {     
        var data = e.acceleration;
        if (Math.abs(lastX - data.x) > CRASH_THRESHOLD || Math.abs(lastY - data.y) > CRASH_THRESHOLD || Math.abs(lastY - data.y) > CRASH_THRESHOLD) {
            accelX++;
            alert("Crash detected!");
            var emailDialog = Ti.UI.createEmailDialog();
            emailDialog.subject = "Crash Detected for Alex Wong";
            emailDialog.toRecipients = ['contact@lyfecycle.me'];
            emailDialog.messageBody = '<b>Alex Wong may have been in an accident at location</b>' + coordinates;
            emailDialog.open();
            ///// Upload point to api
            var xhr = Ti.Network.createHTTPClient();

            xhr.onload = function(e) {
                console.log('onload');
                console.log('response: ' + this.responseText);
                //handle response, which at minimum will be an HTTP status code
            };
            xhr.open('POST','http://lyfecycle-api.herokuapp.com/locations');
            xhr.setRequestHeader('Content-Type','application/json');
            xhr.send({
                name:'Alex Crashed',
                longitude: coordinates[0],
                latitude: coordinates[1]
            });
        }
        lastX = data.x;
        lastY = data.y;
        lastZ = data.z;

        data = e.attitude;
        
    } else {
        if (e.error) Ti.API.error(e.error);
    }
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
var nav_open_bar_view = nav_bar.getOpenButton();
var nav_dir_banner = nav_dir_view.getNavBanner();
var nav_dir_start = nav_dir_view.getStartButton();

/* * * * * * * * * * * * * * * * * * * * *
 * 
 *  Add controllers
 *
 * * * * * * * * * * * * * * * * * * * * */

 var directions = new NavDirections(nav_dir_view, mainMap);
 var cyclists = new Cyclists(mainMap);
 var events = new Events(directions,
                         mainMap,
                         bottom_menu_view, 
                         corner_tab_view, 
                         bottom_menu.getSocialButton(),
                         bottom_menu.getTimeButton(),
                         bottom_menu.getOptionButton(),
                         nav_bar,
                         nav_dir_view,
                         cyclists
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
win.add(nav_open_bar_view);
win.add(nav_dir_banner);
win.add(nav_dir_start);
//win.add(option_view.getOptionView());
//win.add(bottom_menu.getBottomMenu());
win.open();









