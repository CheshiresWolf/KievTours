function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.window = Ti.UI.createWindow({
        zIndex: 0,
        id: "window"
    });
    $.__views.window && $.addTopLevelView($.__views.window);
    $.__views.logo = Ti.UI.createImageView({
        zIndex: 1,
        image: "images/APP_Kiev_logo.png",
        width: 50,
        heigth: 50,
        top: 15,
        left: 15,
        id: "logo"
    });
    $.__views.window.add($.__views.logo);
    var __alloyId0 = [];
    $.__views.scrollView = Ti.UI.createScrollableView({
        views: __alloyId0,
        id: "scrollView"
    });
    $.__views.window.add($.__views.scrollView);
    $.__views.menu = Ti.UI.createView({
        left: 0,
        width: Titanium.Platform.displayCaps.platformWidth,
        height: 80,
        zIndex: 7,
        id: "menu"
    });
    $.__views.window.add($.__views.menu);
    $.__views.buttonTours = Ti.UI.createImageView({
        image: "images/menu/Menu_icon_tour.png",
        width: 50,
        height: 50,
        bottom: 5,
        left: 10,
        id: "buttonTours"
    });
    $.__views.menu.add($.__views.buttonTours);
    $.__views.buttonDiscover = Ti.UI.createImageView({
        image: "images/menu/Menu_icon_discover.png",
        width: 50,
        height: 50,
        bottom: 5,
        left: 75,
        id: "buttonDiscover"
    });
    $.__views.menu.add($.__views.buttonDiscover);
    $.__views.buttonTips = Ti.UI.createImageView({
        image: "images/menu/Menu_icon_sityTrips.png",
        width: 50,
        height: 50,
        bottom: 5,
        left: 140,
        id: "buttonTips"
    });
    $.__views.menu.add($.__views.buttonTips);
    $.__views.buttonMore = Ti.UI.createImageView({
        image: "images/menu/Menu_icon_more.png",
        width: 50,
        height: 50,
        bottom: 5,
        left: 205,
        id: "buttonMore"
    });
    $.__views.menu.add($.__views.buttonMore);
    $.__views.paging = Ti.UI.createView({
        id: "paging"
    });
    $.__views.window.add($.__views.paging);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var tours = Alloy.Globals.getTours(), toursLength = tours.length, pagingArray = [];
    var currentPage = 0, oldIndex = 0;
    $.menu.applyProperties({
        backgroundImage: "images/menu/Menu_close_large.png",
        bottom: -55
    });
    for (var i = 0; toursLength > i; i++) {
        pagingArray.push(Ti.UI.createImageView({
            width: 5,
            height: 5,
            left: 10 * i,
            image: "images/Radio_bullets_off.png"
        }));
        $.paging.add(pagingArray[i]);
    }
    $.paging.applyProperties({
        bottom: 50,
        left: (Titanium.Platform.displayCaps.platformWidth - $.paging.toImage().width) / 2,
        height: 5,
        width: 10 * pagingArray.length,
        zIndex: 4
    });
    pagingArray[0].applyProperties({
        image: "images/Radio_bullets_on.png"
    });
    $.scrollView.addEventListener("scrollend", function() {
        var newIndex = $.scrollView.getCurrentPage();
        if (oldIndex !== newIndex) {
            var children = $.scrollView.getViews(), loadedPages = [];
            if (newIndex > oldIndex) {
                currentPage++;
                loadedPages.push(children[oldIndex]);
                loadedPages.push(children[oldIndex + 1]);
                if (tours.length > currentPage + 1) {
                    loadedPages.push(tourProcedures.makeTourView(tours[currentPage + 1]));
                    oldIndex = 1;
                }
                $.scrollView.setViews(loadedPages);
                $.scrollView.setCurrentPage(1);
                pagingArray[currentPage - 1].applyProperties({
                    image: "images/Radio_bullets_off.png"
                });
                pagingArray[currentPage].applyProperties({
                    image: "images/Radio_bullets_on.png"
                });
            } else {
                currentPage--;
                if (currentPage - 1 >= 0) {
                    loadedPages.push(tourProcedures.makeTourView(tours[currentPage - 1]));
                    oldIndex = 1;
                } else oldIndex = 0;
                loadedPages.push(children[0]);
                loadedPages.push(children[1]);
                $.scrollView.setViews(loadedPages);
                $.scrollView.setCurrentPage(oldIndex);
                pagingArray[currentPage + 1].applyProperties({
                    image: "images/Radio_bullets_off.png"
                });
                pagingArray[currentPage].applyProperties({
                    image: "images/Radio_bullets_on.png"
                });
            }
        }
    });
    $.window.addEventListener("swipe", function(e) {
        Ti.API.info("swipe" + e.direction);
        "up" === e.direction && $.menu.animate({
            bottom: 0
        }, function() {
            $.menu.applyProperties({
                backgroundImage: "images/menu/Menu_open_large.png"
            });
        });
        "down" === e.direction && $.menu.animate({
            bottom: -55
        }, function() {
            $.menu.applyProperties({
                backgroundImage: "images/menu/Menu_close_large.png"
            });
        });
    });
    var tourProcedures = require("lib/tourViewProcedures");
    $.scrollView.addView(tourProcedures.makeTourView(tours[0]));
    $.scrollView.addView(tourProcedures.makeTourView(tours[1]));
    Ti.API.info("index.js open");
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;