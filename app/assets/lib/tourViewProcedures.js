var platformWidth = Titanium.Platform.displayCaps.platformWidth;
var bigImgSize = platformWidth * 0.9; //90% of screen size
var leftOffset = platformWidth * 0.05; //5%
var topOffset = (Titanium.Platform.displayCaps.platformHeight - bigImgSize) / 2;
var textWidth, buttonImgPath;
var smallImgSize = bigImgSize / 3;

var controller;
var listenerBuf;

//Old page index
var oldIndex = 0;
var tours = Alloy.Globals.getTours();

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

function makeTourView (tour) {
	
	var tourView = Alloy.createController("tourView");
	tourView.setStyles(bigImageStyle, smallImageStyle);
	tourView.setTour(tour);
	//bigPicture
	tourView.getView("bigPicture").applyProperties(bigImageStyle);
	
	//smallPicture
	smallImageStyle.image = tour.img;
	tourView.getView("smallPicture").applyProperties(smallImageStyle);
	
	//background
	tourView.getView("background").applyProperties({image: tour.background});
	
	//title
	tourView.getView("title").text = tour.title;
	
	textWidth = tourView.getView("title").toImage().width;
	if (textWidth > (bigImgSize * 0.7)) {
		textWidth = bigImgSize * 0.7;
	}

	tourView.getView("title").applyProperties({
		top: bigImgSize / 6,
		width: textWidth
	});
	
	//text
	tourView.getView("text").text = tour.text;
	
	textWidth = tourView.getView("text").toImage().width;
	if (textWidth > (bigImgSize * 0.8)) {
		textWidth = bigImgSize * (0.8);
	}

	tourView.getView("text").applyProperties({
		top: bigImgSize / 6 + 10 + tourView.getView("title").toImage().height,
		width: textWidth
	});
	
	//icons
	tourView.getView("icons").applyProperties({top: bigImgSize * 4 / 6, left: bigImgSize / 2 - 90});
	tourView.getView("sizeMb").text = tour.size;
	
	tourView.getView("dotAmount").text = tour.tourPath.length;
	
	tourView.getView("time").text = tour.time;
	if (tour.price === 0) {
		tourView.getView("price").text = "FREE";
	} else {
		tourView.getView("price").text = "$" + tour.price;
	}
	
	var buttonView = tourView.getView("button");
	buttonView.currentTour = tour;
	//button
	if (!tour.isBuyed) {
		buttonImgPath = "images/tourView/Buy_Button.png";
		tourView.setListenerFlag(0);
	} else {
		if (tour.isDownloaded) {
			buttonImgPath = "images/tourView/Play_Button.png";
			tourView.setListenerFlag(2);
		} else {
			buttonImgPath = "images/tourView/Download_Button.png";
			tourView.setListenerFlag(1);
		}
	}
	buttonView.applyProperties({
		left: bigImgSize / 2 - 46,
		image: buttonImgPath
	});
	tourView.getView("loadingIco").applyProperties({
		left: bigImgSize / 2 + 56
	});
	
	//show View
	return tourView.getView();
}

exports.initTourViews = function(index) {
	controller = index;
	
	var toursLength = tours.length, pagingArray = [];
	var paging = controller.getView("paging"), scrollView = Ti.UI.createScrollableView();//controller.getView("scrollView");
	
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
	
	controller.getView("window").add(scrollView);

	var menu = Alloy.createController("menuView");
	controller.getView("window").add(menu.getView("menuListener"));
	controller.getView("window").add(menu.getView("menu"));
		
	controller.getView().open();
};

exports.getBigImageStyle = function() {
	return bigImageStyle;
};

exports.getSmallImageStyle = function() {
	return smallImageStyle;
};

