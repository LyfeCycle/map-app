var constants = require('./constants');

var ListDirectionsView = function() {
	this.tableView = this.createDirectionTable();
};

ListDirectionsView.prototype.createDirectionRow = function(step) {
	var row = Ti.UI.createTableViewRow({
		className: 'directionRow',
		selectedBackgroundColor: '#ddd',
		height: 90
	});
	var descriptionImage = Ti.UI.createImageView({
		right: 10,
		height: 50,
		width: 50,
		top: 10,
		image: 'images/gear.png'
	});
	var distance = Ti.UI.createLabel({
		right: 10,
		top: 70,
		text: step.distance.text
	});
	var instruction = Ti.UI.createLabel({
		top: 10,
		left: 10,
		width: constants.deviceWidth - 70,
		text: step.html_instructions.replace(/(<([^>]+)>)/ig, "")
	});
	row.add(descriptionImage);
	row.add(distance);
	row.add(instruction);
	return row;
};

ListDirectionsView.prototype.createDirectionTable = function() {
	return Ti.UI.createTableView({
		top: 100,
		width: constants.deviceWidth,
		backgroundColor: 'white',
		visible: false
	});
};

ListDirectionsView.prototype.updateDirectionTableData = function(directions, meta) {
	var header = this.createDirectionTableHeader(meta);
	var directionSection = Ti.UI.createTableViewSection({
		headerTitle: 'Directions'
	});
	for (var i = 0; i < directions.length; i++) {
		directionSection.add(this.createDirectionRow(directions[i]));
	}
	this.tableView.setData([header, directionSection]);
	this.tableView.show();
};

ListDirectionsView.prototype.createDirectionTableHeader = function(meta) {
	var row = Ti.UI.createTableViewRow({
		className: 'header',
		backgroundColor: constants.green,
		height: 110
	});
	var distanceText = Ti.UI.createLabel({
		text: 'Total distance: ' + meta.distance.text,
		top: 70,
		color: 'white'
	});
	var destinationText = Ti.UI.createLabel({
		text: 'To ' + meta.end_address,
		top: 30,
		color: 'white'
	});
	var timeText = Ti.UI.createLabel({
		text: 'Will take ' + meta.duration.text,
		top: 90,
		color: 'white'
	});
	row.add(distanceText);
	row.add(destinationText);
	row.add(timeText);
	return row;

}

module.exports = ListDirectionsView;