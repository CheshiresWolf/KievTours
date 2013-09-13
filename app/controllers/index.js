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
	if (e.direction == "up") {
		$.menu.applyProperties({
			image: "images/Menu_open.png"
		});
		$.menu.animate({
			height: 60
		}, function() {
			/*$.menu.add(
				Ti.UI.createImageView({
					image:"images/Menu_icon_tour.png",
					width: 50,
					height: 50,
					bottom: 5,
					left: 10
				})
			);
			$.menu.add(
				Ti.UI.createImageView({
					image:"images/Menu_icon_discover.png",
					width: 50,
					height: 50,
					bottom: 5,
					left: 75
				})
			);
			$.menu.add(
				Ti.UI.createImageView({
					image:"images/Menu_icon_sityTrips.png",
					width: 50,
					height: 50,
					bottom: 5,
					left: 140
				})
			);
			$.menu.add(
				Ti.UI.createImageView({
					image:"images/Menu_icon_more.png",
					width: 50,
					height: 50,
					bottom: 5,
					left: 205
				})
			);
		});
		*/
		$.menu.add(buttonView);
	}
	if (e.direction == "down") {
		$.menu.animate({
			height: 15
		}, function() {
			//$.menu.removeAllChildren();
			//Ti.API.info("cildrens - " + $.menu.getChildren().length);
			$.menu.remove(buttonView);
			
			$.menu.applyProperties({
				height: 30,
				image: "images/Menu_closed.png"
			});
		});
	}
});

var tour = require("lib/tourViewModel");

tour.showTours($.scrollView);
//===========================================
//Ti.API.info("index.js open");
//===========================================