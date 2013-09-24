function Controller() {
    function createRow(i, dot) {
        var row = Titanium.UI.createTableViewRow({
            hasChild: true,
            height: 40
        });
        var img = "images/dotsList/TableKmBlock_center.png";
        0 === i ? img = "images/dotsList/TableKmBlock_top.png" : -1 === i && (img = "images/dotsList/TableKmBlock_bottom.png");
        var kmBlock = Titanium.UI.createImageView({
            image: img,
            width: 20,
            height: 40,
            left: 4,
            top: 0
        });
        row.add(kmBlock);
        var dotName = Titanium.UI.createLabel({
            text: dot.name,
            font: {
                fontSize: 8
            },
            width: "auto",
            textAlign: "left",
            left: 40,
            height: 20
        });
        row.add(dotName);
        return row;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "dotsList";
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
            fontSize: "9dp",
            fontWeight: "bold"
        },
        text: "ИСТОРИИ КИЕВСКИХ АРИСТОКРАТОВ",
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
        $.window.close();
    });
    exports.fillTable = function(dots) {
        var tableData = [], flag = 0;
        for (var i = 0; dots.length > i; i++) {
            flag = i === dots.length - 1 ? -1 : i;
            tableData.push(createRow(flag, dots[i]));
        }
        $.table.data = tableData;
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;