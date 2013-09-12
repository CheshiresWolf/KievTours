function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.window = Ti.UI.createWindow({
        zIndex: 0,
        id: "window"
    });
    $.__views.window && $.addTopLevelView($.__views.window);
    $.__views.logo = Ti.UI.createImageView({
        zIndex: 1,
        image: "images/APP_Kiev_logo.png",
        width: 50,
        heigth: 50,
        top: 15,
        left: 15,
        id: "logo"
    });
    $.__views.window.add($.__views.logo);
    var __alloyId0 = [];
    $.__views.scrollView = Ti.UI.createScrollableView({
        views: __alloyId0,
        id: "scrollView"
    });
    $.__views.window.add($.__views.scrollView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var bigImgSize = .9 * Titanium.Platform.displayCaps.platformWidth;
    var leftOffset = (Titanium.Platform.displayCaps.platformWidth - bigImgSize) / 2;
    var topOffset = Titanium.Platform.displayCaps.platformHeight / 2 - bigImgSize / 2;
    var bigPictureStyle;
    var smallPictureStyle;
    var titleWidth;
    var smallImgSize = bigImgSize / 3;
    var tours = Alloy.Globals.getTours();
    for (i = 0; tours.length > i; i++) {
        tours[i].controller = Alloy.createController("tourView");
        bigPictureStyle = {
            width: bigImgSize,
            height: bigImgSize,
            left: leftOffset,
            top: topOffset
        };
        tours[i].controller.getView("bigPicture").applyProperties(bigPictureStyle);
        smallPictureStyle = {
            width: smallImgSize,
            height: smallImgSize,
            right: leftOffset,
            top: topOffset - smallImgSize / 2,
            image: tours[i].img
        };
        tours[i].controller.getView("smallPicture").applyProperties(smallPictureStyle);
        tours[i].controller.getView("background").applyProperties({
            image: tours[i].background
        });
        tours[i].controller.getView("title").text = tours[i].text;
        titleWidth = tours[i].controller.getView("title").toImage().width;
        titleWidth > 7 * bigImgSize / 10 && (titleWidth = .7 * bigImgSize);
        tours[i].controller.getView("title").applyProperties({
            top: bigImgSize / 6,
            width: titleWidth
        });
        $.scrollView.addView(tours[i].controller.getView());
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;