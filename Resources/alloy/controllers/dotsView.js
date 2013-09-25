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
    var insideTourProcedures = require("lib/insideTourProcedures");
    Ti.API.info("dotView.js");
    $.bigPicture.addEventListener("click", function() {
        playerShow(false);
        $.smallPicturePhoto.animate(insideTourProcedures.getSmallImagePhotoStyle());
        $.smallPictureAudio.animate(insideTourProcedures.getSmallImageAudioStyle());
        $.bigPicture.animate(insideTourProcedures.getBigImageStyle(), function() {
            bigPictureShow(true);
            insideTourProcedures.centering($.map);
        });
    });
    $.smallPicturePhoto.addEventListener("click", function() {
        bigPictureShow(false);
        playerShow(false);
        $.bigPicture.animate(insideTourProcedures.getSmallImagePhotoStyle());
        $.smallPicturePhoto.animate(insideTourProcedures.getBigImageStyle());
        $.smallPictureAudio.animate(insideTourProcedures.getSmallImageAudioStyle());
    });
    $.smallPictureAudio.addEventListener("click", function() {
        bigPictureShow(false);
        $.bigPicture.animate(insideTourProcedures.getSmallImageAudioStyle());
        $.smallPicturePhoto.animate(insideTourProcedures.getSmallImagePhotoStyle());
        $.smallPictureAudio.animate(insideTourProcedures.getBigImageStyle(), function() {
            playerShow(true);
        });
    });
    $.smallPictureList.addEventListener("click", function() {
        var list = Alloy.createController("dotsList");
        list.fillTable(insideTourProcedures.getDots());
        list.getView().open();
    });
    $.smallPictureCenter.addEventListener("click", function() {
        $.smallPicturePhoto.animate(insideTourProcedures.getSmallImagePhotoStyle());
        $.smallPictureAudio.animate(insideTourProcedures.getSmallImageAudioStyle(), function() {
            playerShow(false);
        });
        $.bigPicture.animate(insideTourProcedures.getBigImageStyle(), function() {
            bigPictureShow(true);
            insideTourProcedures.centering();
        });
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;