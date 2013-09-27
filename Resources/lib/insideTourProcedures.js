function addAnotation(dot, i) {
    var annot = Titanium.Map.createAnnotation({
        title: "OLOLO " + i,
        latitude: dot.latitude,
        longitude: dot.longitude,
        myid: i
    });
    annot.addEventListener("click", function(evt) {
        Ti.API.info("ANNOTATION");
        Ti.API.info("Annotation " + evt.title + " clicked, id: " + evt.annotation.myid);
        ("leftButton" == evt.clicksource || "leftPane" == evt.clicksource || "leftView" == evt.clicksource) && Ti.API.info("Annotation " + evt.title + ", left button clicked.");
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
    currentDot = currentTour.dots[0];
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
    dotsView.getView("smallPictureAudio").applyProperties(smallSircleAudioStyle);
    dotsView.getView("player").add(audioView.getView());
    dotsView.getView("smallPictureList").applyProperties(smallSircleListStyle);
    dotsView.getView("smallPictureCenter").applyProperties(smallSircleCenterStyle);
    return dotsView.getView();
}

var controller;

var currentTour;

var dotsView, audioView, scrollView;

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
    controller.getView("window").add(createDotView());
    var pagingArray = [], paging = controller.getView("paging"), dotsLength = currentTour.dots.length;
    for (var i = 0; dotsLength > i; i++) {
        pagingArray.push(Ti.UI.createImageView({
            width: 5,
            height: 5,
            left: 10 * i,
            image: "images/Radio_bullets_off.png"
        }));
        paging.add(pagingArray[i]);
    }
    paging.applyProperties({
        bottom: 50,
        height: 5,
        width: 10 * pagingArray.length,
        zIndex: 4
    });
    pagingArray[0].applyProperties({
        image: "images/Radio_bullets_on.png"
    });
    var menu = Alloy.createController("menuView");
    menu.getView("buttonTours").addEventListener("click", function() {
        controller.close();
    });
    controller.getView("window").add(menu.getView("menuListener"));
    controller.getView("window").add(menu.getView("menu"));
    controller.close = function() {
        audioView.closePlayer();
        controller.getView().close();
    };
    controller.getView().open();
};