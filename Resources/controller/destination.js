var constants = require('./controller_constants');
var MapModule = require('ti.map');

function Destination(mainMap, annotations, directions) {
	this.mainMap = mainMap;
	// The currents routes differ by form and functionality
	//	- Polyline is for placement on the map. This allows curves and such
	//	- Nav has all waypoints given back from Directions API
	this.current_route_polyline;
	this.current_route_nav;
	this.current_lat;
	this.current_long;
	this.destination_point;
	this.annotations = annotations;
	this.directions = directions;
}

// Parent function that will call helpers, but ultimately add a route from the input destination
// and project this on a map
Destination.prototype.addDestinationToMap = function(destination) {

	// Add the current variables to the object itself
	var self = this;
	var location = this.mainMap.getCurrentLocation();
	this.current_lat = location.lat;
	this.current_long = location.lng;
	this.destination_point = destination;

	// Now, send the request and then perform the proper actions
	var rURL =  constants.startReq + 
				this.current_lat + ',' + this.current_long + //'42 Gardner St, Allston MA' +// + this.current_location + 
				//'&destination=49 Pratt St, Allston MA' +
				'&destination=' + this.destination_point + //'&destination=49 Pratt St, Allston MA' +// + this.destination_point +
				constants.endReq;	  

	var client = Ti.Network.createHTTPClient({
		onload : function(e) {
		 self.addRouteToMap(self.parseJSONtoRoute(this.responseText, this.destination_point));
		},
		onerror : function(e) {
		 alert(constants.destinationFailMessage);
		},
		timeout : constants.timeoutReq
	 });

	// Send request
	client.open("GET", encodeURI(rURL));
	client.send();
}

// This looks a little messy. I'd like to clean this up
Destination.prototype.parseJSONtoRoute = function(json, end_destination_text) {
	var jsonParsed = JSON.parse(json);
	try {
		var all_legs = jsonParsed["routes"][0]['legs'];
		var first_leg_steps = all_legs[0]['steps'];
		var steps = [], polyline_steps = [];
		for (i in first_leg_steps) {
			var step = first_leg_steps[i];
			this.decodePolyline(step['polyline']['points'], polyline_steps);
			steps.push({'latitude': step['end_location']['lat'],
						'longitude': step['end_location']['lng'],
						'text': step['html_instructions'], 
						'distance': step.distance['text'], 
						'duration': step.duration['text']});
		}
		return {'steps':steps, 'end_destination_text': end_destination_text, 'polyline_route': polyline_steps};
	} catch(err) {
		alert("Could not get location!");
		return {};
	}
}

Destination.prototype.removeRouteFromMap = function() {
	if (this.current_route_polyline) {
		this.mainMap.removeDestinationRoute(this.current_route_polyline);
		this.current_route_nav = undefined;
		this.current_route_polyline = undefined;	
	} 
	this.annotations.removeAnnotations();
}

Destination.prototype.addRouteToMap = function(steps_obj) {
	// https://developer.appcelerator.com/question/160923/problems-with-addroute-on-maps-ios7
	if(JSON.stringify(steps_obj) != '{}') {
		this.removeRouteFromMap();
		this.current_route_polyline = MapModule.createRoute({points: steps_obj['polyline_route'],//points: steps_obj['steps'], 
													color: constants.routeColor, 
													width: constants.routeWidth});
		this.current_route_nav = steps_obj['steps'];
		this.calculateNewDelta(steps_obj['steps']);
		this.addDestinationAnnotations(steps_obj);
		this.directions.addNavigation(steps_obj['steps']);
		this.mainMap.addDestinationRoute(this.current_route_polyline);
	}
	
}

Destination.prototype.calculateNewDelta = function(steps) {
	// http://stackoverflow.com/questions/10776516/centering-map-around-multiple-points-annotations-on-the-map-titanium-mobile
	var end_location = steps[steps.length-1];
	var ltDiff = Math.abs(end_location.latitude - this.current_lat);
	var lgDiff = Math.abs(end_location.longitude - this.current_long);
	var delta = ltDiff > lgDiff ? ltDiff: lgDiff;
	mainMap.changeDelta((end_location.latitude + this.current_lat)/2,
						(end_location.longitude + this.current_long)/2,
						delta*constants.deltaMultiplier);
}

Destination.prototype.addDestinationAnnotations = function(steps) {
	var end_location = steps['steps'][steps['steps'].length-1];
	this.annotations.addAnnotations(this.current_lat, 
									this.current_long, 
									"Current Location", 
									end_location.latitude,
									end_location.longitude,
									"Destination",
									steps['end_destination_text']
									);
}

Destination.prototype.decodePolyline = function(encoded, polyline_steps_arr) {
	var len = encoded.length;
	    var index = 0;
	    var lat = 0;
	    var lng = 0;
	 
	    while(index < len) {
	        var b;
	        var shift = 0;
	        var result = 0;
	        do {
	            b = encoded.charCodeAt(index++) - 63;
	            result |= (b & 0x1f) << shift;
	            shift += 5;
	        } while (b >= 0x20);
	        var dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));
	        lat += dlat;
	 
	        shift = 0;
	        result = 0;
	        do {
	            b = encoded.charCodeAt(index++) - 63;
	            result |= (b & 0x1f) << shift;
	            shift += 5;
	        } while (b >= 0x20);
	        var dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
	        lng += dlng;
	 
	        // Create new Vars for the created lats and lng
	        var newLat = lat * 1e-5;
	        var newLon = lng * 1e-5;
	 
	        // push them into the array at the end (thus adding it to the correct place)
	        polyline_steps_arr.push({
	            latitude: newLat,
	            longitude: newLon
	        });
	    }
}

module.exports = Destination;