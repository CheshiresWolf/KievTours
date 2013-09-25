function Controller() {
    function bigPictureShow(flag) {
        var img = "";
        flag || (img = "images/SmallSircleMap.png");
        $.bigPicture.applyProperties({
            backgroundImage: img
        });
        $.mapMask.setVisible(flag);
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
    $.__views.bigPicture = Ti.UI.createView({
        id: "bigPicture"
    });
    $.__views.dotContainer.add($.__views.bigPicture);
    var __alloyId0 = [];
    $.__views.map = Ti.Map.createView({
        width: "auto",
        height: "auto",
        top: 0,
        left: 0,
        zIndex: 3,
        annotations: __alloyId0,
        id: "map",
        ns: Ti.Map
    });
    $.__views.bigPicture.add($.__views.map);
    $.__views.mapMask = Ti.UI.createImageView({
        touchEnabled: false,
        id: "mapMask"
    });
    $.__views.bigPicture.add($.__views.mapMask);
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
    exports.destroy = function() {};
    _.extend($, $.__views);
    require("lib/insideTourProcedures");
    var controller, currentTour;
    var bigImageStyle, smallImagePhotoStyle, smallImageAudioStyle;
    $.bigPicture.addEventListener("click", function() {
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
        $.smallPicturePhoto.animate(bigImageStyle);
        $.smallPictureAudio.animate(smallImageAudioStyle);
    });
    $.smallPictureAudio.addEventListener("click", function() {
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
        menu.getView("buttonTours").addEventListener("click", function() {
            list.getView().close();
            controller.getView().close();
        });
        list.getView("window").add(menu.getView("menuListener"));
        list.getView("window").add(menu.getView("menu"));
        list.fillTable(currentTour.dots);
        list.getView().open();
    });
    $.smallPictureCenter.addEventListener("click", function() {
        $.smallPicturePhoto.animate(smallImagePhotoStyle);
        $.smallPictureAudio.animate(smallImageAudioStyle, function() {
            playerShow(false);
        });
        $.bigPicture.animate(bigImageStyle, function() {
            bigPictureShow(true);
            centeringMap();
        });
    });
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