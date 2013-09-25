var swapDirection = false; // false - swap small with big

var bigImageStyle, smallImageStyle;
var listenerFlag = 0;
var currentTour;

$.bigPicture.addEventListener("click", function(e) {
	if (swapDirection) {
		$.bigPicture.applyProperties({image: "images/BigSircle.png"});
		$.bigPicture.animate(bigImageStyle);
		$.smallPicture.animate(smallImageStyle);
		$.tourContent.setVisible(true);
		swapDirection = false;
	}
});

$.smallPicture.addEventListener("click", function(e) {
	if (!swapDirection) {
		$.tourContent.setVisible(false);
		$.bigPicture.animate(smallImageStyle);
		$.smallPicture.animate(bigImageStyle);
		$.bigPicture.applyProperties({image: "images/SmallSircleInfo.png"});
		swapDirection = true;
	}
});

$.button.addEventListener("click", function () {
	switch (listenerFlag) {
		case 0:
			currentTour.buy();
			$.button.applyProperties({image: "images/tourView/Download_Button.png"});
			listenerFlag++;
		break;
		case 1:
			currentTour.download();
			$.button.applyProperties({image: "images/tourView/Play_Button.png"});
			listenerFlag++;
		break;
		case 2:
			var newWindow = Alloy.createController("index");
			var insideTourProcedures = require("lib/insideTourProcedures");
			
			insideTourProcedures.initDotsView(newWindow, currentTour);
		break;
	}
});

exports.setListenerFlag = function (listener) {
	listenerFlag = listener;
};

exports.setTour = function (tour) {
	currentTour = tour;
};

exports.setStyles = function (bigStyle, smallStyle) {
	bigImageStyle = bigStyle;
	smallImageStyle = smallStyle;
};
