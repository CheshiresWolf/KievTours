//===========================================
//Ti.API.info("index.js start");
//===========================================

//var realImgSize = 556 //real images/BigSircle.png size
var buttonView = Alloy.createController("buttonView").getView();

$.scrollView.addEventListener("scrollend", function(e) {
	Ti.API.info("scrollend | " + e.type);
});

$.window.addEventListener("swipe", function(e) {
	Ti.API.info("swipe" + e.direction);
	if (e.direction === "up") {
		$.menu.applyProperties({
			image : "images/Menu_open.png"
		});
		$.menu.animate({
			height : 60
		}, function() {

			$.menu.add(buttonView);
		});
	}
	if (e.direction === "down") {
		$.menu.animate({
			height : 15
		}, function() {
			//$.menu.removeAllChildren();
			//Ti.API.info("cildrens - " + $.menu.getChildren().length);
			$.menu.remove(buttonView);

			$.menu.applyProperties({
				height : 30,
				image : "images/Menu_closed.png"
			});
		});
	}
});

var tour = require("lib/tourViewModel");

tour.showTours($.scrollView);
//===========================================
//Ti.API.info("index.js open");
//===========================================