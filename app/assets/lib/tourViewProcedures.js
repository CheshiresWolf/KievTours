var bigImgSize = Titanium.Platform.displayCaps.platformWidth * (18 / 20); //90% of screen size
var leftOffset = (Titanium.Platform.displayCaps.platformWidth - bigImgSize) / 2; //5%
var topOffset = Titanium.Platform.displayCaps.platformHeight / 2 - bigImgSize / 2;
var textWidth, buttonImgPath;
var smallImgSize = bigImgSize / 3;

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
	left: Titanium.Platform.displayCaps.platformWidth - (leftOffset + smallImgSize),
	top: topOffset - smallImgSize / 2,
	zIndex: 5
};

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
	var newWindow = Alloy.createController("index");
	newWindow.getView("window").applyProperties({backgroundColor: "#336699"});
	newWindow.getView().open();
}

exports.initTourViews = function(index) {
	var tours = Alloy.Globals.getTours(), toursLength = tours.length, pagingArray = [];
	var currentPage = 0, oldIndex = 0;
	
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
			
			//if we turn right -->
			if (newIndex > oldIndex) {			
				//save pos
				currentPage++;
					
				loadedPages.push(children[oldIndex]);
				loadedPages.push(children[oldIndex + 1]);
				
				//if there are another tour left
				if (currentPage + 1 < tours.length) {
					loadedPages.push(makeTourView(tours[currentPage + 1]));
					oldIndex = 1;
				}
				
				scrollView.setViews(loadedPages);
				scrollView.setCurrentPage(1);			
				
				pagingArray[currentPage - 1].applyProperties({image: "images/Radio_bullets_off.png"});
				pagingArray[currentPage].applyProperties({image: "images/Radio_bullets_on.png"});
			} else {
				
				//save pos
				currentPage--;
				
				//if there are another tour left
				if (currentPage - 1 >= 0) {
					loadedPages.push(makeTourView(tours[currentPage - 1]));
					oldIndex = 1;
				} else {
					oldIndex = 0;
				}
				
				loadedPages.push(children[0]);
				loadedPages.push(children[1]);
				
				scrollView.setViews(loadedPages);
				scrollView.setCurrentPage(oldIndex);			
				
				pagingArray[currentPage + 1].applyProperties({image: "images/Radio_bullets_off.png"});
				pagingArray[currentPage].applyProperties({image: "images/Radio_bullets_on.png"});
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
	if (textWidth > (bigImgSize * 7 / 10)) {
		textWidth = bigImgSize * (7 / 10);
	}

	controller.getView("title").applyProperties({
		top: bigImgSize / 6,
		width: textWidth
	});
	
	//text
	controller.getView("text").text = tour.text;
	
	textWidth = controller.getView("text").toImage().width;
	if (textWidth > (bigImgSize * 8 / 10)) {
		textWidth = bigImgSize * (8 / 10);
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
	controller.getView("button").applyProperties({
		left: bigImgSize / 2 - 46,
		image: buttonImgPath
	});
	
	//show View
	return controller.getView();
};