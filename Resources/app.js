function closeWindowAnimation(win) {
    var rightSlide = Titanium.UI.createAnimation();
    rightSlide.left = Titanium.Platform.displayCaps.platformWidth;
    rightSlide.duration = 300;
    void 0 !== win.cleanTour && win.cleanTour();
    win.close(rightSlide);
}

function openWindowAnimation(win) {
    var leftSlide = Titanium.UI.createAnimation();
    leftSlide.left = 0;
    leftSlide.duration = 300;
    win.applyProperties({
        left: Titanium.Platform.displayCaps.platformWidth
    });
    win.open(leftSlide);
}

function isInStackAlready(win) {
    var i = 1;
    for (i; windowStack.length > i; i++) if (windowStack[i].windowName === win.windowName) return i;
    return -1;
}

function backToStackPos(pos) {
    var last = windowStack.pop();
    var i = windowStack.length - 1;
    Ti.API.info("alloy.js| backToStackPos | i = " + i + "; pos = " + pos);
    for (i; i > pos; i--) {
        void 0 !== windowStack[i].cleanTour && windowStack[i].cleanTour();
        windowStack[i].close();
        windowStack.pop();
    }
    closeWindowAnimation(last);
}

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
    windowStack.length > 1 && backToStackPos(0);
};

Alloy.Globals.openWindow = function(win) {
    var pos = isInStackAlready(win);
    Ti.API.info("alloy.js| windowPos = " + pos + " -----------------------------------");
    switch (pos) {
      case -1:
        openWindowAnimation(win);
        windowStack.push(win);
        Ti.API.info("alloy.js| case = -1");
        break;

      case windowStack.length - 1:
        Ti.API.info("alloy.js| case = " + (windowStack.length - 1));
        break;

      default:
        backToStackPos(pos);
        Ti.API.info("alloy.js| case = def");
    }
};

Alloy.Globals.closeWindow = function() {
    closeWindowAnimation(windowStack.pop());
};

Alloy.createController("index");