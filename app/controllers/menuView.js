var menuFlag = false;

function openMenu() {
	$.menu.animate({
		bottom : 0
	}, function() {
		$.menu.applyProperties({backgroundImage: "images/menu/Menu_open_large.png"});
	});
	
	menuFlag = true;
}

function closeMenu() {
	$.menu.animate({
		bottom : -55
	}, function() {
		$.menu.applyProperties({backgroundImage: "images/menu/Menu_close_large.png"});
	});
		
	menuFlag = false;
}

//init menu
$.menu.applyProperties({
	backgroundImage: "images/menu/Menu_close_large.png",
	bottom : -55
});

$.menuListener.addEventListener("click", function(e) {	
	if (!menuFlag) {
		openMenu();
	} else {
		closeMenu();
	}
});

$.buttonTours.addEventListener("click", function() {
	Alloy.Globals.backToRootWindow();
});

$.buttonMore.addEventListener("click", function() {
	var more = Alloy.createController("more");
	var menu = Alloy.createController("menuView");
	
	more.getView("window").add(menu.getView("menuListener"));
	more.getView("window").add(menu.getView("menu"));
	more.fillTable();
	
	closeMenu();
	Alloy.Globals.openWindow(more.getView());
});

$.buttonTips.addEventListener("click", function() {
	var sityTips = Alloy.createController("sityTipsMenu");
	var menu = Alloy.createController("menuView");
	
	sityTips.getView("window").add(menu.getView("menuListener"));
	sityTips.getView("window").add(menu.getView("menu"));
	sityTips.init(Alloy.Globals.getTips());
	
	closeMenu();
	Alloy.Globals.openWindow(sityTips.getView());
});
