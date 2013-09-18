//init menu
$.menu.applyProperties({
	backgroundImage: "images/menu/Menu_close_large.png",
	bottom : -55
});

$.window.addEventListener("swipe", function(e) {
	//Ti.API.info("swipe" + e.direction);
	
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
