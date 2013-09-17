//===========================================
//Ti.API.info("index.js start");
//===========================================

//var realImgSize = 556 //real images/BigSircle.png size
//var buttonView = Alloy.createController("buttonView").getView();
var tours = Alloy.Globals.getTours(), toursLength = tours.length, pagingArray = [];
var currentPage = 0;
//init menu
$.menu.applyProperties({
	backgroundImage: "images/Menu_close_large.png",
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

	var bufIndex = $.scrollView.getCurrentPage();
	
	//if we turn page
	if (currentPage !== bufIndex) {
		var children = $.scrollView.getViews(), loadedPages = [], bufPos = 1;
		loadedPages = [];

		//if we turn right -->
		if (bufIndex > currentPage) {

			if (currentPage === 0) {
				bufPos = 0;
			}
			
			loadedPages.push(children[bufPos]);
			loadedPages.push(children[bufPos + 1]);
			
			//if there are another tour left
			if (bufIndex + 1 < tours.length) {
				loadedPages.push(tourProcedures.makeTourView(tours[bufIndex + 1]));
			}
			
			$.scrollView.setViews(loadedPages);
			$.scrollView.setCurrentPage(1);
			
			currentPage = bufIndex;
			//log
			Ti.API.info("[ --> ]: globalPage = " + currentPage + " | localPage = " + bufPos + " | childrensLength = " + $.scrollView.getViews().length);
			
			pagingArray[currentPage - 1].applyProperties({image: "images/Radio_bullets_off.png"});
			pagingArray[currentPage].applyProperties({image: "images/Radio_bullets_on.png"});
		} else {
			
			//if there are another tour left
			if (bufIndex - 1 >= 0) {
				loadedPages.push(tourProcedures.makeTourView(tours[bufIndex - 1]));
			} else {
				bufPos = 0;
			}
			
			loadedPages.push(children[0]);
			loadedPages.push(children[1]);
			
			$.scrollView.setViews(loadedPages);
			$.scrollView.setCurrentPage(bufPos);
			
			//save pos
			currentPage = bufIndex;
			
			//log
			Ti.API.info("[ <-- ]: globalPage = " + currentPage + " | localPage = " + bufPos + " | childrensLength = " + $.scrollView.getViews().length);
			
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
			$.menu.applyProperties({backgroundImage: "images/Menu_open_large.png"});
		});
	}
	if (e.direction === "down") {
		$.menu.animate({
			bottom : -55
		}, function() {
			$.menu.applyProperties({backgroundImage: "images/Menu_close_large.png"});
		});
	}
});

var tourProcedures = require("lib/tourViewModel");

$.scrollView.addView(tourProcedures.makeTourView(tours[0]));
$.scrollView.addView(tourProcedures.makeTourView(tours[1]));
//===========================================
Ti.API.info("index.js open");
//Ti.API.log("index.js open");
//Ti.API.error("index.js open");
//===========================================