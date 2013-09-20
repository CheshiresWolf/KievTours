var controller;
var currentTour;

var scrollView;

var platformWidth = Titanium.Platform.displayCaps.platformWidth;
var bigSircleSize = platformWidth * 0.9; //90%

var leftOffsetBig = platformWidth * 0.05; //5%
var leftOffsetSmall = platformWidth - (leftOffsetBig + bigSircleSize / 4);

var topOffsetBig = (Titanium.Platform.displayCaps.platformHeight - bigSircleSize) / 2;

var bigSircleStyle = {
	image: "images/Map.png",
	width: bigSircleSize,
	height: bigSircleSize,
	top: topOffsetBig,
	left: leftOffsetBig,
	zIndex: 3
};

var smallSirclePhotoStyle = {
	width: bigSircleSize / 3.5,
	height: bigSircleSize / 3.5,
	top: topOffsetBig - bigSircleSize / 14,
	left: platformWidth - (leftOffsetBig + bigSircleSize / 3.5) - 30,
	zIndex: 5
};

var smallSircleAudioStyle = {
	image: "images/dotsView/SmallPictureAudio.png",
	width: bigSircleSize / 4.5,
	height: bigSircleSize / 4.5,
	top: topOffsetBig - 5 + bigSircleSize / 4,
	left: platformWidth - (leftOffsetBig + bigSircleSize / 4.5) + 10,
	zIndex: 5
};

var smallSircleListStyle = {
	image: "images/dotsView/SmallPictureList.png",
	width: bigSircleSize / 5.5,
	height: bigSircleSize / 5.5,
	top: topOffsetBig + bigSircleSize / 2, // 2 / 4
	left: platformWidth - (leftOffsetBig + bigSircleSize / 5.5) + 10,
	zIndex: 5
};

var smallSircleCenterStyle = {
	image: "images/dotsView/SmallPictureCenter.png",
	width: bigSircleSize / 6.5,
	height: bigSircleSize / 6.5,
	top: topOffsetBig - 5 + bigSircleSize * 3 / 4,
	left: platformWidth - (leftOffsetBig + bigSircleSize / 4.5),
	zIndex: 5
};

function createDotView() {
	var dotsView = Alloy.createController("dotsView");
	
	dotsView.getView("bigPicture").applyProperties(bigSircleStyle);
	smallSirclePhotoStyle.image = currentTour.img;
	dotsView.getView("smallPicturePhoto").applyProperties(smallSirclePhotoStyle);
	dotsView.getView("smallPictureAudio").applyProperties(smallSircleAudioStyle);
	dotsView.getView("smallPictureList").applyProperties(smallSircleListStyle);
	dotsView.getView("smallPictureCenter").applyProperties(smallSircleCenterStyle);
	
	return dotsView.getView();
}

//for some reasons ScrollableView from xml crashed
function resetScrollableView() {
	controller.getView("window").remove(scrollView);
	scrollView = Ti.UI.createScrollableView();
	controller.getView("window").add(scrollView);
}

exports.initDotsView = function() {
	controller.getView("window").applyProperties({backgroundColor: "white"});
	controller.getView("logo").applyProperties({image: "images/APP_Kiev_logo_green.png"});
	scrollView = controller.getView("scrollView");
	//scrollView.applyProperties({backgroundColor: "red"});
	
	resetScrollableView();
	
	scrollView.addView(createDotView());
	
	var pagingArray = [], paging = controller.getView("paging"), dotsLength = currentTour.dots.length;
	
	//init paging
	for (var i = 0; i < dotsLength; i++) {
		pagingArray.push(Ti.UI.createImageView({
			width : 5,
			height : 5,
			left : 10 * i,
			image : "images/Radio_bullets_off.png"
		}));
		paging.add(pagingArray[i]);
	}
	paging.applyProperties({
		bottom: 50,
		height: 5,
		width: pagingArray.length * 10,
		zIndex: 4
	});
	pagingArray[0].applyProperties({image: "images/Radio_bullets_on.png"});
		
	controller.getView().open();
};

exports.setData = function (newController, tour) {
	controller = newController;
	currentTour = tour;
};

exports.getBigImageStyle = function() {
	return bigSircleStyle;
};

exports.getSmallImagePhotoStyle = function() {
	return smallSirclePhotoStyle;
};

exports.getSmallImageAudioStyle = function() {
	return smallSircleAudioStyle;
};
