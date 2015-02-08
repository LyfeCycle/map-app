var ListDirectionsController = function() {

};

ListDirectionsController.prototype.putDirectionsInList = function(directions) {
	var jsonParsed = JSON.parse(directions);
	if (jsonParsed.routes && jsonParsed.routes.length > 0 && jsonParsed.routes[0].legs.length > 0) {
		var route = jsonParsed.routes[0].legs[0];
		listDirectionsView.updateDirectionTableData(route.steps, route);
	} else {
		Ti.API.info("No routes to add");
	}
};

module.exports = ListDirectionsController;