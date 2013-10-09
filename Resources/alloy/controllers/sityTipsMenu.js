function Controller() {
    function createRow(tip) {
        var row = Titanium.UI.createTableViewRow({
            hasChild: true,
            height: 40
        });
        var icon = Titanium.UI.createImageView({
            image: tip.photo.urls.original,
            width: 20,
            height: 20,
            left: 10,
            top: 10
        });
        row.add(icon);
        var title = Titanium.UI.createLabel({
            text: tip.short_title,
            font: {
                fontSize: 10,
                fontWeight: "bold"
            },
            top: 0,
            left: 40,
            width: "auto",
            height: 20,
            textAlign: "left",
            zIndex: 4
        });
        row.add(title);
        var text = Titanium.UI.createLabel({
            text: tip.short_text,
            font: {
                fontSize: 10
            },
            top: 20,
            left: 40,
            width: "auto",
            height: 20,
            textAlign: "left",
            zIndex: 4
        });
        row.add(text);
        return row;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "sityTipsMenu";
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
        text: "ПОЛЕЗНО ЗНАТЬ",
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
    $.__views.table = Ti.UI.createTableView({
        top: 80,
        left: 0,
        width: "auto",
        height: "auto",
        id: "table"
    });
    $.__views.window.add($.__views.table);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.backButton.addEventListener("click", function() {
        Alloy.Globals.closeWindow();
    });
    exports.init = function(tipsArray) {
        var i = 0, tableData = [];
        for (i; tipsArray.length > i; i++) tableData.push(createRow(tipsArray[i]));
        $.table.data = tableData;
        $.table.addEventListener("click", function(e) {
            var sityTipsEntry = Alloy.createController("sityTipsEntry");
            var menu = Alloy.createController("menuView");
            sityTipsEntry.getView("window").add(menu.getView("menuListener"));
            sityTipsEntry.getView("window").add(menu.getView("menu"));
            sityTipsEntry.init(tipsArray[e.index]);
            Alloy.Globals.openWindow(sityTipsEntry.getView());
        });
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;