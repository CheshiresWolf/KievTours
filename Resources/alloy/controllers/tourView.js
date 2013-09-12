function Controller() {
    function swap() {
        tours[i].controller.getView("smallPicture").animate(model.bigImageStyle);
        tours[i].controller.getView("bigPicture").animate(model.smallImageStyle);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "tourView";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.tourView = Ti.UI.createView({
        id: "tourView"
    });
    $.__views.tourView && $.addTopLevelView($.__views.tourView);
    $.__views.background = Ti.UI.createImageView({
        top: 0,
        left: 0,
        width: "auto",
        height: "auto",
        zIndex: 0,
        id: "background"
    });
    $.__views.tourView.add($.__views.background);
    $.__views.smallPicture = Ti.UI.createImageView({
        zIndex: 5,
        id: "smallPicture"
    });
    $.__views.tourView.add($.__views.smallPicture);
    swap ? $.__views.smallPicture.addEventListener("click", swap) : __defers["$.__views.smallPicture!click!swap"] = true;
    $.__views.bigPicture = Ti.UI.createImageView({
        image: "images/BigSircle.png",
        zIndex: 3,
        id: "bigPicture"
    });
    $.__views.tourView.add($.__views.bigPicture);
    $.__views.title = Ti.UI.createLabel({
        id: "title"
    });
    $.__views.bigPicture.add($.__views.title);
    $.__views.text = Ti.UI.createLabel({
        id: "text"
    });
    $.__views.bigPicture.add($.__views.text);
    $.__views.button = Ti.UI.createImageView({
        id: "button"
    });
    $.__views.bigPicture.add($.__views.button);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var model = Ti.include("model/tourViewModel.js");
    __defers["$.__views.smallPicture!click!swap"] && $.__views.smallPicture.addEventListener("click", swap);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;