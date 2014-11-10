var apiConstants = require('../api_constants');

function Destination(mapView, current_lat, current_long, destination) {
	this.apiKey = apiConstants.apiKey;
	this.map_view = mapView;
	this.destination_point = destination;
	this.current_lat = current_lat;
	this.current_long = current_long;
	this.addDestinationToMap();
}

Destination.prototype.addDestinationToMap = function() {
	var httpRequestURL = 'https://maps.googleapis.com/maps/api/directions/json?origin=' +
					  '42 Gardner St, Allston MA' +// + this.current_location + 
					  '&destination=49 Pratt St, Allston MA' +// + this.destination_point +
					  '&key=' + this.apiKey + 
					  '&avoid=highways&mode=bicycling&sensor=false';

	var client = Ti.Network.createHTTPClient({
		onload : function(e) {
		 var steps = parseJSONtoRoute(this.responseText);
		},
		onerror : function(e) {
		 Ti.API.debug(e.error);
		 alert('Unfortunately, we couldn\'t find that route.\nTry again.');
		},
		timeout : 5000  // in milliseconds
	 });
	 client.open("GET", encodeURI(httpRequestURL));
	 client.send();
}

function parseJSONtoRoute(json) {
	var jsonParsed = JSON.parse(json);
	var all_legs = jsonParsed["routes"][0]['legs'];
	var first_leg_steps = all_legs[0]['steps'];
	var steps = [];
	for (i in first_leg_steps) {
		var step = first_leg_steps[i];
		steps.push({'text': step['html_instructions'], 
					  'distance': step.distance['text'], 
					  'duration': step.duration['text'], 
					  'end_lat': step['end_location']['lat'],
					  'end_lng': step['end_location']['lng']
					  });
	}
	for (step in steps) {
		Ti.API.info(steps[step]);
	}
	return steps;
}

module.exports = Destination;