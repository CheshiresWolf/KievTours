//===========================================
//Ti.API.info("index.js start");
//===========================================

//var realImgSize = 556 //real images/BigSircle.png size

$.scrollView.addEventListener("scrollend", function(e) {
	Ti.API.info("scrollend | " + e.type);
});

$.window.addEventListener("swipe", function(e) {
	Ti.API.info("swipe" + e.direction);
	if (e.direction == "up") {};
		//$.menu.animate({
		//	height: 60
		//});
		/*applyProperties({
			image: "images/Menu_open.png",
			height: 60
		});
	}
	if (e.direction == "down") {
		$.menu.applyProperties({
			image: "images/Menu_closed.png",
			height: 30
		});
	}*/
});

var tour = require("lib/tourViewModel");

tour.showTours($.scrollView);
//===========================================
//Ti.API.info("index.js open");
//===========================================