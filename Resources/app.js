var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Ti.API.info("alloy.js| Start");

var windowStack = [];

var loadFromCloud = require("lib/loadFromCloud");

loadFromCloud.init();

Alloy.Globals.getTours = function() {
    return loadFromCloud.getTours();
};

Alloy.Globals.getTips = function() {
    return loadFromCloud.getTips();
};

Alloy.Globals.setRootWindow = function(win) {
    windowStack = [ win ];
};

Alloy.Globals.backToRootWindow = function() {
    var rightSlide = Titanium.UI.createAnimation();
    rightSlide.left = Titanium.Platform.displayCaps.platformWidth;
    rightSlide.duration = 300;
    var last = windowStack.pop();
    var i = windowStack.length - 1;
    for (i; i > 0; i--) {
        void 0 !== windowStack[i].cleanTour && windowStack[i].cleanTour();
        windowStack[i].close();
    }
    windowStack = [ windowStack[0] ];
    last.close(rightSlide);
};

Alloy.Globals.openWindow = function(win) {
    var leftSlide = Titanium.UI.createAnimation();
    leftSlide.left = 0;
    leftSlide.duration = 300;
    win.applyProperties({
        left: Titanium.Platform.displayCaps.platformWidth
    });
    win.open(leftSlide);
    windowStack.push(win);
};

Alloy.Globals.closeWindow = function() {
    var rightSlide = Titanium.UI.createAnimation();
    rightSlide.left = Titanium.Platform.displayCaps.platformWidth;
    rightSlide.duration = 300;
    var win = windowStack.pop();
    void 0 !== win.cleanTour && win.cleanTour();
    win.close(rightSlide);
};

Alloy.createController("index");