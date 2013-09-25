function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "menuView";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.menuListener = Ti.UI.createView({
        right: 0,
        bottom: 0,
        width: 60,
        height: 60,
        zIndex: 8,
        id: "menuListener"
    });
    $.__views.menuListener && $.addTopLevelView($.__views.menuListener);
    $.__views.menu = Ti.UI.createView({
        left: 0,
        width: Titanium.Platform.displayCaps.platformWidth,
        height: 80,
        zIndex: 7,
        id: "menu"
    });
    $.__views.menu && $.addTopLevelView($.__views.menu);
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
    exports.destroy = function() {};
    _.extend($, $.__views);
    var menuFlag = false;
    $.menu.applyProperties({
        backgroundImage: "images/menu/Menu_close_large.png",
        bottom: -55
    });
    $.menuListener.addEventListener("click", function() {
        if (false === menuFlag) {
            $.menu.animate({
                bottom: 0
            }, function() {
                $.menu.applyProperties({
                    backgroundImage: "images/menu/Menu_open_large.png"
                });
            });
            menuFlag = true;
        } else {
            $.menu.animate({
                bottom: -55
            }, function() {
                $.menu.applyProperties({
                    backgroundImage: "images/menu/Menu_close_large.png"
                });
            });
            menuFlag = false;
        }
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;