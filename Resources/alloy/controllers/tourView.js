function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "tourView";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.tourView = Ti.UI.createView({
        id: "tourView"
    });
    $.__views.tourView && $.addTopLevelView($.__views.tourView);
    $.__views.smallPicture = Ti.UI.createImageView({
        zIndex: 5,
        id: "smallPicture"
    });
    $.__views.tourView.add($.__views.smallPicture);
    $.__views.bigPicture = Ti.UI.createImageView({
        image: "images/BigSircle.png",
        zIndex: 3,
        id: "bigPicture"
    });
    $.__views.tourView.add($.__views.bigPicture);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;