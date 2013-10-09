function Controller() {
    function createTextBlock(title, text, view) {
        var titleLabel = Ti.UI.createLabel({
            text: title,
            width: textWidth,
            font: {
                fontSize: "10dp",
                fontWeight: "bold"
            }
        });
        var textLabel = Ti.UI.createLabel({
            text: text,
            width: textWidth,
            font: {
                fontSize: "10dp"
            }
        });
        var space = Ti.UI.createLabel({
            text: "        ",
            width: textWidth
        });
        view.add(titleLabel);
        view.add(textLabel);
        view.add(space);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "sityTipsEntry";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.window = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "window"
    });
    $.__views.window && $.addTopLevelView($.__views.window);
    $.__views.topPanel = Ti.UI.createView({
        top: 0,
        left: 0,
        width: "auto",
        height: 60,
        zIndex: 5,
        id: "topPanel"
    });
    $.__views.window.add($.__views.topPanel);
    $.__views.backButton = Ti.UI.createImageView({
        image: "images/dotsList/BackButton.png",
        width: 15,
        heigth: 15,
        top: 28,
        left: 15,
        zIndex: 6,
        id: "backButton"
    });
    $.__views.topPanel.add($.__views.backButton);
    $.__views.title = Ti.UI.createLabel({
        top: 33,
        font: {
            fontSize: "19dp",
            fontWeight: "bold"
        },
        id: "title"
    });
    $.__views.topPanel.add($.__views.title);
    $.__views.logo = Ti.UI.createImageView({
        image: "images/APP_Kiev_logo_green.png",
        width: 50,
        heigth: 50,
        top: 15,
        right: 15,
        zIndex: 6,
        id: "logo"
    });
    $.__views.topPanel.add($.__views.logo);
    $.__views.Aa = Ti.UI.createImageView({
        image: "images/dotsView/Aa.png",
        top: 82,
        left: 9,
        width: 15,
        height: 12,
        zIndex: 5,
        id: "Aa"
    });
    $.__views.window.add($.__views.Aa);
    $.__views.textContainer = Ti.UI.createScrollView({
        top: 80,
        left: 30,
        height: "auto",
        layout: "vertical",
        zIndex: 4,
        id: "textContainer"
    });
    $.__views.window.add($.__views.textContainer);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var textWidth = Titanium.Platform.displayCaps.platformWidth - 30;
    $.backButton.addEventListener("click", function() {
        Alloy.Globals.closeWindow();
    });
    exports.init = function(tip) {
        var i = 0;
        $.title.text = tip.short_title;
        $.textContainer.applyProperties({
            width: textWidth
        });
        for (i; tip.titles.length > i; i++) createTextBlock(tip.titles[i], tip.texts[i], $.textContainer);
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;