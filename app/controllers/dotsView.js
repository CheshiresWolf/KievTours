var controller, currentTour, currentDot;
var bigImageStyle, smallImagePhotoStyle, smallImageAudioStyle;

//int position of last loaded photo from currentDot.gallery
var alreadyLoaded = 0;

var userPosition = {
	latitude: 0,
	longitude: 0
};

var galleryIndex = 0;

Titanium.Geolocation.getCurrentPosition(function(e) {
	if (!e.error) {
		userPosition.latitude = e.coords.latitude;
		userPosition.longitude = e.coords.longitude;
	} else {
		Ti.API.info('T_T');
	}
});

$.bigPicture.addEventListener("click", function(e) {
	galleryShow(false);
	playerShow(false);
	$.smallPicturePhoto.animate(smallImagePhotoStyle);
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
	galleryShow(false);
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
		controller.close();
		Alloy.Globals.closeWindow(list.getView("window"));
	});
	list.getView("window").add(menu.getView("menuListener"));
	list.getView("window").add(menu.getView("menu"));
	list.fillTable(currentTour.dots, userPosition);
	Alloy.Globals.openWindow(list.getView("window"));
});

$.smallPictureCenter.addEventListener("click", function(e) {
	galleryShow(false);
	$.smallPicturePhoto.animate(smallImagePhotoStyle);
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
		$.gallery.scrollToView(galleryIndex);
		$.galleryPaging.text = (galleryIndex + 1) + "/" + currentDot.gallery.length;
	}
});

$.galleryRight.addEventListener("click", function(e) {
	if (galleryIndex < currentDot.gallery.length - 1) {
		galleryIndex++;
		
		if (galleryIndex > alreadyLoaded) {
			alreadyLoaded++;
			
			$.gallery.addView(Ti.UI.createImageView({
				image: currentDot.gallery[galleryIndex],
				top: bigImageStyle.top, 
				width: Titanium.Platform.displayCaps.platformWidth
			}));
		}
		
		$.gallery.scrollToView(galleryIndex);
		$.galleryPaging.text = (galleryIndex + 1) + "/" + currentDot.gallery.length;
	}
});

function galleryShow(flag) {
	var img = currentTour.img;
	
	if (flag) img = "";
	
	$.smallPicturePhoto.applyProperties({image: img});
	$.galleryLeft.setVisible(flag);
	$.galleryPaging.setVisible(flag);
	$.galleryRight.setVisible(flag);
	$.gallery.setVisible(flag);
	$.dotsPaging.setVisible(!flag);
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
		latitude: currentDot.latitude,
		longitude: currentDot.longitude,
		//temporary FIX ====================================================================
		latitudeDelta: 0.01,
		longitudeDelta: 0.01
	};
}

exports.setDot = function(i) {
	currentDot = currentTour.dots[i];
	centeringMap();
};

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
	
	$.galleryPaging.text = "1/" + currentDot.gallery.length;
};
