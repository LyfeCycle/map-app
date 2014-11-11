var constants = require('./controller_constants');
var MapModule = require('ti.map');

function Markers(mainMap) {
	this.mainMap = mainMap;
	this.markers = [];
	this.endpoint = 'https://lyfecycle-api.herokuapp.com/locations';
}

Markers.prototype.retrieveAndAddMarkers = function() {
	this.retrieveMarkersFromAPI();
}

Markers.prototype.retrieveMarkersFromAPI = function() {
	var self = this;
	var client = Ti.Network.createHTTPClient({
		onload : function(e) {
		 	self.addMarkersToMap(self.parseJSONtoMarkers(this.responseText))
		},
		onerror : function(e) {
		 alert('Could not retrieve markers!');
		},
		timeout : constants.timeoutReq
	 });

	// Send request
	client.open("GET", encodeURI(this.endpoint));
	client.send();
}

Markers.prototype.parseJSONtoMarkers = function(json) {
	// Because we can control the api, we'll just return this value
	try {
		var parsedJSON = JSON.parse(json);
		return parsedJSON;
	} catch(err) {
		alert('Could not retrieve markers!');
		return []
	}
}

Markers.prototype.addMarkersToMap = function(markers) {
	var new_markers = []
	if (markers.length > 0) {
		for (i in markers) {
			new_markers[i] = MapModule.createAnnotation({
				latitude: markers[i].latitude,
				longitude: markers[i].longitude,
				title: markers[i].name,
				pincolor: MapModule.ANNOTATION_RED,
				animate: true
			});
			this.addMarker(new_markers[i]);
		}
	}
	this.markers.concat(new_markers);
}

Markers.prototype.addMarker = function(marker) {
	Ti.API.info("Adding marker " + marker);
	this.mainMap.addMarker(marker);
}

Markers.prototype.addAllMarkers = function() {
	for (i in this.markers) {
		this.mainMap.addMarker(this.markers[i]);
	}
}

module.exports = Markers;




