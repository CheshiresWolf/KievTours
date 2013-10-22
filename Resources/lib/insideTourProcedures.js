function changeDot(id) {
    var bufAnnotImage = Ti.UI.createLabel({
        text: activeDotIndex,
        width: 35,
        height: 55,
        backgroundImage: "images/dotsView/MapPin_off.png",
        textAlign: "center",
        font: {
            fontSize: 10
        }
    });
    pagingArray[activeDotIndex].applyProperties({
        image: "images/Radio_bullets_off.png"
    });
    annotationArray[activeDotIndex].applyProperties({
        image: bufAnnotImage.toImage()
    });
    activeDotIndex = id;
    bufAnnotImage = Ti.UI.createLabel({
        text: activeDotIndex,
        width: 35,
        height: 55,
        backgroundImage: "images/dotsView/MapPin_on.png",
        textAlign: "center",
        font: {
            fontSize: 10
        }
    });
    pagingArray[activeDotIndex].applyProperties({
        image: "images/Radio_bullets_on.png"
    });
    annotationArray[activeDotIndex].applyProperties({
        image: bufAnnotImage.toImage()
    });
    dotsView.setDot(activeDotIndex);
    controller.getView("scrollView").remove(dotText.getView());
    dotText = Alloy.createController("dotsViewText");
    dotText.initText(currentTour.dots[activeDotIndex], activeDotIndex);
    controller.getView("scrollView").add(dotText.getView());
}

function addAnotation(dot, i) {
    var image = "images/dotsView/MapPin_off.png";
    0 === i && (image = "images/dotsView/MapPin_on.png");
    var annotImage = Ti.UI.createLabel({
        text: i,
        width: 35,
        height: 55,
        backgroundImage: image,
        textAlign: "center",
        font: {
            fontSize: 10
        }
    });
    var annot = Titanium.Map.createAnnotation({
        title: currentTour.dots[i].name,
        image: annotImage.toImage(),
        latitude: dot.latitude,
        longitude: dot.longitude,
        myid: i
    });
    annot.addEventListener("click", function(evt) {
        changeDot(evt.annotation.myid);
    });
    annotationArray.push(annot);
    dotsView.getView("map").addAnnotation(annot);
}

function initMask() {
    dotsView.getView("maskCenter").applyProperties({
        width: bigSircleSize,
        height: bigSircleSize,
        top: topOffsetBig,
        left: leftOffsetBig,
        zIndex: 4
    });
    dotsView.getView("maskTop").applyProperties({
        top: 0,
        left: 0,
        width: platformWidth,
        height: topOffsetBig,
        zIndex: 4
    });
    dotsView.getView("maskBottom").applyProperties({
        top: topOffsetBig + bigSircleSize,
        left: 0,
        width: platformWidth,
        height: topOffsetBig,
        zIndex: 4
    });
    dotsView.getView("maskLeft").applyProperties({
        top: topOffsetBig,
        left: 0,
        width: leftOffsetBig,
        height: bigSircleSize,
        zIndex: 4
    });
    dotsView.getView("maskRight").applyProperties({
        top: topOffsetBig,
        right: 0,
        width: leftOffsetBig,
        height: bigSircleSize,
        zIndex: 4
    });
}

