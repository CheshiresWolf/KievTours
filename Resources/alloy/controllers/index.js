function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.window = Ti.UI.createWindow({
        backgroundColor: "white",
        backgroundImage: "images/APP_Kiev_background_logo.png",
        zIndex: 0,
        id: "window"
    });
    $.__views.window && $.addTopLevelView($.__views.window);
    var __alloyId0 = [];
    $.__views.scrollView = Ti.UI.createScrollableView({
        views: __alloyId0,
        id: "scrollView"
    });
    $.__views.window.add($.__views.scrollView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var imgSize = .9 * Titanium.Platform.displayCaps.platformWidth;
    var leftOffset = (Titanium.Platform.displayCaps.platformWidth - imgSize) / 2;
    var topOffset = Titanium.Platform.displayCaps.platformHeight / 2 - imgSize / 2;
    var bigPictureStyle = {
        width: imgSize,
        height: imgSize,
        left: leftOffset,
        top: topOffset
    };
    var smallImgSize = imgSize / 3;
    var smallPictureStyle = {
        width: smallImgSize,
        height: smallImgSize,
        right: leftOffset,
        top: topOffset - smallImgSize / 2
    };
    var tours = Alloy.Globals.getTours();
    for (i = 0; tours.length > i; i++) {
        Ti.API.info("index.js loop");
        smallPictureStyle.image = tours[i].img;
        tours[i].controller = Alloy.createController("tourView");
        tours[i].controller.getView("bigPicture").applyProperties(bigPictureStyle);
        tours[i].controller.getView("smallPicture").applyProperties(smallPictureStyle);
        $.scrollView.addView(tours[i].controller.getView());
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;