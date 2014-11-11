var constants = require('./controller_constants');
var MapModule = require('ti.map');

function Destination(mainMap) {
	this.mainMap = mainMap;
	this.current_route;
	this.current_lat;
	this.current_long;
	this.destination_point;
}

// Parent function that will call helpers, but ultimately add a route from the input destination
// and project this on a map
Destination.prototype.addDestinationToMap = function(current_lat, current_long, destination) {

	// Add the current variables to the object itself
	var self = this;
	this.current_lat = current_lat;
	this.current_long = current_long;
	this.destination_point = destination;

	// Now, send the request and then perform the proper actions
	var rURL =  constants.startReq + 
				this.current_lat + ',' + this.current_long + //'42 Gardner St, Allston MA' +// + this.current_location + 
				//'&destination=49 Pratt St, Allston MA' +
				'&destination=' + this.destination_point + //'&destination=49 Pratt St, Allston MA' +// + this.destination_point +
				constants.endReq;	  

	var client = Ti.Network.createHTTPClient({
		onload : function(e) {
		 self.addRouteToMap(self.parseJSONtoRoute(this.responseText));
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

Destination.prototype.parseJSONtoRoute = function(json) {
	var jsonParsed = JSON.parse(json);
	try {
		var all_legs = jsonParsed["routes"][0]['legs'];
		var first_leg_steps = all_legs[0]['steps'];
		var steps_meta = [], steps = [];
		for (i in first_leg_steps) {
			var step = first_leg_steps[i];
			steps.push({'latitude': step['end_location']['lat'],
						'longitude': step['end_location']['lng']});
			steps_meta.push({'text': step['html_instructions'], 
						     'distance': step.distance['text'], 
						     'duration': step.duration['text']});
		}
		return {'steps':steps, 'meta':steps_meta};
	} catch(err) {
		alert("Could not get location!");
		return {};
	}
	
}

Destination.prototype.addRouteToMap = function(steps) {
	// https://developer.appcelerator.com/question/160923/problems-with-addroute-on-maps-ios7
	if(JSON.stringify(steps) != '{}') {
		if (this.current_route) {
			this.mainMap.removeDestinationRoute(this.current_route);	
		} 
		this.current_route = MapModule.createRoute({points: steps['steps'], 
													color: constants.routeColor, 
													width: constants.routeWidth});
		this.calculateNewDelta(steps['steps']);
		this.mainMap.addDestinationRoute(this.current_route);
	}
	
}

Destination.prototype.calculateNewDelta = function(steps) {
	// http://stackoverflow.com/questions/10776516/centering-map-around-multiple-points-annotations-on-the-map-titanium-mobile
	var end_location = steps[steps.length-1];
	var ltDiff = Math.abs(end_location.latitude - this.current_lat);
	var lgDiff = Math.abs(end_location.longitude - this.current_long);
	var delta = ltDiff > lgDiff ? ltDiff: lgDiff;
	Ti.API.info("Delta");
	Ti.API.info(delta);
	Ti.API.info(delta*constants.deltaMultiplier);
	mainMap.changeDelta((end_location.latitude + this.current_lat)/2,
						(end_location.longitude + this.current_long)/2,
						delta*constants.deltaMultiplier);
}

module.exports = Destination;