var controller;

var platformWidth = Titanium.Platform.displayCaps.platformWidth;
var bigSircleSize = platformWidth * 0.9; //90%

var leftOffsetBig = platformWidth * 0.05; //5%
var leftOffsetSmall = platformWidth - (leftOffsetBig + bigSircleSize / 4);

var topOffsetBig = (Titanium.Platform.displayCaps.platformHeight - bigSircleSize) / 2;
var smallSirclePhotoTopOffset = topOffsetBig - (bigSircleSize / 12); // topOffset - smallSirclePhoto / 3 : smallSirclePhoto = bigSircleSize / 4

var bigSircleStyle = {
	image: "images/BigSircle.png",
	width: bigSircleSize,
	height: bigSircleSize,
	top: topOffsetBig,
	left: leftOffsetBig
};

var smallSirclePhotoStyle = {
	image: "images/dotsView/SmallSircleMap.png",
	width: bigSircleSize / 4,
	height: bigSircleSize / 4,
	top: smallSirclePhotoTopOffset,
	left: leftOffsetSmall - 30
};

var smallSircleAudioStyle = {
	image: "images/dotsView/SmallPictureAudio.png",
	width: bigSircleSize / 5,
	height: bigSircleSize / 5,
	top: smallSirclePhotoTopOffset + bigSircleSize / 4 + 5,
	left: leftOffsetSmall - 20
};

exports.initDotsView = function() {
	controller.getView("window").applyProperties({backgroundColor: "white"});
	controller.getView("logo").applyProperties({image: "images/APP_Kiev_logo_green.png"});
	
	var dotsView = Alloy.createController("dotsView");
	
	dotsView.getView("bigPicture").applyProperties(bigSircleStyle);
	dotsView.getView("smallPicturePhoto").applyProperties(smallSirclePhotoStyle);
	dotsView.getView("smallPictureAudio").applyProperties(smallSircleAudioStyle);
	dotsView.getView("bigPicture").applyProperties({backgroundColor: "blue"});
	
	controller.getView("scrollView").addView(dotsView.getView());
	controller.getView().open();
};

exports.setController = function (newController) {
	controller = newController;
};
