function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "audioPlayer";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.container = Ti.UI.createView({
        id: "container"
    });
    $.__views.container && $.addTopLevelView($.__views.container);
    $.__views.timePassed = Ti.UI.createLabel({
        id: "timePassed"
    });
    $.__views.container.add($.__views.timePassed);
    $.__views.timeLeft = Ti.UI.createLabel({
        id: "timeLeft"
    });
    $.__views.container.add($.__views.timeLeft);
    $.__views.buttonBack = Ti.UI.createImageView({
        id: "buttonBack"
    });
    $.__views.container.add($.__views.buttonBack);
    $.__views.buttonPlay = Ti.UI.createImageView({
        id: "buttonPlay"
    });
    $.__views.container.add($.__views.buttonPlay);
    $.__views.buttonForward = Ti.UI.createImageView({
        id: "buttonForward"
    });
    $.__views.container.add($.__views.buttonForward);
    $.__views.audioIconMin = Ti.UI.createImageView({
        id: "audioIconMin"
    });
    $.__views.container.add($.__views.audioIconMin);
    $.__views.audioIconMax = Ti.UI.createImageView({
        id: "audioIconMax"
    });
    $.__views.container.add($.__views.audioIconMax);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;