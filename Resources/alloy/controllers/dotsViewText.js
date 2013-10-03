function Controller() {
    function showTitleAndGetSize(text) {
        var globalHeight = 0, maxWidth = 0;
        var splitBuf = text.split(" "), bufNew = "", bufOld = "";
        var i = 0, splitLength = splitBuf.length;
        var approvedLabel;
        for (i; splitLength > i; i++) {
            0 !== i && (bufNew += " ");
            bufNew += splitBuf[i];
            if (Ti.UI.createLabel({
                text: bufNew
            }).toImage().width > 280) {
                approvedLabel = Ti.UI.createLabel({
                    text: bufOld,
                    top: globalHeight,
                    font: {
                        fontSize: 13,
                        fontWeight: "bold"
                    }
                });
                $.container.add(approvedLabel);
                bufOld = "";
                bufNew = splitBuf[i];
                globalHeight += approvedLabel.toImage().height;
                approvedLabel.toImage().width > maxWidth && (maxWidth = approvedLabel.toImage().width);
            } else bufOld = bufNew;
            if (i === splitLength - 1) {
                approvedLabel = Ti.UI.createLabel({
                    text: bufNew,
                    top: globalHeight,
                    font: {
                        fontSize: 13,
                        fontWeight: "bold"
                    }
                });
                $.container.add(approvedLabel);
                globalHeight += approvedLabel.toImage().height;
                approvedLabel.toImage().width > maxWidth && (maxWidth = approvedLabel.toImage().width);
            }
        }
        return {
            height: globalHeight,
            width: maxWidth
        };
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
        zIndex: 5,
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
        text: "0",
        id: "dotNumber"
    });
    $.__views.container.add($.__views.dotNumber);
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
        top: 0,
        left: 0,
        width: "auto",
        height: 50,
        id: "foter"
    });
    $.__views.textContainer.add($.__views.foter);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var maxWidth = Titanium.Platform.displayCaps.platformWidth - 40;
    exports.initText = function(dot) {
        $.dotNumber.text = dot.number;
        $.dotText.text = dot.text;
        var title = showTitleAndGetSize(dot.name);
        $.dotNumber.applyProperties({
            left: (Titanium.Platform.displayCaps.platformWidth - title.width) / 2 - 20
        });
        $.dotText.applyProperties({
            top: title.height + 10,
            width: maxWidth
        });
        $.Aa.applyProperties({
            top: title.height + 12
        });
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;