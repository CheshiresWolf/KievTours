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
    $.__views.menu = Ti.UI.createImageView({
        left: 0,
        bottom: 0,
        image: "images/Menu_closed.png",
        width: Titanium.Platform.displayCaps.platformWidth,
        height: 30,
        zIndex: 7,
        id: "menu"
    });
    $.__views.window.add($.__views.menu);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var buttonView = Alloy.createController("buttonView").getView();
    $.scrollView.addEventListener("scrollend", function(e) {
        Ti.API.info("scrollend | " + e.type);
    });
    $.window.addEventListener("swipe", function(e) {
        Ti.API.info("swipe" + e.direction);
        if ("up" === e.direction) {
            $.menu.applyProperties({
                image: "images/Menu_open.png"
            });
            $.menu.animate({
                height: 60
            }, function() {
                $.menu.add(buttonView);
            });
        }
        "down" === e.direction && $.menu.animate({
            height: 15
        }, function() {
            $.menu.remove(buttonView);
            $.menu.applyProperties({
                height: 30,
                image: "images/Menu_closed.png"
            });
        });
    });
    var tour = require("lib/tourViewModel");
    tour.showTours($.scrollView);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;