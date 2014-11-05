var map = require('bencoding.map');
var constants = require('./constants');


function Map(startLat, startLong, startTime) {

	this.startLat = 33.74511, 
    this.startLong = 84.38993,
    this.startTime = 0,
    this.delta = 0.005,
    this.currentLat = startLat,
    this.currentLong = startLong,
    this.currentTime = startTime,
    this.topSpace = constants.topSpace,
    this.bottomSpace = constants.bottomSpace,
    this.deviceHeight = constants.deviceHeight,
    this.mapView;
    this.createMapViewWithAnnotations();
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

Map.prototype.createMapViewWithAnnotations = function() {
		this.createMapView();
		this.addPolygons([]);
		// Add the other possibilities as we continue
	}

Map.prototype.addPolygons =	function(polygons) {
		var myPolygon = {title:'Colorado',
	                tag: 42,
	                color:'#880000',
	                alpha:0.5,
	                lineWidth:1.2,
	                strokeColor:'#000',                    
	                points:[
	                    {
	                        latitude:37.0004,
	                        longitude:-109.0448
	                    },
	                    {
	                        latitude:36.9949,
	                        longitude:-102.0424
	                    },
	                    {
	                        latitude:41.0006,
	                        longitude:-102.0534
	                    },
	                    {
	                        latitude:40.9996,
	                        longitude:-109.0489
	                    },
	                    {
	                        latitude:37.0004,
	                        longitude:-109.0448
	                    }
	                ]
	            };
		//Add Colorado polgyon to MapView
		this.mapView.addPolygon(myPolygon);
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
}

module.exports = Map;
