var constants = require('./controller_constants');

function NavDirections(nav_dir_view) {
	// This will give us access to change the text in the view
	this.nav_dir_view = nav_dir_view;
	this.nav_text = this.nav_dir_view.getNavText();
	this.nav_sub_text = this.nav_dir_view.getNavSubText();
	this.current_navigation_route;
	this.current_navigation_index = 0;
}

NavDirections.prototype.cancelNavigation = function() {
	this.current_navigation_route = undefined;
	this.current_navigation_index = 0;
}

NavDirections.prototype.addNavigation = function(nav) {
	this.current_navigation_index = 0;
	this.current_navigation_route = nav;
	this.nav_text.text = this.current_navigation_route[this.current_navigation_index].text.replace(/(<([^>]+)>)/ig, "");;
	this.nav_sub_text.text = this.current_navigation_route[this.current_navigation_index].distance;
}

module.exports = NavDirections;

