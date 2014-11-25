var constants = require('./controller_constants');
var MapModule = require('ti.map');

function Cyclists(mainMap) {
	this.mainMap = mainMap;
	this.cyclists = [];
}

Cyclists.prototype.generateCyclists = function() {
	points = [
		{latitude: 42.350290, longitude: -71.107424},
		{latitude: 42.350000, longitude: -71.103905},
		{latitude: 42.349521, longitude: -71.106180},
		{latitude: 42.349687, longitude: -71.103047},
		{latitude: 42.349180, longitude: -71.102489}
	]
	for (i in points) {
		this.cyclists.push(MapModule.createAnnotation({
			latitude: points[i].latitude,
			longitude: points[i].longitude,
			title: "Biker",
			pincolor: MapModule.ANNOTATION_RED,
			image: 'images/biker.png',
			animate: true
		}));
		this.mainMap.addMarker(this.cyclists[i]);
	}
}

Cyclists.prototype.removeCyclists = function() {
	for (i in this.cyclists) {
		this.mainMap.removeAnnotation(this.cyclists[i]);
	}
	this.cyclists = [];
}

module.exports = Cyclists;