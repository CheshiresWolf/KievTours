$.backButton.addEventListener("click", function() {
	Alloy.Globals.closeWindow();
});

$.table.addEventListener("click", function(e) {
	
	//Is this a parent cell?
	if (e.row.isparent) {
		var i;
		//Is it opened?
		if (e.row.opened) {
			e.row.openIco.image = "images/discover/discover_menu_close.png";
			for(i = e.row.sub.length; i > 0; i = i - 1) {
				$.table.deleteRow(e.index + i);
			}
			e.row.opened = false;
		} else {
			//Add teh children.
			var currentIndex = e.index;
			e.row.openIco.image = "images/discover/discover_menu_open.png";
			for (i = 0; i < e.row.sub.length; i++) {
				$.table.insertRowAfter(currentIndex, e.row.sub[i]);
				currentIndex++;
			}
			e.row.opened = true;
		}
				
	}
			
});

function createRow(img, text) {
	var row = Titanium.UI.createTableViewRow({isparent: true, opened: false, height: 30});
	
	var icon = Ti.UI.createImageView({
		image: img,
		left: 5,
		top: 5,
		width: 25,
		height: 20
	});
	row.add(icon);
	
	var title = Ti.UI.createLabel({
		text: text,
		left: 35,
		font: {
			fontSize: 15
		}
	});
	row.add(title);
	
	var openIco = Ti.UI.createImageView({
		image: "images/discover/discover_menu_close.png",
		right: 5,
		top: 10,
		width: 20,
		height: 10
	});
	row.add(openIco);
	row.openIco = openIco;
	
	return row;
}

function createMap(place) {
	var width = Titanium.Platform.displayCaps.platformWidth * 0.55;
	
	var row = Titanium.UI.createTableViewRow({height: width + 90});
	
	var topImg = Ti.UI.createImageView({
		image: place.photo.urls.original,
		top: 5,
		left: 5,
		width: width,
		height: width,
		zIndex: 5
	});
	row.add(topImg);
	
	var bottomImg = Ti.UI.createImageView({
		image: "images/dotsView/MapMask.png",
		top: 5,
		right: 5,
		width: width,
		height: width,
		zIndex: 4
	});
	row.add(bottomImg);
	
	var point = Ti.UI.createImageView({
		width: 35,
		height: 55,
		image: "images/dotsView/MapPin_on.png",
	});
	
	var annot = Titanium.Map.createAnnotation({
		title: 0,
		image: point.toImage(),
		latitude: place.latitude,
		longitude: place.longitude
	});
	
	var map = Titanium.Map.createView({
		mapType: Titanium.Map.STANDARD_TYPE,
		userLocation: false,
	    region: {
			latitude: place.latitude,
			longitude: place.longitude,
			latitudeDelta: 0.01,
			longitudeDelta: 0.01
	    },
	    annotations: [annot],
	    top: 5,
		right: 5,
		width: width,
		height: width,
		zIndex: 3
	});
	row.add(map);
	
	var button = Ti.UI.createImageView({
		image: "images/discover/discover_showTours.png",
		top: 10 + width,
		right: 5,
		width: width * 0.8,
		height: 40,
		zIndex: 4
	});
	row.add(button);
		
	var iconContainer = Ti.UI.createView({
		backgroundColor: "#dbdbdb",
		top: 55 + width,
		right: 7,
		width: width * 0.8 - 4,
		height: 30,
		borderRadius: 5,
		//borderColor:'black',
		zIndex: 4
	});
	row.add(iconContainer);
	
	var rateIco = Titanium.UI.createImageView({
		image: "images/discover/icon_star.png",
		left: 10,
		width: 15,
		height: 15,
		zIndex: 4
	});
	iconContainer.add(rateIco);
	
	var rate = Titanium.UI.createLabel({
		text: "3",
		font: {
			fontSize: 10 
		},
		left: 30,
		width: 30,
		height: 20,
		textAlign: 'left',
		zIndex: 4
	});
	iconContainer.add(rate);
	
	var pathIco = Titanium.UI.createImageView({
		image: "images/discover/Discover_icon_path_green.png",
		//right: (width * 0.8 - 4) / 2 - 10,
		//bottom: 0,
		width: 15,
		height: 15,
		zIndex: 4
	});
	iconContainer.add(pathIco);
	
	var roundPath = Alloy.Globals.getDistanceTo({latitude: place.latitude, longitude: place.longitude}).toFixed(2);
	
	var path = Titanium.UI.createLabel({
		text: roundPath + " km",
		font: {
			fontSize: 10 
		},
		left: (width * 0.8 - 4) / 2 + 15,
		width: 50,
		height: 20,
		textAlign: 'left',
		zIndex: 4
	});
	iconContainer.add(path);
	
	var textContainer = Ti.UI.createView({
		top: 10 + width,
		left: 7,
		width: width - 10,
		height: 80,
		zIndex: 4
	});
	row.add(textContainer);
	
	var address = Ti.UI.createLabel({
		text: place.address + ", " + place.city,
		font: {
			fontSize: 10 
		},
		top: 0,
		width: "auto",
		textAlign: 'center',
		zIndex: 4
	});
	textContainer.add(address);
	
	if (place.phone_number !== undefined) {
		var phone = Ti.UI.createLabel({
			text: place.phone_number,
			font: {
				fontSize: 10,
				fontWeight: 'bold'
			},
			top: 20,
			width: "auto",
			textAlign: 'center',
			zIndex: 4
		});
		textContainer.add(phone);
	}
	
	if (place.custom_fields.email !== undefined) {
		var email = Ti.UI.createLabel({
			text: "e-mail: " + place.custom_fields.email,
			font: {
				fontSize: 10
			},
			top: 40,
			width: "auto",
			textAlign: 'center',
			zIndex: 4
		});
		textContainer.add(email);
	}
	
	if (place.website !== undefined) {
		var site = Ti.UI.createLabel({
			text: place.website,
			font: {
				fontSize: 10
			},
			top: 60,
			width: "auto",
			textAlign: 'center',
			zIndex: 4
		});
		textContainer.add(site);
	}
	
	return row;
}

