//===========================================
//Ti.API.info("index.js start");
//===========================================

//var realImgSize = 556 //real images/BigSircle.png size
//var buttonView = Alloy.createController("buttonView").getView();
var tours = Alloy.Globals.getTours(), toursLength = tours.length, pagingArray = [];
var currentPage = 0, oldIndex = 0;
//init menu
$.menu.applyProperties({
	backgroundImage: "images/menu/Menu_close_large.png",
	bottom : -55
});

//init paging
for (var i = 0; i < toursLength; i++) {
	pagingArray.push(Ti.UI.createImageView({
		width : 5,
		height : 5,
		left : 10 * i,
		image : "images/Radio_bullets_off.png"
	}));
	$.paging.add(pagingArray[i]);
}
$.paging.applyProperties({
	bottom: 50,
	left: (Titanium.Platform.displayCaps.platformWidth - $.paging.toImage().width) / 2,
	height: 5,
	width: pagingArray.length * 10,
	zIndex: 4
});
pagingArray[0].applyProperties({image: "images/Radio_bullets_on.png"});

$.scrollView.addEventListener("scrollend", function(e) {
	
	var newIndex = $.scrollView.getCurrentPage();
	
	//Ti.API.info("[ ! scrollend ! ]: newIndex = " + newIndex + " | oldIndex = " + oldIndex);
	
	//if we turn page
	if (oldIndex !== newIndex) {
		var children = $.scrollView.getViews(), loadedPages = [];
		
		//if we turn right -->
		if (newIndex > oldIndex) {			
			//save pos
			currentPage++;
				
			loadedPages.push(children[oldIndex]);
			loadedPages.push(children[oldIndex + 1]);
			
			//if there are another tour left
			if (currentPage + 1 < tours.length) {
				loadedPages.push(tourProcedures.makeTourView(tours[currentPage + 1]));
				oldIndex = 1;
			}
			
			$.scrollView.setViews(loadedPages);
			$.scrollView.setCurrentPage(1);
			
			/*log
			Ti.API.info(
				"[ --> ]: currentPage = "
				+ currentPage +
				" | newIndex = "
				+ newIndex +
				" | oldIndex = "
				+ oldIndex +
				" | oldViewsLength = "
				+ children.length +
				" | newViewsLength = "
				+ loadedPages.length
			);*/
			
			
			pagingArray[currentPage - 1].applyProperties({image: "images/Radio_bullets_off.png"});
			pagingArray[currentPage].applyProperties({image: "images/Radio_bullets_on.png"});
		} else {
			
			//save pos
			currentPage--;
			
			//if there are another tour left
			if (currentPage - 1 >= 0) {
				loadedPages.push(tourProcedures.makeTourView(tours[currentPage - 1]));
				oldIndex = 1;
			} else {
				oldIndex = 0;
			}
			
			loadedPages.push(children[0]);
			loadedPages.push(children[1]);
			
			$.scrollView.setViews(loadedPages);
			$.scrollView.setCurrentPage(oldIndex);
			
			/*Ti.API.info(
				"[ <-- ]: currentPage = "
				+ currentPage +
				" | newIndex = "
				+ newIndex +
				" | oldIndex = "
				+ oldIndex +
				" | oldViewsLength = "
				+ children.length +
				" | newViewsLength = "
				+ loadedPages.length
			);*/
			
			
			pagingArray[currentPage + 1].applyProperties({image: "images/Radio_bullets_off.png"});
			pagingArray[currentPage].applyProperties({image: "images/Radio_bullets_on.png"});
		}
	}
});

$.window.addEventListener("swipe", function(e) {
	Ti.API.info("swipe" + e.direction);
	
	if (e.direction === "up") {
		$.menu.animate({
			bottom : 0
		}, function() {
			$.menu.applyProperties({backgroundImage: "images/menu/Menu_open_large.png"});
		});
	}
	if (e.direction === "down") {
		$.menu.animate({
			bottom : -55
		}, function() {
			$.menu.applyProperties({backgroundImage: "images/menu/Menu_close_large.png"});
		});
	}
});

var tourProcedures = require("lib/tourViewProcedures");

$.scrollView.addView(tourProcedures.makeTourView(tours[0]));
$.scrollView.addView(tourProcedures.makeTourView(tours[1]));
//===========================================
Ti.API.info("index.js open");
//Ti.API.log("index.js open");
//Ti.API.error("index.js open");
//===========================================