var searchFlag = true, places = [];
var search = Titanium.UI.createSearchBar({
    barColor: '#000',
    showCancel: false
});

$.backButton.addEventListener("click", function() {
	Alloy.Globals.closeWindow();
});

$.titleIco.addEventListener("click", function() {
	if (searchFlag) {
		$.table.search = search;
		searchFlag = false;
	} else {
		$.table.search = null;
		searchFlag = true;
	}
});

$.table.addEventListener("click", function(e) {    
    var discoverEntry = Alloy.createController("discoverMenuEntry");
    var place = places[e.index];
    var Cloud = require("ti.cloud");
    
    Cloud.Objects.query({
		classname: 'PlaceComments',
		where: {
			id: place.custom_fields.comments_id
		}
	}, function(ee) {
		if (ee.success) {    
		    discoverEntry.fillTable(place, ee.PlaceComments[0]);
		    discoverEntry.getView().windowName = "discoverMenuEntry";
		    Alloy.Globals.openWindow(discoverEntry.getView());
		} else {
			alert('Error: ' + ((ee.error && ee.message) || JSON.stringify(ee)));        
		}
	});
});

function createRow(place) {
	var row = Titanium.UI.createTableViewRow({my_filter: place.name, hasChild: true, height: 60});
	
	var image =  Titanium.UI.createImageView({
		image: place.photo.urls.original,
		width: 50,
		height: 50,
		left: 5,
		top: 5,
		zIndex: 4
	});
	row.add(image);
	
	if (place.tags !== undefined) {
		var imageBack =  Titanium.UI.createImageView({
			image: "images/discover_search_back.png",
			width: 52,
			height: 52,
			left: 4,
			top: 4,
			zIndex: 3
		});
		row.add(imageBack);
		
		var imageAsk =  Titanium.UI.createImageView({
			image: "images/discover_ask.png",
			width: 15,
			height: 15,
			left: 40,
			top: 5,
			zIndex: 6
		});
		row.add(imageAsk);
	}
	
	var titleWidth = Titanium.Platform.displayCaps.platformWidth - 60; // 60 - image and space
	
	var title = Titanium.UI.createLabel({
		text: place.name,
		font: {
			fontSize: 10,
			fontWeight: 'bold' 
		},
		top: 0,
		left: 60,
		width: titleWidth,
		height: 20,
		textAlign: 'left',
		zIndex: 4
	});
	row.add(title);
	
	var address = Titanium.UI.createLabel({
		text: place.address + ", " + place.city,
		font: {
			fontSize: 10 
		},
		top: 20,
		left: 60,
		width: 'auto',
		height: 20,
		textAlign: 'left',
		zIndex: 4
	});
	row.add(address);
	
	var commentIco = Titanium.UI.createImageView({
		image: "images/discover/icon_comment.png",
		left: 60,
		bottom: 0,
		width: 20,
		height: 20,
		zIndex: 4
	});
	row.add(commentIco);
	
	var comment = Titanium.UI.createLabel({
		text: "3",
		font: {
			fontSize: 10 
		},
		bottom: 0,
		left: 85,
		width: 30,
		height: 20,
		textAlign: 'left',
		zIndex: 4
	});
	row.add(comment);
	
	var rateIco = Titanium.UI.createImageView({
		image: "images/discover/icon_star.png",
		left: 120,
		bottom: 0,
		width: 20,
		height: 20,
		zIndex: 4
	});
	row.add(rateIco);
	
	var rate = Titanium.UI.createLabel({
		text: "3",
		font: {
			fontSize: 10 
		},
		bottom: 0,
		left: 145,
		width: 30,
		height: 20,
		textAlign: 'left',
		zIndex: 4
	});
	row.add(rate);
	
	var pathIco = Titanium.UI.createImageView({
		image: "images/discover/icon_path.png",
		left: 180,
		bottom: 0,
		width: 20,
		height: 20,
		zIndex: 4
	});
	row.add(pathIco);
	
	var roundPath = Alloy.Globals.getDistanceTo({latitude: place.latitude, longitude: place.longitude}).toFixed(2);
	
	var path = Titanium.UI.createLabel({
		text: roundPath + " km",
		font: {
			fontSize: 10 
		},
		bottom: 0,
		left: 205,
		width: 50,
		height: 20,
		textAlign: 'left',
		zIndex: 4
	});
	row.add(path);
	
	return row;
}

exports.fillTable = function(newPlaces) {
	var tableData = [], i = 0;
	
	places = newPlaces;

	$.title.applyProperties({width: Titanium.Platform.displayCaps.platformWidth - 140});
	
	for (i; i < places.length; i++) {		
		tableData.push(createRow(places[i]));
	}
	
	$.table.data = tableData;
    
    var menu = Alloy.createController("menuView");
    
	$.window.add(menu.getView("menuListener"));
	$.window.add(menu.getView("menu"));
};