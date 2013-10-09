function Controller() {
    function galleryShow(flag) {
        var img = currentDot.cover;
        flag && (img = "");
        $.smallPicturePhoto.applyProperties({
            image: img
        });
        $.galleryLeft.setVisible(flag);
        $.galleryPaging.setVisible(flag);
        $.galleryRight.setVisible(flag);
        $.gallery.setVisible(flag);
        $.dotsPaging.setVisible(!flag);
    }
    function bigPictureShow(flag) {
        var img = "";
        flag || (img = "images/SmallSircleMap.png");
        $.bigPicture.applyProperties({
            backgroundImage: img
        });
        $.map.setVisible(flag);
    }
    function playerShow(flag) {
        var img = "images/dotsView/audioBackground.png";
        flag || (img = "images/dotsView/SmallPictureAudio.png");
        $.smallPictureAudio.applyProperties({
            backgroundImage: img
        });
        $.player.setVisible(flag);
    }
    function centeringMap() {
        $.map.region = {
            latitude: currentDot.latitude,
            longitude: currentDot.longitude,
            latitudeDelta: .01,
            longitudeDelta: .01
        };
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "dotsView";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.dotContainer = Ti.UI.createView({
        backgroundColor: "white",
        id: "dotContainer"
    });
    $.__views.dotContainer && $.addTopLevelView($.__views.dotContainer);
    var __alloyId0 = [];
    $.__views.map = Ti.Map.createView({
        width: "auto",
        height: "auto",
        zIndex: 3,
        userLocation: false,
        hideAnnotationWhenTouchMap: true,
        annotations: __alloyId0,
        id: "map",
        ns: Ti.Map,
        mapType: Titanium.Map.STANDARD_TYPE
    });
    $.__views.dotContainer.add($.__views.map);
    $.__views.maskCenter = Ti.UI.createImageView({
        image: "images/dotsView/MapMask.png",
        touchEnabled: false,
        zIndex: 4,
        id: "maskCenter"
    });
    $.__views.dotContainer.add($.__views.maskCenter);
    $.__views.maskTop = Ti.UI.createImageView({
        backgroundColor: "white",
        zIndex: 4,
        id: "maskTop"
    });
    $.__views.dotContainer.add($.__views.maskTop);
    $.__views.maskBottom = Ti.UI.createImageView({
        backgroundColor: "white",
        zIndex: 4,
        id: "maskBottom"
    });
    $.__views.dotContainer.add($.__views.maskBottom);
    $.__views.maskLeft = Ti.UI.createImageView({
        backgroundColor: "white",
        zIndex: 4,
        id: "maskLeft"
    });
    $.__views.dotContainer.add($.__views.maskLeft);
    $.__views.maskRight = Ti.UI.createImageView({
        backgroundColor: "white",
        zIndex: 4,
        id: "maskRight"
    });
    $.__views.dotContainer.add($.__views.maskRight);
    $.__views.bigPicture = Ti.UI.createView({
        id: "bigPicture"
    });
    $.__views.dotContainer.add($.__views.bigPicture);
    $.__views.smallPicturePhoto = Ti.UI.createImageView({
        id: "smallPicturePhoto"
    });
    $.__views.dotContainer.add($.__views.smallPicturePhoto);
    $.__views.smallPictureAudio = Ti.UI.createView({
        id: "smallPictureAudio"
    });
    $.__views.dotContainer.add($.__views.smallPictureAudio);
    $.__views.player = Ti.UI.createView({
        visible: false,
        id: "player"
    });
    $.__views.smallPictureAudio.add($.__views.player);
    $.__views.smallPictureList = Ti.UI.createImageView({
        id: "smallPictureList"
    });
    $.__views.dotContainer.add($.__views.smallPictureList);
    $.__views.smallPictureCenter = Ti.UI.createImageView({
        id: "smallPictureCenter"
    });
    $.__views.dotContainer.add($.__views.smallPictureCenter);
    var __alloyId1 = [];
    $.__views.gallery = Ti.UI.createScrollableView({
        top: 0,
        left: 0,
        width: "auto",
        height: "auto",
        visible: false,
        zIndex: 3,
        touchEnabled: false,
        views: __alloyId1,
        id: "gallery"
    });
    $.__views.dotContainer.add($.__views.gallery);
    $.__views.galleryLeft = Ti.UI.createImageView({
        image: "images/dotsView/galleryControlsLeft.png",
        left: 10,
        width: 10,
        height: 30,
        zIndex: 5,
        visible: false,
        id: "galleryLeft"
    });
    $.__views.dotContainer.add($.__views.galleryLeft);
    $.__views.galleryPaging = Ti.UI.createLabel({
        color: "white",
        width: 30,
        height: 30,
        zIndex: 5,
        visible: false,
        font: {
            fontSize: 8
        },
        textAlign: "center",
        id: "galleryPaging"
    });
    $.__views.dotContainer.add($.__views.galleryPaging);
    $.__views.galleryRight = Ti.UI.createImageView({
        image: "images/dotsView/galleryControlsRight.png",
        right: 10,
        width: 10,
        height: 30,
        zIndex: 5,
        visible: false,
        id: "galleryRight"
    });
    $.__views.dotContainer.add($.__views.galleryRight);
    $.__views.dotsPaging = Ti.UI.createView({
        zIndex: 4,
        id: "dotsPaging"
    });
    $.__views.dotContainer.add($.__views.dotsPaging);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var controller, currentTour, currentDot;
    var bigImageStyle, smallImagePhotoStyle, smallImageAudioStyle;
    var alreadyLoaded = 0;
    var userPosition = {
        latitude: 0,
        longitude: 0
    };
    var galleryIndex = 0;
    Titanium.Geolocation.getCurrentPosition(function(e) {
        if (e.error) Ti.API.info("T_T"); else {
            userPosition.latitude = e.coords.latitude;
            userPosition.longitude = e.coords.longitude;
        }
    });
    $.bigPicture.addEventListener("click", function() {
        galleryShow(false);
        playerShow(false);
        $.smallPicturePhoto.animate(smallImagePhotoStyle);
        $.smallPictureAudio.animate(smallImageAudioStyle);
        $.bigPicture.animate(bigImageStyle, function() {
            bigPictureShow(true);
        });
    });
    $.smallPicturePhoto.addEventListener("click", function() {
        bigPictureShow(false);
        playerShow(false);
        $.bigPicture.animate(smallImagePhotoStyle);
        $.smallPicturePhoto.animate(bigImageStyle, function() {
            galleryShow(true);
        });
        $.smallPictureAudio.animate(smallImageAudioStyle);
    });
    $.smallPictureAudio.addEventListener("click", function() {
        galleryShow(false);
        bigPictureShow(false);
        $.bigPicture.animate(smallImageAudioStyle);
        $.smallPicturePhoto.animate(smallImagePhotoStyle);
        $.smallPictureAudio.animate(bigImageStyle, function() {
            playerShow(true);
        });
    });
    $.smallPictureList.addEventListener("click", function() {
        var list = Alloy.createController("dotsList");
        var menu = Alloy.createController("menuView");
        list.getView("window").add(menu.getView("menuListener"));
        list.getView("window").add(menu.getView("menu"));
        list.fillTable(currentTour.dots, userPosition, controller.getIndex(), currentTour.title);
        list.getView("table").addEventListener("click", function(e) {
            controller.setIndex(e.index);
            Alloy.Globals.closeWindow();
        });
        Alloy.Globals.openWindow(list.getView("window"));
    });
    $.smallPictureCenter.addEventListener("click", function() {
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
    $.galleryLeft.addEventListener("click", function() {
        if (galleryIndex > 0) {
            galleryIndex--;
            $.gallery.scrollToView(galleryIndex);
            $.galleryPaging.text = galleryIndex + 1 + "/" + currentDot.gallery.length;
        }
        Ti.API.info("dotsView| gallery.length = " + $.gallery.getViews().length);
    });
    $.galleryRight.addEventListener("click", function() {
        if (currentDot.gallery.length - 1 > galleryIndex) {
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
            $.galleryPaging.text = galleryIndex + 1 + "/" + currentDot.gallery.length;
        }
        Ti.API.info("dotsView| gallery.length = " + $.gallery.getViews().length);
    });
    exports.setDot = function(i) {
        currentDot = currentTour.dots[i];
        $.smallPicturePhoto.applyProperties({
            image: currentDot.cover
        });
        galleryIndex = 0;
        alreadyLoaded = 0;
        $.gallery.views = [];
        var img = Ti.UI.createImageView({
            image: currentDot.gallery[0],
            top: bigImageStyle.top,
            width: Titanium.Platform.displayCaps.platformWidth
        });
        $.gallery.addView(img);
        centeringMap();
        $.galleryPaging.text = "1/" + currentDot.gallery.length;
    };
    exports.setStyles = function(bigStyle, smallPhotoStyle, smallAudioStyle) {
        bigImageStyle = bigStyle;
        smallImagePhotoStyle = smallPhotoStyle;
        smallImageAudioStyle = smallAudioStyle;
    };
    exports.setController = function(tourController, tour) {
        controller = tourController;
        currentTour = tour;
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;