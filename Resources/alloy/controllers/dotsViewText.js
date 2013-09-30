function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "dotsViewText";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.container = Ti.UI.createView({
        backgroundColor: "white",
        width: "auto",
        height: "auto",
        zIndex: 5,
        top: Titanium.Platform.displayCaps.platformHeight,
        id: "container"
    });
    $.__views.container && $.addTopLevelView($.__views.container);
    $.__views.dotNumber = Ti.UI.createLabel({
        top: 0,
        width: 15,
        height: 15,
        backgroundImage: "images/dotsList/TableNumber_off.png",
        color: "white",
        textAlign: "center",
        font: {
            fontSize: 8
        },
        text: "1",
        id: "dotNumber"
    });
    $.__views.container.add($.__views.dotNumber);
    $.__views.dotTitle = Ti.UI.createLabel({
        top: 0,
        height: 15,
        font: {
            fontSize: 10,
            fontWeight: "bold"
        },
        text: "title",
        id: "dotTitle"
    });
    $.__views.container.add($.__views.dotTitle);
    $.__views.Aa = Ti.UI.createImageView({
        image: "images/dotsView/Aa.png",
        top: 20,
        left: 5,
        width: 20,
        height: 20,
        zIndex: 5,
        id: "Aa"
    });
    $.__views.container.add($.__views.Aa);
    $.__views.dotText = Ti.UI.createLabel({
        top: 20,
        left: 30,
        zIndex: 5,
        text: "jjjjj jj jjjj jjjjj jjjjj jjjjj jjjjj jjjjj jjjjjjj jjjjj jjjjjj jjjjjj jjj jjjj jjjjj jjjjj jjjjj jjjjjj jjjjj jjjj jjjjjjj jjjjj jjjj jj jjjjjjj jj jjjj jjjjj jjj jjjjj jj jj jjjjj jj jjjj jjjjj jjjjj jjjjj jjjjj jjjjj jjjjjjj jjjjj jjjjjj jjjjjj jjj jjjj jjjjj jjjjj jjjjj jjjjjj jjjjj jjjj jjjjjjj jjjjj jjjj jj jjjjjjj jj jjjj jjjjj jjj jjjjj jj jj jjjjj jj jjjj jjjjj jjjjj jjjjj jjjjj jjjjj jjjjjjj jjjjj jjjjjj jjjjjj jjj jjjj jjjjj jjjjj jjjjj jjjjjj jjjjj jjjj jjjjjjj jjjjj jjjj jj jjjjjjj jj jjjj jjjjj jjj jjjjj jj jj jjjjj jj jjjj jjjjj jjjjj jjjjj jjjjj jjjjj jjjjjjj jjjjj jjjjjj jjjjjj jjj jjjj jjjjj jjjjj jjjjj jjjjjj jjjjj jjjj jjjjjjj jjjjj jjjj jj jjjjjjj jj jjjj jjjjj jjj jjjjj jj jj",
        id: "dotText"
    });
    $.__views.container.add($.__views.dotText);
    exports.destroy = function() {};
    _.extend($, $.__views);
    exports.initText = function() {
        $.dotNumber.applyProperties({
            left: (Titanium.Platform.displayCaps.platformWidth - $.dotTitle.toImage().width) / 2
        });
        $.dotText.applyProperties({
            width: Titanium.Platform.displayCaps.platformWidth - 40
        });
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;