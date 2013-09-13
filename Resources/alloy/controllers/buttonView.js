function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "buttonView";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.buttons = Ti.UI.createView({
        id: "buttons"
    });
    $.__views.buttons && $.addTopLevelView($.__views.buttons);
    $.__views.buttonTours = Ti.UI.createImageView({
        image: "images/Menu_icon_tour.png",
        width: 50,
        height: 50,
        bottom: 5,
        left: 10,
        id: "buttonTours"
    });
    $.__views.buttons.add($.__views.buttonTours);
    $.__views.buttonDiscover = Ti.UI.createImageView({
        image: "images/Menu_icon_discover.png",
        width: 50,
        height: 50,
        bottom: 5,
        left: 75,
        id: "buttonDiscover"
    });
    $.__views.buttons.add($.__views.buttonDiscover);
    $.__views.buttonTips = Ti.UI.createImageView({
        image: "images/Menu_icon_sityTrips.png",
        width: 50,
        height: 50,
        bottom: 5,
        left: 140,
        id: "buttonTips"
    });
    $.__views.buttons.add($.__views.buttonTips);
    $.__views.buttonMore = Ti.UI.createImageView({
        image: "images/Menu_icon_more.png",
        width: 50,
        height: 50,
        bottom: 5,
        left: 205,
        id: "buttonMore"
    });
    $.__views.buttons.add($.__views.buttonMore);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;