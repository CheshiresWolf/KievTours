function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: "white",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        backgroundImage: "images/APP_Kiev_background.png",
        showPaginControl: "true",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.__alloyId1 = Ti.UI.createImageView({
        image: "images/APP_Kiev_logo.png",
        top: 50,
        left: 50,
        width: 96,
        height: 96,
        id: "__alloyId1"
    });
    $.__views.index.add($.__views.__alloyId1);
    var __alloyId2 = [];
    $.__views.welcomeScreen = Ti.UI.createView({
        id: "welcomeScreen"
    });
    __alloyId2.push($.__views.welcomeScreen);
    $.__views.welcomeLabel = Ti.UI.createLabel({
        color: "white",
        text: "YOU MUST APPEAR!",
        id: "welcomeLabel"
    });
    $.__views.welcomeScreen.add($.__views.welcomeLabel);
    $.__views.toursScreen = Ti.UI.createView({
        id: "toursScreen"
    });
    __alloyId2.push($.__views.toursScreen);
    $.__views.__alloyId3 = Ti.UI.createLabel({
        text: "SLIIIIIDE",
        id: "__alloyId3"
    });
    $.__views.toursScreen.add($.__views.__alloyId3);
    $.__views.scrollView = Ti.UI.createScrollableView({
        views: __alloyId2,
        id: "scrollView"
    });
    $.__views.index.add($.__views.scrollView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.index.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;