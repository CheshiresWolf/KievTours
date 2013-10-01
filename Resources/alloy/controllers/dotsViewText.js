function Controller() {
    function refreshScroll() {
        $.container.removeEventListener("postlayout", refreshScroll);
        $.topContainer.applyProperties({
            left: (Titanium.Platform.displayCaps.platformWidth - $.topContainer.toImage().width) / 2
        });
        $.textContainer.applyProperties({
            top: $.dotTitle.toImage().height + 10
        });
        $.Aa.applyProperties({
            top: $.dotTitle.toImage().height + 10
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "dotsViewText";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.container = Ti.UI.createView({
        top: 0,
        backgroundColor: "white",
        width: "auto",
        height: "auto",
        zIndex: 5,
        id: "container"
    });
    $.__views.container && $.addTopLevelView($.__views.container);
    $.__views.topContainer = Ti.UI.createView({
        top: 0,
        layout: "horizontal",
        width: "auto",
        id: "topContainer"
    });
    $.__views.container.add($.__views.topContainer);
    $.__views.dotNumber = Ti.UI.createLabel({
        left: 0,
        width: 15,
        height: 15,
        backgroundImage: "images/dotsList/TableNumber_off.png",
        color: "white",
        textAlign: "center",
        font: {
            fontSize: 8
        },
        text: "0",
        id: "dotNumber"
    });
    $.__views.topContainer.add($.__views.dotNumber);
    $.__views.dotTitle = Ti.UI.createLabel({
        left: 30,
        font: {
            fontSize: 13,
            fontWeight: "bold"
        },
        id: "dotTitle"
    });
    $.__views.topContainer.add($.__views.dotTitle);
    $.__views.Aa = Ti.UI.createImageView({
        image: "images/dotsView/Aa.png",
        top: 22,
        left: 9,
        width: 15,
        height: 12,
        zIndex: 5,
        id: "Aa"
    });
    $.__views.container.add($.__views.Aa);
    $.__views.textContainer = Ti.UI.createView({
        layout: "vertical",
        id: "textContainer"
    });
    $.__views.container.add($.__views.textContainer);
    $.__views.dotText = Ti.UI.createLabel({
        height: "auto",
        left: 30,
        zIndex: 5,
        font: {
            fontSize: 10
        },
        id: "dotText"
    });
    $.__views.textContainer.add($.__views.dotText);
    $.__views.foter = Ti.UI.createView({
        backgroundColor: "red",
        top: 0,
        left: 0,
        width: "auto",
        height: 50,
        id: "foter"
    });
    $.__views.textContainer.add($.__views.foter);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var scroll;
    exports.initText = function(dot, sc) {
        scroll = sc;
        $.dotNumber.text = dot.number;
        $.dotTitle.text = dot.name;
        $.dotText.text = dot.text;
        $.dotTitle.applyProperties({
            width: Titanium.Platform.displayCaps.platformWidth - 40
        });
        $.dotText.applyProperties({
            width: Titanium.Platform.displayCaps.platformWidth - 40
        });
    };
    $.container.addEventListener("postlayout", refreshScroll);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;