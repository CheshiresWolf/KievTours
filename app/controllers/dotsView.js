var insideTourProcedures = require("lib/insideTourProcedures");
var controller, currentTour, currentDot;
var bigImageStyle, smallImagePhotoStyle, smallImageAudioStyle;

$.bigPicture.addEventListener("click", function(e) {
	playerShow(false);
	$.smallPicturePhoto.animate(smallImagePhotoStyle);
	$.smallPictureAudio.animate(smallImageAudioStyle);
	$.bigPicture.animate(bigImageStyle, function() {
		bigPictureShow(true);
		centeringMap();
	});
});

$.smallPicturePhoto.addEventListener("click", function(e) {
	
	bigPictureShow(false);
	playerShow(false);
	$.bigPicture.animate(smallImagePhotoStyle);
	$.smallPicturePhoto.animate(bigImageStyle);
	$.smallPictureAudio.animate(smallImageAudioStyle);
});

$.smallPictureAudio.addEventListener("click", function(e) {
	bigPictureShow(false);
	$.bigPicture.animate(smallImageAudioStyle);
	$.smallPicturePhoto.animate(smallImagePhotoStyle);
	$.smallPictureAudio.animate(bigImageStyle, function() {
		playerShow(true);
	});
});

$.smallPictureList.addEventListener("click", function(e) {
	var list = Alloy.createController("dotsList");
	var menu = Alloy.createController("menuView");
	menu.getView("buttonTours").addEventListener("click", function() {
		list.getView().close();
		controller.getView().close();
	});
	list.getView("window").add(menu.getView("menuListener"));
	list.getView("window").add(menu.getView("menu"));
	list.fillTable(currentTour.dots);
	list.getView().open();
});

$.smallPictureCenter.addEventListener("click", function(e) {
	$.smallPicturePhoto.animate(smallImagePhotoStyle);
	$.smallPictureAudio.animate(smallImageAudioStyle, function() {	
		playerShow(false);
	});
	$.bigPicture.animate(bigImageStyle, function() {	
		bigPictureShow(true);
		centeringMap();
	});
});

function bigPictureShow(flag) {
	var img = "";
	
	if (!flag) img = "images/SmallSircleMap.png";
	
	$.bigPicture.applyProperties({backgroundImage: img});
	$.mapMask.setVisible(flag);
	$.map.setVisible(flag);
}

function playerShow(flag) {
	var img = "images/dotsView/audioBackground.png";
	
	if (!flag) img = "images/dotsView/SmallPictureAudio.png";
	
	$.smallPictureAudio.applyProperties({backgroundImage: img});
	$.player.setVisible(flag);
}

function centeringMap() {
	$.map.region = {
		//temporary FIX ====================================================================
		latitude: currentTour.dots[0].latitude,
		longitude: currentTour.dots[0].longitude,
		//temporary FIX ====================================================================
		latitudeDelta: 0.01,
		longitudeDelta: 0.01
	};
}

exports.setStyles = function(bigStyle, smallPhotoStyle, smallAudioStyle) {
	bigImageStyle = bigStyle;
	smallImagePhotoStyle = smallPhotoStyle;
	smallImageAudioStyle = smallAudioStyle;
};

exports.setController = function (tourController, tour) {
	controller = tourController;
	currentTour = tour;
};
