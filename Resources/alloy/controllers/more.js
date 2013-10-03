function Controller() {
    function createRow(img, text) {
        var row = Titanium.UI.createTableViewRow({
            hasChild: true,
            height: 40
        });
        var icon = Titanium.UI.createImageView({
            image: img,
            width: 40,
            height: 40,
            left: 4,
            top: 0
        });
        row.add(icon);
        var name = Titanium.UI.createLabel({
            text: text,
            font: {
                fontSize: 8
            },
            left: 59,
            width: "auto",
            height: 20,
            textAlign: "left",
            zIndex: 4
        });
        row.add(name);
        return row;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "more";
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
            fontSize: "15dp",
            fontWeight: "bold"
        },
        text: "...",
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
        Alloy.Globals.closeWindow($.window);
    });
    exports.fillTable = function() {
        var tableData = [];
        tableData.push(createRow("images/more/_settings.png", "Settings"));
        tableData.push(createRow("images/more/_languages.png", "Languages"));
        tableData.push(createRow("images/more/_about.png", "About application"));
        tableData.push(createRow("images/more/_contact.png", "Contact us"));
        tableData.push(createRow("images/more/_feed.png", "Feedback"));
        tableData.push(createRow("images/more/_social.png", "Social networks"));
        $.table.data = tableData;
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;