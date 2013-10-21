function Controller() {
    function getText(text) {
        var res = "", i = 0;
        if ("string" == typeof text) res = text; else for (i; text.length > i; i++) res += text[i] + " ";
        return res;
    }
    function createRow(img, text) {
        var row = Titanium.UI.createTableViewRow({
            isparent: true,
            opened: false,
            height: 30
        });
        var icon = Ti.UI.createImageView({
            image: img,
            left: 5,
            top: 5,
            width: 25,
            height: 20
        });
        row.add(icon);
        var title = Ti.UI.createLabel({
            text: text,
            left: 35,
            font: {
                fontSize: 15
            }
        });
        row.add(title);
        var openIco = Ti.UI.createImageView({
            image: "images/discover/discover_menu_close.png",
            right: 5,
            top: 10,
            width: 20,
            height: 10
        });
        row.add(openIco);
        row.openIco = openIco;
        return row;
    }
    function createMap(place) {
        var width = .55 * Titanium.Platform.displayCaps.platformWidth;
        var row = Titanium.UI.createTableViewRow({
            height: width + 90
        });
        var topImg = Ti.UI.createImageView({
            image: place.photo.urls.original,
            top: 5,
            left: 5,
            width: width,
            height: width,
            zIndex: 5
        });
        row.add(topImg);
        var bottomImg = Ti.UI.createImageView({
            image: "images/dotsView/MapMask.png",
            top: 5,
            right: 5,
            width: width,
            height: width,
            zIndex: 4
        });
        row.add(bottomImg);
        var point = Ti.UI.createImageView({
            width: 35,
            height: 55,
            image: "images/dotsView/MapPin_on.png"
        });
        var annot = Titanium.Map.createAnnotation({
            title: 0,
            image: point.toImage(),
            latitude: place.latitude,
            longitude: place.longitude
        });
        var map = Titanium.Map.createView({
            mapType: Titanium.Map.STANDARD_TYPE,
            userLocation: false,
            region: {
                latitude: place.latitude,
                longitude: place.longitude,
                latitudeDelta: .01,
                longitudeDelta: .01
            },
            annotations: [ annot ],
            top: 5,
            right: 5,
            width: width,
            height: width,
            zIndex: 3
        });
        row.add(map);
        var button = Ti.UI.createImageView({
            image: "images/discover/discover_showTours.png",
            top: 10 + width,
            right: 5,
            width: .8 * width,
            height: 40,
            zIndex: 4
        });
        row.add(button);
        var iconContainer = Ti.UI.createView({
            backgroundColor: "#dbdbdb",
            top: 55 + width,
            right: 7,
            width: .8 * width - 4,
            height: 30,
            borderRadius: 5,
            zIndex: 4
        });
        row.add(iconContainer);
        var rateIco = Titanium.UI.createImageView({
            image: "images/discover/icon_star.png",
            left: 10,
            width: 15,
            height: 15,
            zIndex: 4
        });
        iconContainer.add(rateIco);
        var rate = Titanium.UI.createLabel({
            text: "3",
            font: {
                fontSize: 10
            },
            left: 30,
            width: 30,
            height: 20,
            textAlign: "left",
            zIndex: 4
        });
        iconContainer.add(rate);
        var pathIco = Titanium.UI.createImageView({
            image: "images/discover/Discover_icon_path_green.png",
            width: 15,
            height: 15,
            zIndex: 4
        });
        iconContainer.add(pathIco);
        var roundPath = Alloy.Globals.getDistanceTo({
            latitude: place.latitude,
            longitude: place.longitude
        }).toFixed(2);
        var path = Titanium.UI.createLabel({
            text: roundPath + " km",
            font: {
                fontSize: 10
            },
            left: (.8 * width - 4) / 2 + 15,
            width: 50,
            height: 20,
            textAlign: "left",
            zIndex: 4
        });
        iconContainer.add(path);
        var textContainer = Ti.UI.createView({
            top: 10 + width,
            left: 7,
            width: width - 10,
            height: 80,
            zIndex: 4
        });
        row.add(textContainer);
        var address = Ti.UI.createLabel({
            text: place.address + ", " + place.city,
            font: {
                fontSize: 10
            },
            top: 0,
            width: "auto",
            textAlign: "center",
            zIndex: 4
        });
        textContainer.add(address);
        if (void 0 !== place.phone_number) {
            var phone = Ti.UI.createLabel({
                text: place.phone_number,
                font: {
                    fontSize: 10,
                    fontWeight: "bold"
                },
                top: 20,
                width: "auto",
                textAlign: "center",
                zIndex: 4
            });
            textContainer.add(phone);
        }
        if (void 0 !== place.custom_fields.email) {
            var email = Ti.UI.createLabel({
                text: "e-mail: " + place.custom_fields.email,
                font: {
                    fontSize: 10
                },
                top: 40,
                width: "auto",
                textAlign: "center",
                zIndex: 4
            });
            textContainer.add(email);
        }
        if (void 0 !== place.website) {
            var site = Ti.UI.createLabel({
                text: place.website,
                font: {
                    fontSize: 10
                },
                top: 60,
                width: "auto",
                textAlign: "center",
                zIndex: 4
            });
            textContainer.add(site);
        }
        return row;
    }
    function createSummary(place) {
        var row = createRow("images/discover/discover_summary.png", "Summary");
        var subRow = Titanium.UI.createTableViewRow();
        var aA = Ti.UI.createImageView({
            image: "images/dotsView/Aa.png",
            width: 15,
            height: 10,
            top: 7,
            left: 10
        });
        subRow.add(aA);
        var text = Ti.UI.createLabel({
            text: getText(place.custom_fields.text),
            width: Titanium.Platform.displayCaps.platformWidth - 35,
            top: 5,
            left: 35,
            font: {
                fontSize: 10
            }
        });
        subRow.add(text);
        row.sub = [ subRow ];
        return row;
    }
    function createTime() {
        var row = createRow("images/discover/discover_time.png", "Working hours");
        var subRow = Titanium.UI.createTableViewRow({
            title: "O_o_O",
            height: 60
        });
        row.sub = [ subRow ];
        return row;
    }
    function createTicket() {
        var row = createRow("images/discover/discover_ticket.png", "Tickets");
        var subRow = Titanium.UI.createTableViewRow({
            title: "o_O_o",
            height: 60
        });
        row.sub = [ subRow ];
        return row;
    }
    function createRate() {
        var row = createRow("images/discover/discover_rate.png", "Rate&Comment");
        var subRow = Titanium.UI.createTableViewRow({
            title: "O_O",
            height: 60
        });
        row.sub = [ subRow ];
        return row;
    }
    function createFooter() {
        return Titanium.UI.createTableViewRow({
            height: 300
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "discoverMenuEntry";
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
        height: 80,
        zIndex: 5,
        id: "topPanel"
    });
    $.__views.window.add($.__views.topPanel);
    $.__views.backButton = Ti.UI.createImageView({
        image: "images/dotsList/BackButton.png",
        width: 15,
        height: 20,
        top: 30,
        left: 15,
        zIndex: 6,
        id: "backButton"
    });
    $.__views.topPanel.add($.__views.backButton);
    $.__views.title = Ti.UI.createLabel({
        left: 35,
        height: 60,
        font: {
            fontSize: "17dp",
            fontWeight: "bold"
        },
        textAlign: "center",
        text: "Place",
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
        filterAttribute: "my_filter",
        id: "table"
    });
    $.__views.window.add($.__views.table);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.backButton.addEventListener("click", function() {
        Alloy.Globals.closeWindow();
    });
    $.table.addEventListener("click", function(e) {
        if (e.row.isparent) {
            var i;
            if (e.row.opened) {
                e.row.openIco.image = "images/discover/discover_menu_close.png";
                for (i = e.row.sub.length; i > 0; i -= 1) $.table.deleteRow(e.index + i);
                e.row.opened = false;
            } else {
                var currentIndex = e.index;
                e.row.openIco.image = "images/discover/discover_menu_open.png";
                for (i = 0; e.row.sub.length > i; i++) {
                    $.table.insertRowAfter(currentIndex, e.row.sub[i]);
                    currentIndex++;
                }
                e.row.opened = true;
            }
        }
    });
    exports.fillTable = function(place) {
        var tableData = [];
        $.title.applyProperties({
            text: place.name,
            width: Titanium.Platform.displayCaps.platformWidth - 105
        });
        tableData.push(createMap(place));
        tableData.push(createSummary(place));
        tableData.push(createTime(place));
        tableData.push(createTicket(place));
        tableData.push(createRate(place));
        tableData.push(createFooter(place));
        $.table.data = tableData;
        var menu = Alloy.createController("menuView");
        $.window.add(menu.getView("menuListener"));
        $.window.add(menu.getView("menu"));
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;