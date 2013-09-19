function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "dotsView";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.container = Ti.UI.createView({
        top: 0,
        left: 0,
        width: "auto",
        height: "auto",
        id: "container"
    });
    $.__views.container && $.addTopLevelView($.__views.container);
    $.__views.bigPicture = Ti.UI.createImageView({
        zIndex: 1,
        id: "bigPicture"
    });
    $.__views.container.add($.__views.bigPicture);
    $.__views.smallPicturePhoto = Ti.UI.createImageView({
        zIndex: 2,
        id: "smallPicturePhoto"
    });
    $.__views.container.add($.__views.smallPicturePhoto);
    $.__views.smallPictureAudio = Ti.UI.createImageView({
        zIndex: 2,
        id: "smallPictureAudio"
    });
    $.__views.container.add($.__views.smallPictureAudio);
    $.__views.smallPictureList = Ti.UI.createImageView({
        zIndex: 2,
        id: "smallPictureList"
    });
    $.__views.container.add($.__views.smallPictureList);
    $.__views.smallPictureCenter = Ti.UI.createImageView({
        zIndex: 2,
        id: "smallPictureCenter"
    });
    $.__views.container.add($.__views.smallPictureCenter);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;