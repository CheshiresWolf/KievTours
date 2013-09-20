function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "dotsView";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.dotContainer = Ti.UI.createView({
        id: "dotContainer"
    });
    $.__views.dotContainer && $.addTopLevelView($.__views.dotContainer);
    $.__views.bigPicture = Ti.UI.createImageView({
        id: "bigPicture"
    });
    $.__views.dotContainer.add($.__views.bigPicture);
    $.__views.smallPicturePhoto = Ti.UI.createImageView({
        id: "smallPicturePhoto"
    });
    $.__views.dotContainer.add($.__views.smallPicturePhoto);
    $.__views.smallPictureAudio = Ti.UI.createImageView({
        id: "smallPictureAudio"
    });
    $.__views.dotContainer.add($.__views.smallPictureAudio);
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
        $.bigPicture.animate(insideTourProcedures.getBigImageStyle());
        $.smallPicturePhoto.animate(insideTourProcedures.getSmallImagePhotoStyle());
        $.smallPictureAudio.animate(insideTourProcedures.getSmallImageAudioStyle());
        $.bigPicture.applyProperties({
            image: "images/BigSircle.png"
        });
    });
    $.smallPicturePhoto.addEventListener("click", function() {
        $.bigPicture.animate(insideTourProcedures.getSmallImagePhotoStyle());
        $.smallPicturePhoto.animate(insideTourProcedures.getBigImageStyle());
        $.smallPictureAudio.animate(insideTourProcedures.getSmallImageAudioStyle());
        $.bigPicture.applyProperties({
            image: "images/SmallSircleMap.png"
        });
    });
    $.smallPictureAudio.addEventListener("click", function() {
        $.bigPicture.animate(insideTourProcedures.getSmallImageAudioStyle());
        $.smallPicturePhoto.animate(insideTourProcedures.getSmallImagePhotoStyle());
        $.smallPictureAudio.animate(insideTourProcedures.getBigImageStyle());
        $.bigPicture.applyProperties({
            image: "images/SmallSircleMap.png"
        });
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;