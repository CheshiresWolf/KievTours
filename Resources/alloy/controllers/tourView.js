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
        id: "smallPicture"
    });
    $.__views.tourView.add($.__views.smallPicture);
    $.__views.bigPicture = Ti.UI.createImageView({
        image: "images/BigSircle.png",
        id: "bigPicture"
    });
    $.__views.tourView.add($.__views.bigPicture);
    $.__views.tourContent = Ti.UI.createView({
        id: "tourContent"
    });
    $.__views.bigPicture.add($.__views.tourContent);
    $.__views.title = Ti.UI.createLabel({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontSize: "16dp"
        },
        id: "title"
    });
    $.__views.tourContent.add($.__views.title);
    $.__views.text = Ti.UI.createLabel({
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "14dp"
        },
        id: "text"
    });
    $.__views.tourContent.add($.__views.text);
    $.__views.icons = Ti.UI.createView({
        width: 290,
        zIndex: 4,
        id: "icons"
    });
    $.__views.tourContent.add($.__views.icons);
    $.__views.sizeMb = Ti.UI.createLabel({
        top: 0,
        height: 25,
        width: 25,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontSize: "12dp"
        },
        left: 0,
        id: "sizeMb"
    });
    $.__views.icons.add($.__views.sizeMb);
    $.__views.mb = Ti.UI.createLabel({
        top: 30,
        height: 25,
        width: 25,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontSize: "10dp"
        },
        left: 0,
        text: "Mb",
        id: "mb"
    });
    $.__views.icons.add($.__views.mb);
    $.__views.dotIco = Ti.UI.createImageView({
        top: 0,
        height: 25,
        width: 25,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontSize: "12dp"
        },
        image: "images/tourView/Icon_marker.png",
        left: 35,
        id: "dotIco"
    });
    $.__views.icons.add($.__views.dotIco);
    $.__views.dotAmount = Ti.UI.createLabel({
        top: 30,
        height: 25,
        width: 25,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontSize: "10dp"
        },
        left: 35,
        id: "dotAmount"
    });
    $.__views.icons.add($.__views.dotAmount);
    $.__views.timeIco = Ti.UI.createImageView({
        top: 0,
        height: 25,
        width: 25,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontSize: "12dp"
        },
        image: "images/tourView/Icon_clock.png",
        left: 70,
        id: "timeIco"
    });
    $.__views.icons.add($.__views.timeIco);
    $.__views.time = Ti.UI.createLabel({
        top: 30,
        height: 25,
        width: 25,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontSize: "10dp"
        },
        left: 70,
        id: "time"
    });
    $.__views.icons.add($.__views.time);
    $.__views.audioIco = Ti.UI.createImageView({
        top: 0,
        height: 25,
        width: 25,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontSize: "12dp"
        },
        image: "images/tourView/Icon_audio.png",
        left: 105,
        id: "audioIco"
    });
    $.__views.icons.add($.__views.audioIco);
    $.__views.audio = Ti.UI.createLabel({
        top: 30,
        height: 25,
        width: 25,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontSize: "10dp"
        },
        left: 105,
        text: "audio",
        id: "audio"
    });
    $.__views.icons.add($.__views.audio);
    $.__views.price = Ti.UI.createLabel({
        top: 0,
        height: 25,
        width: 40,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontSize: "12dp"
        },
        color: "#0aaaaa",
        left: 140,
        id: "price"
    });
    $.__views.icons.add($.__views.price);
    $.__views.button = Ti.UI.createImageView({
        width: 92,
        height: 25,
        bottom: 10,
        zIndex: 4,
        id: "button"
    });
    $.__views.tourContent.add($.__views.button);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var swapDirection = false;
    var bigImageStyle, smallImageStyle;
    var listenerFlag = 0;
    var currentTour;
    $.bigPicture.addEventListener("click", function() {
        if (swapDirection) {
            $.bigPicture.applyProperties({
                image: "images/BigSircle.png"
            });
            $.bigPicture.animate(bigImageStyle);
            $.smallPicture.animate(smallImageStyle);
            $.tourContent.setVisible(true);
            swapDirection = false;
        }
    });
    $.smallPicture.addEventListener("click", function() {
        if (!swapDirection) {
            $.tourContent.setVisible(false);
            $.bigPicture.animate(smallImageStyle);
            $.smallPicture.animate(bigImageStyle);
            $.bigPicture.applyProperties({
                image: "images/SmallSircleInfo.png"
            });
            swapDirection = true;
        }
    });
    $.button.addEventListener("click", function() {
        switch (listenerFlag) {
          case 0:
            currentTour.buy();
            $.button.applyProperties({
                image: "images/tourView/Download_Button.png"
            });
            listenerFlag++;
            break;

          case 1:
            currentTour.download();
            $.button.applyProperties({
                image: "images/tourView/Play_Button.png"
            });
            listenerFlag++;
            break;

          case 2:
            var newWindow = Alloy.createController("index");
            var insideTourProcedures = require("lib/insideTourProcedures");
            insideTourProcedures.initDotsView(newWindow, currentTour);
        }
    });
    exports.setListenerFlag = function(listener) {
        listenerFlag = listener;
    };
    exports.setTour = function(tour) {
        currentTour = tour;
    };
    exports.setStyles = function(bigStyle, smallStyle) {
        bigImageStyle = bigStyle;
        smallImageStyle = smallStyle;
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;