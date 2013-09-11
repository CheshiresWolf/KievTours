function doClick(e) {
    alert("Hello");
    Ti.API.info("click");
}

var tours = require("Tour");

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



$.mainWindow.open();
