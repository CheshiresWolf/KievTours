/*function doClick(e) {
    alert("Hello");
    Ti.API.info("click");
}

var tours = require("models/Tour");

for (var i = 0; tours.length; i++) {
	var bufView = Ti.UI.createView({
	    left: 50% - 278,
	    width : 556,
	    height: 556,
	    zIndex: 10,
	    backgroundImage: "images/BigSircle.png"
	});
	$.scrollableView.addView(bufView);
}

*/

//===========================================
//Ti.API.info("index.js start");
//===========================================

//var realImgSize = 556 //real images/BigSircle.png size
var bigImgSize = Titanium.Platform.displayCaps.platformWidth * (18 / 20); //90% of screen size
var leftOffset = (Titanium.Platform.displayCaps.platformWidth - bigImgSize) / 2; //5%
var topOffset = Titanium.Platform.displayCaps.platformHeight / 2 - bigImgSize / 2;

var bigPictureStyle;
var smallPictureStyle;
var titleWidth;/* = {
	width: bigImgSize,
	height: bigImgSize,
	left: leftOffset,
	top: topOffset
};*/

var smallImgSize = bigImgSize / 3;

var tours = Alloy.Globals.getTours();

for (i = 0; i < tours.length; i++) {
	//===========================================
	//Ti.API.info("index.js loop");
	//===========================================
	
	tours[i].controller = Alloy.createController("tourView");
	bigPictureStyle = {
		width: bigImgSize,
		height: bigImgSize,
		left: leftOffset,
		top: topOffset
	};
	tours[i].controller.getView("bigPicture").applyProperties(bigPictureStyle);
	
	smallPictureStyle = {
		width: smallImgSize,
		height: smallImgSize,
		right: leftOffset,
		top: topOffset - smallImgSize / 2,
		image: tours[i].img
	};
	tours[i].controller.getView("smallPicture").applyProperties(smallPictureStyle);
	
	tours[i].controller.getView("background").applyProperties({image: tours[i].background});
	
	tours[i].controller.getView("title").text = tours[i].text;
	
	titleWidth = tours[i].controller.getView("title").toImage().width;
	if (titleWidth > (bigImgSize * 7 / 10)) {
		titleWidth = bigImgSize * (7 / 10);
	}

	tours[i].controller.getView("title").applyProperties({
		top: bigImgSize / 6,
		width: titleWidth
	});
	
	$.scrollView.addView(tours[i].controller.getView());
}


/*var tourView = Alloy.createController("tourView");
tourView.getView("bigPicture").applyProperties(bigPictureStyle);
tourView.getView("smallPicture").applyProperties(smallPictureStyle);
$.scrollView.addView(tourView.getView());

var tourView2 = Alloy.createController("tourView");
$.scrollView.addView(tourView2.getView());*/

//===========================================
//Ti.API.info("index.js open");
//===========================================