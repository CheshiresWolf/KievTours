var controller;
var currentTour;
var dotsView, audioView;
var scrollView;
//Prevent multiple event calls
var isComplete;
var platformWidth = Titanium.Platform.displayCaps.platformWidth;
var bigSircleSize = platformWidth * 0.9; //90%

var leftOffsetBig = platformWidth * 0.05; //5%
var leftOffsetSmall = platformWidth - (leftOffsetBig + bigSircleSize / 4);

var topOffsetBig = (Titanium.Platform.displayCaps.platformHeight - bigSircleSize) / 2;

var bigSircleStyle = {
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
	backgroundImage: "images/dotsView/SmallPictureAudio.png",
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
	var i = 0;
	
	dotsView = Alloy.createController("dotsView");
	audioView = Alloy.createController("audioPlayer");
	audioView.initPlayer(bigSircleSize);
	
	dotsView.getView("bigPicture").applyProperties(bigSircleStyle);
	
	dotsView.getView("map").addEventListener("complete", function() {
		if (!isComplete) {
			centeringMap(dotsView.getView("map"));
			
			for (i = 0; i < currentTour.dots.length; i++) {
				dotsView.getView("map").addAnnotation(Titanium.Map.createAnnotation({
					latitude: currentTour.dots[i].latitude,
					longitude: currentTour.dots[i].longitude,
					myid: i
				}));
			}
			isComplete = true;
		}
	});	
	dotsView.getView("mapMask").applyProperties({
		image: "images/dotsView/MapMask.png",
		width: bigSircleSize,
		height: bigSircleSize,
		top: 0,
		left: 0,
		zIndex: 4
	});
	
	smallSirclePhotoStyle.image = currentTour.img;
	dotsView.getView("smallPicturePhoto").applyProperties(smallSirclePhotoStyle);
	
	dotsView.getView("smallPictureAudio").applyProperties(smallSircleAudioStyle);
	
	dotsView.getView("player").add(audioView.getView());
	
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

//===============DON'T FORGET TO FIX IT=================================================
function centeringMap(map) {
	map.region = {
		latitude: currentTour.dots[0].latitude,
		longitude: currentTour.dots[0].longitude,
		latitudeDelta: 0.01,
		longitudeDelta: 0.01
	};
}

exports.initDotsView = function() {
	isComplete = false;
	//controller.getView("window").applyProperties({backgroundColor: "white"});
	controller.getView("logo").applyProperties({image: "images/APP_Kiev_logo_green.png"});
	scrollView = controller.getView("scrollView");
	
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

exports.centering = function(map) {
	centeringMap(map);
};
exports.getDots = function() {
	Ti.API.info('dots length = ' + currentTour.dots.length);
	return currentTour.dots;
};
