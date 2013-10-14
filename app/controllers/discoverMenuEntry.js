$.backButton.addEventListener("click", function() {
	Alloy.Globals.closeWindow();
});

$.table.addEventListener("click", function(e) {
	
	//Is this a parent cell?
	if (e.row.isparent) {
		
		//Is it opened?
		if (e.row.opened) {
			e.row.openIco.image = "images/discover/discover_menu_close.png";
			for(var i = e.row.sub.length; i > 0; i = i - 1) {
				$.table.deleteRow(e.index + i);
			}
			e.row.opened = false;
		} else {
			//Add teh children.
			var currentIndex = e.index;
			e.row.openIco.image = "images/discover/discover_menu_open.png";
			for (var i = 0; i < e.row.sub.length; i++) {
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
	var width = Titanium.Platform.displayCaps.platformWidth * 0.6;
	
	var row = Titanium.UI.createTableViewRow({height: width + 10});
	
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
		image: place.photo.urls.original,
		top: 5,
		right: 5,
		width: width,
		height: width,
		zIndex: 4
	});
	row.add(bottomImg);
	
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
	
	/*var title = Ti.UI.createLabel({
		text:
		width: width,
		height: 20,
		top: 5,
		left: 30,
		font: {
			fontWeight: 'bold'
		}
	});
	subRow.add(title);*/
	
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