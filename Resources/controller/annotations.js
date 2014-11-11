var constants = require('./controller_constants');
var MapModule = require('ti.map');

function Annotation(mainMap) {
	this.mainMap = mainMap;
	this.currentLocationAnnotation;
	this.destinationLocationAnnotation;
	this.otherAnnotations = [];
}

Annotation.prototype.addCurrentLocationAnnotation = function(lat, lng, title) {
	this.currentLocationAnnotation = MapModule.createAnnotation({
		latitude: lat,
		longitude: lng,
		title: title,
		pincolor: MapModule.ANNOTATION_PURPLE,
		animate: true
	});
	this.mainMap.addMarker(this.currentLocationAnnotation);
}

Annotation.prototype.getCurrentLocationAnnotation = function() {
	return this.currentLocationAnnotation;
}

Annotation.prototype.removeCurrentLocationAnnotation = function() {
	this.mainMap.removeMarker(this.currentLocationAnnotation);
}

Annotation.prototype.addDestinationLocationAnnotation = function(lat, lng, title, subtitle) {
	this.destinationLocationAnnotation = MapModule.createAnnotation({
		latitude: lat,
		longitude: lng,
		title: title,
		subtitle: subtitle,
		pincolor: MapModule.ANNOTATION_PURPLE,
		animate: true
	});
	this.mainMap.addMarker(this.destinationLocationAnnotation);
}

Annotation.prototype.getDestinationLocationAnnotation = function() {
	return this.destinationLocationAnnotation;
}

Annotation.prototype.removeDestinationLocationAnnotation = function() {
	this.mainMap.removeMarker(this.destinationLocationAnnotation);
}

module.exports = Annotation;