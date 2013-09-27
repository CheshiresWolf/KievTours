var controller, currentTour, currentDot;
var bigImageStyle, smallImagePhotoStyle, smallImageAudioStyle;

var userPosition = {
	latitude: 0,
	longitude: 0
};

var galleryIndex = 0;

Titanium.Geolocation.getCurrentPosition(function(e) {
	Ti.Geolocation.purpose = "Hello, we need you coordinates to calculate distance.";
	if (!e.error) {
		userPosition.latitude = e.coords.latitude;
		userPosition.longitude = e.coords.longitude;
	} else {
		Ti.API.info('T_T');
	}
});

$.bigPicture.addEventListener("click", function(e) {
	playerShow(false);
	$.smallPicturePhoto.animate(smallImagePhotoStyle, function() {
		galleryShow(false);
	});
	$.smallPictureAudio.animate(smallImageAudioStyle);
	$.bigPicture.animate(bigImageStyle, function() {
		bigPictureShow(true);
	});
});

$.smallPicturePhoto.addEventListener("click", function(e) {
	bigPictureShow(false);
	playerShow(false);
	$.bigPicture.animate(smallImagePhotoStyle);
	$.smallPicturePhoto.animate(bigImageStyle, function() {
		galleryShow(true);
	});
	$.smallPictureAudio.animate(smallImageAudioStyle);
});

$.smallPictureAudio.addEventListener("click", function(e) {
	bigPictureShow(false);
	$.bigPicture.animate(smallImageAudioStyle);
	$.smallPicturePhoto.animate(smallImagePhotoStyle, function() {
		galleryShow(false);
	});
	$.smallPictureAudio.animate(bigImageStyle, function() {
		playerShow(true);
	});
});

$.smallPictureList.addEventListener("click", function(e) {
	var list = Alloy.createController("dotsList");
	var menu = Alloy.createController("menuView");
	menu.getView("buttonTours").addEventListener("click", function() {
		list.getView().close();
		controller.close();
	});
	list.getView("window").add(menu.getView("menuListener"));
	list.getView("window").add(menu.getView("menu"));
	list.fillTable(currentTour.dots, userPosition);
	list.getView().open();
});

$.smallPictureCenter.addEventListener("click", function(e) {
	$.smallPicturePhoto.animate(smallImagePhotoStyle, function() {
		galleryShow(false);
	});
	$.smallPictureAudio.animate(smallImageAudioStyle, function() {	
		playerShow(false);
	});
	$.bigPicture.animate(bigImageStyle, function() {	
		bigPictureShow(true);
		centeringMap();
	});
});

$.galleryLeft.addEventListener("click", function(e) {
	if (galleryIndex > 0) {
		galleryIndex--;
		$.smallPicturePhoto.applyProperties({image: currentDot.gallery[galleryIndex]});
	}
});

$.galleryRight.addEventListener("click", function(e) {
	if (galleryIndex < currentTour.dots[0].gallery.length - 1) {
		galleryIndex++;
		$.smallPicturePhoto.applyProperties({image: currentDot.gallery[galleryIndex]});
	}
});

function galleryShow(flag) {
	var img = currentTour.img;
	
	if (flag) img = currentDot.gallery[0];
	
	$.smallPicturePhoto.applyProperties({image: img});
	$.galleryLeft.setVisible(flag);
	$.galleryRight.setVisible(flag);
}

function bigPictureShow(flag) {
	var img = "";
	
	if (!flag) img = "images/SmallSircleMap.png";
	
	$.bigPicture.applyProperties({backgroundImage: img});
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
	
	//temporary FIX ==================================================
	currentDot = currentTour.dots[0];
	//================================================================
};
