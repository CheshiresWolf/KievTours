var platformWidth = Titanium.Platform.displayCaps.platformWidth;
var bigImgSize = platformWidth * 0.9; //90% of screen size
var leftOffset = platformWidth * 0.05; //5%
var topOffset = (Titanium.Platform.displayCaps.platformHeight - bigImgSize) / 2;
var textWidth, buttonImgPath;
var smallImgSize = bigImgSize / 3;

//Old page index
var oldIndex = 0;
var tours = Alloy.Globals.getTours();

var insideTourProcedures = require("lib/insideTourProcedures");

var bigImageStyle = {
	width: bigImgSize,
	height: bigImgSize,
	left: leftOffset,
	top: topOffset,
	zIndex: 3
};

var smallImageStyle = {
	width: smallImgSize,
	height: smallImgSize,
	left: platformWidth - (leftOffset + smallImgSize),
	top: topOffset - smallImgSize / 2,
	zIndex: 5
};

//Prevent creating over 5 windows on single click by button (playButtonEventListener)
var isInsideTourWindowOpen = false;

function buyButtonEventListener(tour, view) {
	tour.buy();
	view.applyProperties({image: "images/tourView/Download_Button.png"});
	view.removeEventListener("click", function() {});
	view.addEventListener("click", function(){
		downloadButtonEventListener(tour, view);
	});
}

function downloadButtonEventListener(tour, view) {
	tour.download();
	view.applyProperties({image: "images/tourView/Play_Button.png"});
	view.removeEventListener("click", function() {});
	view.addEventListener("click", function() {
		playButtonEventListener();
	});
}

function playButtonEventListener() {
	
	if (!isInsideTourWindowOpen) {
		var newWindow = Alloy.createController("index");
		
		newWindow.getView("buttonTours").addEventListener("click", function () {
			newWindow.getView().close();
			isInsideTourWindowOpen = false;
		});
		
		insideTourProcedures.setData(newWindow, tours[oldIndex]);
		insideTourProcedures.initDotsView();
		isInsideTourWindowOpen = true;
	}
}


function makeTourView (tour) {
	
	var controller = Alloy.createController("tourView");
	
	//bigPicture
	controller.getView("bigPicture").applyProperties(bigImageStyle);
	
	//smallPicture
	smallImageStyle.image = tour.img;
	controller.getView("smallPicture").applyProperties(smallImageStyle);
	
	//background
	controller.getView("background").applyProperties({image: tour.background});
	
	//title
	controller.getView("title").text = tour.title;
	
	textWidth = controller.getView("title").toImage().width;
	if (textWidth > (bigImgSize * 0.7)) {
		textWidth = bigImgSize * 0.7;
	}

	controller.getView("title").applyProperties({
		top: bigImgSize / 6,
		width: textWidth
	});
	
	//text
	controller.getView("text").text = tour.text;
	
	textWidth = controller.getView("text").toImage().width;
	if (textWidth > (bigImgSize * 0.8)) {
		textWidth = bigImgSize * (0.8);
	}

	controller.getView("text").applyProperties({
		top: bigImgSize / 6 + 10 + controller.getView("title").toImage().height,
		width: textWidth
	});
	
	//icons
	controller.getView("icons").applyProperties({top: bigImgSize * 4 / 6, left: bigImgSize / 2 - 90});
	controller.getView("sizeMb").text = tour.size;
	
	//++++++++++++++++++++++++++++++++++++++++++ DOT FORGET TO FIX IT ++++++++++++++++++++++++++++++++++++++++++
	controller.getView("dotAmount").text = 31;
	//++++++++++++++++++++++++++++++++++++++++++ DOT FORGET TO FIX IT ++++++++++++++++++++++++++++++++++++++++++
	
	controller.getView("time").text = tour.time;
	if (tour.price === 0) {
		controller.getView("price").text = "FREE";
	} else {
		controller.getView("price").text = "$" + tour.price;
	}
	
	var buttonView = controller.getView("button");
	buttonView.currentTour = tour;
	//button
	if (!tour.isBuyed) {
		buttonImgPath = "images/tourView/Buy_Button.png";
		buttonView.addEventListener("click", function() {
			buyButtonEventListener(tour, buttonView);
		});
	} else {
		if (tour.isDownloaded) {
			buttonImgPath = "images/tourView/Play_Button.png";
			buttonView.addEventListener("click", function() {
				playButtonEventListener();
			});
		} else {
			buttonImgPath = "images/tourView/Download_Button.png";
			buttonView.addEventListener("click", function() {
				downloadButtonEventListener(tour, buttonView);
			});
		}
	}
	buttonView.applyProperties({
		left: bigImgSize / 2 - 46,
		image: buttonImgPath
	});
	
	//show View
	return controller.getView();
}

exports.initTourViews = function(index) {
	var toursLength = tours.length, pagingArray = [];
	
	var paging = index.getView("paging"), scrollView = index.getView("scrollView");
	
	//init paging
	for (var i = 0; i < toursLength; i++) {
		pagingArray.push(Ti.UI.createImageView({
			width : 5,
			height : 5,
			left : 10 * i,
			image : "images/Radio_bullets_off.png"
		}));
		paging.add(pagingArray[i]);
	}
	paging.applyProperties({
		bottom: 50,
		height: 5,
		width: pagingArray.length * 10,
		zIndex: 4
	});
	pagingArray[0].applyProperties({image: "images/Radio_bullets_on.png"});
	
	scrollView.addEventListener("scrollend", function(e) {
		
		var newIndex = scrollView.getCurrentPage();
		
		//if we turn page
		if (oldIndex !== newIndex) {
			var children = scrollView.getViews(), loadedPages = [];
			
			//Ti.API.info("[old|new] : [" + oldIndex + "|" + newIndex + "]; ch.l = " + children.length);
			
			//if we turn right -->
			if (newIndex > oldIndex) {	
					
				if (newIndex == children.length - 1) {
					if (newIndex + 1 < tours.length) {
						scrollView.addView(makeTourView(tours[newIndex + 1]));
					}	
				}
					
				
				pagingArray[oldIndex].applyProperties({image: "images/Radio_bullets_off.png"});
				pagingArray[newIndex].applyProperties({image: "images/Radio_bullets_on.png"});
				
				oldIndex = newIndex;
			} else {
				
				if (newIndex >= 0) {
					pagingArray[oldIndex].applyProperties({image: "images/Radio_bullets_off.png"});
					pagingArray[newIndex].applyProperties({image: "images/Radio_bullets_on.png"});
				}
				
				oldIndex = newIndex;
			}
		}
	});

	scrollView.addView(makeTourView(tours[0]));
	scrollView.addView(makeTourView(tours[1]));

};

exports.getBigImageStyle = function() {
	return bigImageStyle;
};

exports.getSmallImageStyle = function() {
	return smallImageStyle;
};

