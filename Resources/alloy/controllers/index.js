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
    var __alloyId1 = [];
    $.__views.scrollView = Ti.UI.createScrollableView({
        views: __alloyId1,
        id: "scrollView"
    });
    $.__views.window.add($.__views.scrollView);
    $.__views.menuSwipeListener = Ti.UI.createView({
        right: 0,
        bottom: 0,
        width: 60,
        height: 60,
        zIndex: 8,
        id: "menuSwipeListener"
    });
    $.__views.window.add($.__views.menuSwipeListener);
    $.__views.menu = Ti.UI.createView({
        left: 0,
        width: Titanium.Platform.displayCaps.platformWidth,
        height: 80,
        zIndex: 7,
        id: "menu"
    });
    $.__views.window.add($.__views.menu);
    $.__views.buttonTours = Ti.UI.createImageView({
        image: "images/menu/Menu_icon_tour.png",
        width: 50,
        height: 50,
        bottom: 5,
        left: 10,
        id: "buttonTours"
    });
    $.__views.menu.add($.__views.buttonTours);
    $.__views.buttonDiscover = Ti.UI.createImageView({
        image: "images/menu/Menu_icon_discover.png",
        width: 50,
        height: 50,
        bottom: 5,
        left: 75,
        id: "buttonDiscover"
    });
    $.__views.menu.add($.__views.buttonDiscover);
    $.__views.buttonTips = Ti.UI.createImageView({
        image: "images/menu/Menu_icon_sityTrips.png",
        width: 50,
        height: 50,
        bottom: 5,
        left: 140,
        id: "buttonTips"
    });
    $.__views.menu.add($.__views.buttonTips);
    $.__views.buttonMore = Ti.UI.createImageView({
        image: "images/menu/Menu_icon_more.png",
        width: 50,
        height: 50,
        bottom: 5,
        left: 205,
        id: "buttonMore"
    });
    $.__views.menu.add($.__views.buttonMore);
    $.__views.paging = Ti.UI.createView({
        id: "paging"
    });
    $.__views.window.add($.__views.paging);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.menu.applyProperties({
        backgroundImage: "images/menu/Menu_close_large.png",
        bottom: -55
    });
    $.menuSwipeListener.addEventListener("swipe", function(e) {
        "up" === e.direction && $.menu.animate({
            bottom: 0
        }, function() {
            $.menu.applyProperties({
                backgroundImage: "images/menu/Menu_open_large.png"
            });
        });
        "down" === e.direction && $.menu.animate({
            bottom: -55
        }, function() {
            $.menu.applyProperties({
                backgroundImage: "images/menu/Menu_close_large.png"
            });
        });
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;