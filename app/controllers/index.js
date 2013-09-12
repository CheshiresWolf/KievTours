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
var imgSize = Titanium.Platform.displayCaps.platformWidth * (18 / 20); //90% of screen size
var leftOffset = (Titanium.Platform.displayCaps.platformWidth - imgSize) / 2; //5%
var topOffset = Titanium.Platform.displayCaps.platformHeight / 2 - imgSize / 2;

var bigPictureStyle = {
	width: imgSize,
	height: imgSize,
	left: leftOffset,
	top: topOffset
};

var smallImgSize = imgSize / 3;

var smallPictureStyle = {
	width: smallImgSize,
	height: smallImgSize,
	right: leftOffset,
	top: topOffset - smallImgSize / 2
};

var tours = Alloy.Globals.getTours();

for (i = 0; i < tours.length; i++) {
	//===========================================
	//Ti.API.info("index.js loop");
	//===========================================
	smallPictureStyle.image = tours[i].img;
	
	tours[i].controller = Alloy.createController("tourView");
	tours[i].controller.getView("bigPicture").applyProperties(bigPictureStyle);
	tours[i].controller.getView("smallPicture").applyProperties(smallPictureStyle);
	
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