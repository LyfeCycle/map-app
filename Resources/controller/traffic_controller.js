var constants = require('./controller_constants');
var apiConstants = require('../api_constants');

var TrafficController = function() {
	this.incidentsReady = false;
};

TrafficController.prototype.getIncidents = function(lat, long) {
	var boundingBox = "42.459260,-71.333157,42.298215,-70.929924";

	mapQuest();
	tomTom();

	function mapQuest() {
		var req = "http://www.mapquestapi.com/traffic/v2/incidents?key=" + apiConstants.apiKeyMapquest +
				  "&callback=handleIncidentsResponse&boundingBox=" + boundingBox +
				  "&filters=construction,incidents&inFormat=kvp&outFormat=json";

		var self = this;
		var client = Ti.Network.createHTTPClient({
			onload : function(e) {
				Ti.API.info(this.responseText);
			},
			onerror : function(e) {
			 alert('Could not retrieve markers!');
			},
			timeout : constants.timeoutReq
		 });

		// Send request
		client.open("GET", encodeURI(req));
		client.send();
	}

	function tomTom() {
		var req = "https://api.tomtom.com/lbs/services/trafficIcons/3/s3/" + boundingBox +
				  "/11/1335294634919/json?key=" + apiConstants.apiKeyTomTom + 
				  "&language=en";
		var self = this;
		var client = Ti.Network.createHTTPClient({
			onload : function(e) {
				Ti.API.info(this.responseText);
			},
			onerror : function(e) {
			 alert('Could not retrieve markers!');
			},
			timeout : constants.timeoutReq
		 });

		// Send request
		client.open("GET", encodeURI(req));
		client.send();
	}

};




module.exports = TrafficController;

