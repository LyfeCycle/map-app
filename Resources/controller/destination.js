var constants = require('./controller_constants');
var MapModule = require('ti.map');

function Destination(mainMap, current_lat, current_long, destination) {
	this.mainMap = mainMap;
	this.current_lat = current_lat;
	this.current_long = current_long;
	this.destination_point = destination;
	this.addDestinationToMap();
}

// Parent function that will call helpers, but ultimately add a route from the input destination
// and project this on a map
Destination.prototype.addDestinationToMap = function() {
	var self = this;
	var rURL =  constants.startReq + 
				'42 Gardner St, Allston MA' +// + this.current_location + 
				'&destination=49 Pratt St, Allston MA' +// + this.destination_point +
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
}

Destination.prototype.addRouteToMap = function(steps) {
	// https://developer.appcelerator.com/question/160923/problems-with-addroute-on-maps-ios7
	this.mainMap.addDestinationRoute(MapModule.createRoute({points: steps['steps'], color: 'blue', width: 3}));
}

module.exports = Destination;