function createDotView() {
    Ti.API.info("insideTourProcedures| createDotView");
    var isComplete = false;
    dotsView = Alloy.createController("dotsView");
    dotsView.setStyles(bigSircleStyle, smallSirclePhotoStyle, smallSircleAudioStyle);
    dotsView.setController(controller, currentTour);
    dotsView.setDot(0);
    audioView = Alloy.createController("audioPlayer");
    audioView.initPlayer(bigSircleSize, currentTour.audio.player);
    dotsView.getView("bigPicture").applyProperties(bigSircleStyle);
    dotsView.getView("map").addEventListener("complete", function() {
        if (!isComplete) {
            dotsView.getView("map").region = {
                latitude: currentTour.dots[0].latitude,
                longitude: currentTour.dots[0].longitude,
                latitudeDelta: .01,
                longitudeDelta: .01
            };
            var i = 0, tourDotsLength = currentTour.dots.length;
            for (i; tourDotsLength > i; i++) addAnotation(currentTour.dots[i], i);
            isComplete = true;
        }
    });
    initMask();
    smallSirclePhotoStyle.image = currentTour.dots[0].cover;
    dotsView.getView("smallPicturePhoto").applyProperties(smallSirclePhotoStyle);
    dotsView.setDot(0);
    var galleryControlsOffset = bigSircleSize + topOffsetBig - 30;
    dotsView.getView("galleryLeft").applyProperties({
        top: galleryControlsOffset
    });
    dotsView.getView("galleryPaging").applyProperties({
        top: galleryControlsOffset
    });
    dotsView.getView("galleryRight").applyProperties({
        top: galleryControlsOffset
    });
    dotsView.getView("galleryLeftListener").applyProperties({
        top: galleryControlsOffset
    });
    dotsView.getView("galleryRightListener").applyProperties({
        top: galleryControlsOffset
    });
    Ti.API.info("insideTourProcedures| createDotView | form view");
    dotsView.getView("smallPictureAudio").applyProperties(smallSircleAudioStyle);
    dotsView.getView("player").add(audioView.getView());
    dotsView.getView("smallPictureList").applyProperties(smallSircleListStyle);
    dotsView.getView("smallPictureCenter").applyProperties(smallSircleCenterStyle);
    var paging = dotsView.getView("dotsPaging"), pagingI = 0, dotsLength = currentTour.dots.length;
    for (pagingI; dotsLength > pagingI; pagingI++) {
        pagingArray.push(Ti.UI.createImageView({
            top: 0,
            width: 5,
            height: 5,
            left: 10 * pagingI,
            image: "images/Radio_bullets_off.png"
        }));
        paging.add(pagingArray[pagingI]);
    }
    paging.applyProperties({
        top: topOffsetBig + bigSircleSize + 25,
        width: 10 * pagingArray.length,
        height: 5
    });
    pagingArray[0].applyProperties({
        image: "images/Radio_bullets_on.png"
    });
    dotsView.getView().applyProperties({
        height: topOffsetBig + bigSircleSize + 50
    });
    return dotsView.getView();
}

var controller, currentTour;

var dotsView, audioView, dotText;

var pagingArray = [], annotationArray = [];

var activeDotIndex = 0;

var isGallerySet = false;

var platformWidth = Titanium.Platform.displayCaps.platformWidth;

var bigSircleSize = .9 * platformWidth;

var leftOffsetBig = .05 * platformWidth;

var leftOffsetSmall = platformWidth - (leftOffsetBig + bigSircleSize / 4);

var topOffsetBig = (Titanium.Platform.displayCaps.platformHeight - bigSircleSize) / 2;

var bigSircleStyle = {
    width: bigSircleSize,
    height: bigSircleSize,
    top: topOffsetBig,
    left: leftOffsetBig,
    zIndex: 2
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
    top: topOffsetBig + bigSircleSize / 2,
    left: platformWidth - (leftOffsetBig + bigSircleSize / 5.5) + 10,
    zIndex: 5
};

var smallSircleCenterStyle = {
    image: "images/dotsView/SmallPictureCenter.png",
    width: bigSircleSize / 6.5,
    height: bigSircleSize / 6.5,
    top: topOffsetBig - 5 + 3 * bigSircleSize / 4,
    left: platformWidth - (leftOffsetBig + bigSircleSize / 4.5),
    zIndex: 5
};

exports.initDotsView = function(newController, tour) {
    Ti.API.info("insideTourProcedures| initDotsView");
    controller = newController;
    currentTour = tour;
    controller.getView("logo").setVisible(false);
    controller.getIndex = function() {
        return activeDotIndex;
    };
    controller.setIndex = function(id) {
        changeDot(id);
        dotsView.getView("map").selectAnnotation(annotationArray[id]);
    };
    controller.getView("logo").applyProperties({
        image: "images/APP_Kiev_logo_green.png"
    });
    controller.getView("scrollView").add(createDotView());
    dotText = Alloy.createController("dotsViewText");
    dotText.initText(currentTour.dots[0], 0);
    controller.getView("scrollView").add(dotText.getView());
    var menu = Alloy.createController("menuView");
    controller.getView("window").add(menu.getView("menuListener"));
    controller.getView("window").add(menu.getView("menu"));
    controller.getView("window").cleanTour = function() {
        audioView.closePlayer();
        pagingArray = [];
        annotationArray = [];
        isGallerySet = false;
        activeDotIndex = 0;
    };
    controller.getView("window").windowName = "dotView";
    Alloy.Globals.openWindow(controller.getView("window"));
};