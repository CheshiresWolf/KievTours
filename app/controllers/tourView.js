var swapDirection = false; // false - swap small with big

var bigImageStyle, smallImageStyle;
var listenerFlag = 0;
var currentTour;

//var loadingInterval = null;

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
			if (!Alloy.Globals.isLocked()) {
				$.button.setTouchEnabled(false);
				$.loadingIco.setVisible(true);
				$.loadingIco.index = 0;
				$.loadingIco.interval = setInterval(function() {
					$.loadingIco.applyProperties({image: "images/tourView/loading/loading_ico_" + $.loadingIco.index + ".png"});
					$.loadingIco.index++;
					if ($.loadingIco.index === 3) {
						$.loadingIco.index = 0;
					}
				}, 500);
				currentTour.download(pressButton);
			}
		break;
		case 2:			
			var newWindow = Alloy.createController("index");			
			var insideTourProcedures = require("lib/insideTourProcedures");
			
			insideTourProcedures.initDotsView(newWindow, currentTour);
		break;
	}
});

function pressButton() {
	if ($.loadingIco.interval !== undefined) {
		clearInterval($.loadingIco.interval);
		$.loadingIco.setVisible(false);
	}
	Alloy.Globals.openLock();
	$.button.applyProperties({image: "images/tourView/Play_Button.png", touchEnabled: true});
	listenerFlag++;
}

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
