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
    for (i; i > pos; i--) {
        void 0 !== windowStack[i].cleanTour && windowStack[i].cleanTour();
        windowStack[i].close();
        windowStack.pop();
    }
    closeWindowAnimation(last);
}

function toRad(grad) {
    return Math.PI * grad / 180;
}

var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

var windowStack = [], downloadLock = false;

var normalMode = true;

Ti.API.info("alloy.js| App starting in normal mode (" + normalMode + ")");

var userPosition = {
    latitude: 0,
    longitude: 0
};

Titanium.Geolocation.getCurrentPosition(function(e) {
    if (e.error) Ti.API.info("T_T"); else {
        userPosition.latitude = e.coords.latitude;
        userPosition.longitude = e.coords.longitude;
    }
});

if (normalMode) {
    var loadFromCloud = require("lib/loadFromCloud");
    loadFromCloud.init();
} else {
    var updateCloud = require("lib/updateCloud");
    updateCloud.start();
}

Alloy.Globals.openLock = function() {
    downloadLock = false;
};

Alloy.Globals.isLocked = function() {
    if (!downloadLock) {
        Ti.API.info("alloy.js| downloadLock = true");
        downloadLock = true;
        return false;
    }
    return true;
};

Alloy.Globals.getDistanceTo = function(dot) {
    var R = 6371;
    var latA = toRad(userPosition.latitude), latB = toRad(dot.latitude);
    var lonA = toRad(userPosition.longitude), lonB = toRad(dot.longitude);
    (lonB - lonA) * Math.cos((latA + latB) / 2);
    return Math.acos(Math.sin(latA) * Math.sin(latB) + Math.cos(latA) * Math.cos(latB) * Math.cos(lonB - lonA)) * R;
};

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
    switch (pos) {
      case -1:
        openWindowAnimation(win);
        windowStack.push(win);
        break;

      case windowStack.length - 1:
        break;

      default:
        backToStackPos(pos);
    }
};

Alloy.Globals.closeWindow = function() {
    closeWindowAnimation(windowStack.pop());
};

Alloy.Globals.userPosition = userPosition;

Alloy.createController("index");