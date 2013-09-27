function Controller() {
    function galleryShow(flag) {
        var img = currentTour.img;
        flag && (img = currentDot.gallery[0]);
        $.smallPicturePhoto.applyProperties({
            image: img
        });
        $.galleryLeft.setVisible(flag);
        $.galleryRight.setVisible(flag);
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
            latitude: currentTour.dots[0].latitude,
            longitude: currentTour.dots[0].longitude,
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
    $.__views.galleryLeft = Ti.UI.createImageView({
        image: "images/dotsView/galleryControlsLeft.png",
        bottom: 80,
        left: 10,
        width: 10,
        height: 30,
        zIndex: 5,
        visible: false,
        id: "galleryLeft"
    });
    $.__views.dotContainer.add($.__views.galleryLeft);
    $.__views.galleryRight = Ti.UI.createImageView({
        image: "images/dotsView/galleryControlsRight.png",
        bottom: 80,
        right: 10,
        width: 10,
        height: 30,
        zIndex: 5,
        visible: false,
        id: "galleryRight"
    });
    $.__views.dotContainer.add($.__views.galleryRight);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var controller, currentTour, currentDot;
    var bigImageStyle, smallImagePhotoStyle, smallImageAudioStyle;
    var userPosition = {
        latitude: 0,
        longitude: 0
    };
    var galleryIndex = 0;
    Titanium.Geolocation.getCurrentPosition(function(e) {
        Ti.Geolocation.purpose = "Hello, we need you coordinates to calculate distance.";
        if (e.error) Ti.API.info("T_T"); else {
            userPosition.latitude = e.coords.latitude;
            userPosition.longitude = e.coords.longitude;
        }
    });
    $.bigPicture.addEventListener("click", function() {
        playerShow(false);
        $.smallPicturePhoto.animate(smallImagePhotoStyle, function() {
            galleryShow(false);
        });
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
        bigPictureShow(false);
        $.bigPicture.animate(smallImageAudioStyle);
        $.smallPicturePhoto.animate(smallImagePhotoStyle, function() {
            galleryShow(false);
        });
        $.smallPictureAudio.animate(bigImageStyle, function() {
            playerShow(true);
        });
    });
    $.smallPictureList.addEventListener("click", function() {
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
    $.smallPictureCenter.addEventListener("click", function() {
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
    $.galleryLeft.addEventListener("click", function() {
        if (galleryIndex > 0) {
            galleryIndex--;
            $.smallPicturePhoto.applyProperties({
                image: currentDot.gallery[galleryIndex]
            });
        }
    });
    $.galleryRight.addEventListener("click", function() {
        if (currentTour.dots[0].gallery.length - 1 > galleryIndex) {
            galleryIndex++;
            $.smallPicturePhoto.applyProperties({
                image: currentDot.gallery[galleryIndex]
            });
        }
    });
    exports.setStyles = function(bigStyle, smallPhotoStyle, smallAudioStyle) {
        bigImageStyle = bigStyle;
        smallImagePhotoStyle = smallPhotoStyle;
        smallImageAudioStyle = smallAudioStyle;
    };
    exports.setController = function(tourController, tour) {
        controller = tourController;
        currentTour = tour;
        currentDot = currentTour.dots[0];
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;