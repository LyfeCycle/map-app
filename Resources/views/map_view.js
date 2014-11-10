var map = require('ti.map');
var constants = require('./constants');

// Our annotations should go like this:
// _id = 0 is the currentLocation
// _id = 1 is the destination

function Map(startLat, startLong, startTime) {

	this.startLat = 42.35141754150391, 
    this.startLong = -71.12548828125,
    this.startTime = 0,
    this.delta = 0.005,
    this.currentLat = startLat,
    this.currentLong = startLong,
    this.currentTime = startTime,
    this.topSpace = constants.topSpace,
    this.bottomSpace = constants.bottomSpace,
    this.deviceHeight = constants.deviceHeight,
    this.mapView;
    this.createMapView();
    //this.addMarker(this.startLat, this.startLong, "Current Location", 0);
}

Map.prototype.getMapView = function() {
	return this.mapView;
}

Map.prototype.createMapView = function() {
	this.mapView = map.createView({
	    mapType: map.NORMAL_TYPE,
	    animate:true,
	    regionFit:true,
	    region:{latitude:this.startLat, longitude:this.startLong, latitudeDelta: this.delta, longitudeDelta: this.delta},
	    height: this.deviceHeight - (this.topSpace + this.bottomSpace),
	    top: this.topSpace
	});
}

Map.prototype.addMarker = function(annotation) {
	this.mapView.addAnnotation(annotation);
}

Map.prototype.removeMarker = function(annotation) {
	this.mapView.removeAnnotation(annotation);
}

Map.prototype.updateValues = function(lat, lon, time) {
	this.currentTime = time;
	this.currentLong = lon;
	this.currentLat = lat;
	var region={
            latitude: this.currentLat,
            longitude: this.currentLong,
            animate:true,
            latitudeDelta:this.delta,
            longitudeDelta:this.delta
        };
    this.mapView.setLocation(region);
    //this.mapView.removeAnnotation
}

Map.prototype.addDestinationRoute = function(route) {
	this.mapView.addRoute(route);
}

/* * * * * * * * * * * * * * * * * * * * *
 * 
 *  Getters
 *
 * * * * * * * * * * * * * * * * * * * * */

 Map.prototype.getCurrentLocation = function() {
 	return {'lat': this.currentLat, 'lng': this.currentLong};
 }

module.exports = Map;
