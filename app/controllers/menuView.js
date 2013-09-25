var menuFlag = false;

//init menu
$.menu.applyProperties({
	backgroundImage: "images/menu/Menu_close_large.png",
	bottom : -55
});

$.menuListener.addEventListener("click", function(e) {
	
	if (menuFlag === false) {
		$.menu.animate({
			bottom : 0
		}, function() {
			$.menu.applyProperties({backgroundImage: "images/menu/Menu_open_large.png"});
		});
		
		menuFlag = true;
	} else {
		$.menu.animate({
			bottom : -55
		}, function() {
			$.menu.applyProperties({backgroundImage: "images/menu/Menu_close_large.png"});
		});
			
		menuFlag = false;
	}
});
