function addAnotation(dot, i) {
    var annot = Titanium.Map.createAnnotation({
        title: currentTour.dots[i].name,
        latitude: dot.latitude,
        longitude: dot.longitude,
        myid: i
    });
    annot.addEventListener("click", function(evt) {
        pagingArray[activeDotIndex].applyProperties({
            image: "images/Radio_bullets_off.png"
        });
        activeDotIndex = evt.annotation.myid;
        pagingArray[evt.annotation.myid].applyProperties({
            image: "images/Radio_bullets_on.png"
        });
        dotsView.setDot(evt.annotation.myid);
        controller.getView("scrollView").remove(dotText.getView());
        dotText = Alloy.createController("dotsViewText");
        dotText.initText(currentTour.dots[evt.annotation.myid], controller.getView("scrollView"));
        controller.getView("scrollView").add(dotText.getView());
    });
    dotsView.getView("map").addAnnotation(annot);
}

function initMask() {
    Ti.API.info("INIT");
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
    var i = 0;
    var isComplete;
    dotsView = Alloy.createController("dotsView");
    dotsView.setStyles(bigSircleStyle, smallSirclePhotoStyle, smallSircleAudioStyle);
    dotsView.setController(controller, currentTour);
    audioView = Alloy.createController("audioPlayer");
    audioView.initPlayer(bigSircleSize, currentTour.songPath);
    dotsView.getView("bigPicture").applyProperties(bigSircleStyle);
    dotsView.getView("map").addEventListener("complete", function() {
        if (!isComplete) {
            dotsView.getView("map").region = {
                latitude: currentTour.dots[0].latitude,
                longitude: currentTour.dots[0].longitude,
                latitudeDelta: .01,
                longitudeDelta: .01
            };
            for (i = 0; currentTour.dots.length > i; i++) addAnotation(currentTour.dots[i], i);
            isComplete = true;
        }
    });
    initMask();
    smallSirclePhotoStyle.image = currentTour.img;
    dotsView.getView("smallPicturePhoto").applyProperties(smallSirclePhotoStyle);
    dotsView.getView("gallery").addView(Ti.UI.createImageView({
        image: currentTour.dots[0].gallery[0],
        top: topOffsetBig,
        width: Titanium.Platform.displayCaps.platformWidth
    }));
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
    dotsView.getView("smallPictureAudio").applyProperties(smallSircleAudioStyle);
    dotsView.getView("player").add(audioView.getView());
    dotsView.getView("smallPictureList").applyProperties(smallSircleListStyle);
    dotsView.getView("smallPictureCenter").applyProperties(smallSircleCenterStyle);
    var paging = dotsView.getView("dotsPaging"), dotsLength = currentTour.dots.length;
    for (var i = 0; dotsLength > i; i++) {
        pagingArray.push(Ti.UI.createImageView({
            top: 0,
            width: 5,
            height: 5,
            left: 10 * i,
            image: "images/Radio_bullets_off.png"
        }));
        paging.add(pagingArray[i]);
    }
    paging.applyProperties({
        top: topOffsetBig + bigSircleSize + 25,
        width: 10 * pagingArray.length,
        height: 5
    });
    activeDotIndex = 0;
    pagingArray[0].applyProperties({
        image: "images/Radio_bullets_on.png"
    });
    return dotsView.getView();
}

var controller, currentTour;

var dotsView, audioView, dotText;

var pagingArray = [];

var activeDotIndex;

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
    controller = newController;
    currentTour = tour;
    controller.getView("logo").applyProperties({
        image: "images/APP_Kiev_logo_green.png"
    });
    controller.getView("scrollView").add(createDotView());
    dotText = Alloy.createController("dotsViewText");
    controller.getView("scrollView").add(dotText.getView());
    var menu = Alloy.createController("menuView");
    menu.getView("buttonTours").addEventListener("click", function() {
        Alloy.Globals.closeWindow(controller.getView("window"));
    });
    controller.getView("window").add(menu.getView("menuListener"));
    controller.getView("window").add(menu.getView("menu"));
    controller.close = function() {
        audioView.closePlayer();
        controller.getView().close();
    };
    Alloy.Globals.openWindow(controller.getView("window"));
};