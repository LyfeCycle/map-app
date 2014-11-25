var constants = require('./controller_constants');

function NavDirections(nav_dir_view, mainMap) {
	// This will give us access to change the text in the view
	this.nav_dir_view = nav_dir_view;
	this.nav_text = this.nav_dir_view.getNavText();
	this.nav_sub_text = this.nav_dir_view.getNavSubText();
	this.current_navigation_route;
	this.current_navigation_index = 0;
	this.mainMap = mainMap;
}

NavDirections.prototype.addNavigation = function(nav) {
	this.current_navigation_index = 0;
	this.initWaypoints(nav);
	this.nav_dir_view.setNavText(this.current_navigation_route[this.current_navigation_index].text.replace(/(<([^>]+)>)/ig, ""));
	this.nav_sub_text.text = this.current_navigation_route[this.current_navigation_index].distance;
}

NavDirections.prototype.cancelNavigation = function() {
	this.current_navigation_route = undefined;
	this.current_navigation_index = 0;
}

NavDirections.prototype.initWaypoints = function(nav) {
	this.current_navigation_route = nav;
}

NavDirections.prototype.checkWaypoints = function(lat, lng) {

}

NavDirections.prototype.inRadius = function(lat_1, lng_1, lat_2, lng_2) {
	// 1 degree of lat is 77,136 feet // 0.00000274269 lat degrees is one feet
	// 1 degree of long is 131,239 feet // 0.00000386573 long degrees is one foot
	// We'll need accuracy of 100 feet
	
}

NavDirections.prototype.calculateDistance = function(lat_1, lng_1, lat_2, lng_2) {
	return Math.sqrt(Math.pow(lat_2 - lat_1, 2) + Math.pow(lng_2 - lng_1, 2));
}


module.exports = NavDirections;

