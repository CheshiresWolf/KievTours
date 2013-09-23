function Controller() {
    function changeVolume() {
        Ti.API.info("changed");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "audioPlayer";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.container = Ti.UI.createView({
        id: "container"
    });
    $.__views.container && $.addTopLevelView($.__views.container);
    $.__views.timePassed = Ti.UI.createLabel({
        zIndex: 4,
        top: 0,
        left: 0,
        width: 20,
        height: 20,
        id: "timePassed"
    });
    $.__views.container.add($.__views.timePassed);
    $.__views.progressBar = Ti.UI.createProgressBar({
        zIndex: 4,
        top: 0,
        left: 20,
        height: 20,
        id: "progressBar"
    });
    $.__views.container.add($.__views.progressBar);
    $.__views.timeLeft = Ti.UI.createLabel({
        zIndex: 4,
        top: 0,
        right: 0,
        width: 20,
        height: 20,
        id: "timeLeft"
    });
    $.__views.container.add($.__views.timeLeft);
    $.__views.buttonBack = Ti.UI.createImageView({
        zIndex: 4,
        top: 25,
        width: 20,
        height: 20,
        id: "buttonBack"
    });
    $.__views.container.add($.__views.buttonBack);
    $.__views.buttonPlay = Ti.UI.createImageView({
        zIndex: 4,
        top: 25,
        width: 20,
        height: 20,
        id: "buttonPlay"
    });
    $.__views.container.add($.__views.buttonPlay);
    $.__views.buttonForward = Ti.UI.createImageView({
        zIndex: 4,
        top: 25,
        width: 20,
        height: 20,
        id: "buttonForward"
    });
    $.__views.container.add($.__views.buttonForward);
    $.__views.audioIconMin = Ti.UI.createImageView({
        zIndex: 4,
        bottom: 0,
        right: 0,
        width: 20,
        height: 20,
        id: "audioIconMin"
    });
    $.__views.container.add($.__views.audioIconMin);
    $.__views.slider = Ti.UI.createSlider({
        zIndex: 4,
        bottom: 0,
        left: 20,
        min: 0,
        max: 100,
        value: 50,
        id: "slider"
    });
    $.__views.container.add($.__views.slider);
    changeVolume ? $.__views.slider.addEventListener("change", changeVolume) : __defers["$.__views.slider!change!changeVolume"] = true;
    $.__views.audioIconMax = Ti.UI.createImageView({
        zIndex: 4,
        bottom: 0,
        left: 0,
        width: 20,
        height: 20,
        id: "audioIconMax"
    });
    $.__views.container.add($.__views.audioIconMax);
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.slider!change!changeVolume"] && $.__views.slider.addEventListener("change", changeVolume);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;