function createSummary(place) {
	var row = createRow("images/discover/discover_summary.png", "Summary");
	
	var subRow = Titanium.UI.createTableViewRow();
	
	var aA = Ti.UI.createImageView({
		image: "images/dotsView/Aa.png",
		width: 15,
		height: 10,
		top: 7,
		left: 10
	});
	subRow.add(aA);
	
	var text = Ti.UI.createLabel({
		text: place.custom_fields.text,
		width: Titanium.Platform.displayCaps.platformWidth - 35,
		top: 5,
		left: 35,
		font: {
			fontSize: 10
		}
	});
	subRow.add(text);
	
	row.sub = [subRow];
	
	return row;
}

function createTime(place) {
	var row = createRow("images/discover/discover_time.png", "Working hours");
	
	var subRow = Titanium.UI.createTableViewRow({title: "O_o_O", height: 60});
	
	row.sub = [subRow];
	
	return row;
}

function createTicket(place) {
	var row = createRow("images/discover/discover_ticket.png", "Tickets");
	
	var subRow = Titanium.UI.createTableViewRow({title: "o_O_o", height: 60});
	
	row.sub = [subRow];
	
	return row;
}

function createRate(place) {
	var row = createRow("images/discover/discover_rate.png", "Rate&Comment");
	
	var subRow = Titanium.UI.createTableViewRow({title: "O_O", height: 60});
	
	row.sub = [subRow];
	
	return row;
}

//some sort of magic
function createFooter(place) {
	return Titanium.UI.createTableViewRow({height: 300});
}

exports.fillTable = function(place) {
	var tableData = [], i = 0;

	$.title.applyProperties({text: place.name, width: Titanium.Platform.displayCaps.platformWidth - 105});
	
	//for (i; i < places.length; i++) {
	tableData.push(createMap(place));	
	tableData.push(createSummary(place));
	tableData.push(createTime(place));
	tableData.push(createTicket(place));
	tableData.push(createRate(place));
	tableData.push(createFooter(place));
	//}
	//$.window.add(createMap(place));
	
	$.table.data = tableData;
	//$.table.searchHidden = true;
    //$.table.filterAtribute = "my_filter";
    
    var menu = Alloy.createController("menuView");
    
	$.window.add(menu.getView("menuListener"));
	$.window.add(menu.getView("menu"));
};