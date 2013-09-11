function Controller() {
    function doClick() {
        alert("Hello");
        Ti.API.info("click");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.mainWindow = Ti.UI.createWindow({
        backgroundColor: "white",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        backgroundImage: "images/APP_Kiev_background.png",
        id: "mainWindow",
        showPaginControl: "true"
    });
    $.__views.mainWindow && $.addTopLevelView($.__views.mainWindow);
    $.__views.__alloyId0 = Ti.UI.createImageView({
        image: "images/APP_Kiev_logo.png",
        top: 50,
        left: 50,
        width: 96,
        height: 96,
        id: "__alloyId0"
    });
    $.__views.mainWindow.add($.__views.__alloyId0);
    var __alloyId1 = [];
    $.__views.welcomeScreen = Ti.UI.createView({
        id: "welcomeScreen"
    });
    __alloyId1.push($.__views.welcomeScreen);
    $.__views.welcomeLabel = Ti.UI.createLabel({
        color: "white",
        text: "YOU MUST APPEAR!",
        id: "welcomeLabel"
    });
    $.__views.welcomeScreen.add($.__views.welcomeLabel);
    doClick() ? $.__views.welcomeLabel.addEventListener("click", doClick()) : __defers["$.__views.welcomeLabel!click!doClick()"] = true;
    $.__views.toursScreen = Ti.UI.createView({
        id: "toursScreen"
    });
    __alloyId1.push($.__views.toursScreen);
    $.__views.__alloyId2 = Ti.UI.createLabel({
        text: "SLIIIIIDE",
        id: "__alloyId2"
    });
    $.__views.toursScreen.add($.__views.__alloyId2);
    $.__views.scrollView = Ti.UI.createScrollableView({
        views: __alloyId1,
        id: "scrollView"
    });
    $.__views.mainWindow.add($.__views.scrollView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var tours = require("Tour");
    for (var i = 0; tours.length; i++) {
        var bufView = Ti.UI.createView({
            left: 50,
            width: 556,
            height: 556,
            zIndex: 10,
            backgroundImage: "images/BigSircle.png"
        });
        $.scrollableView.addView(bufView);
    }
    $.mainWindow.open();
    __defers["$.__views.welcomeLabel!click!doClick()"] && $.__views.welcomeLabel.addEventListener("click", doClick());
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;