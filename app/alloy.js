// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

//===========================================
Ti.API.info("alloy.js| Start");
//===========================================

var windowStack = [];

//======================<Start>=====================

var loadFromCloud = require("lib/loadFromCloud");
loadFromCloud.init();

//======================</Start>=====================

Alloy.Globals.getTours = function() {
	return loadFromCloud.getTours();
};

Alloy.Globals.getTips = function() {
	return loadFromCloud.getTips();
};

Alloy.Globals.setRootWindow = function(win) {
	windowStack = [win];
};

Alloy.Globals.backToRootWindow = function() {
	var rightSlide = Titanium.UI.createAnimation();
    rightSlide.left = Titanium.Platform.displayCaps.platformWidth; // to put it back to the right side of the window
    rightSlide.duration = 300;
    var last = windowStack.pop();
    var i = windowStack.length - 1;
    
	for (i; i > 0; i--) {
		if (windowStack[i].cleanTour !== undefined) windowStack[i].cleanTour();
		windowStack[i].close();
	}
	
	windowStack = [windowStack[0]];
	last.close(rightSlide);
};

Alloy.Globals.openWindow = function(win) {
	var leftSlide = Titanium.UI.createAnimation();
    leftSlide.left = 0; // to put it back to the left side of the window
    leftSlide.duration = 300;
    win.applyProperties({left: Titanium.Platform.displayCaps.platformWidth});
    
	win.open(leftSlide);
	windowStack.push(win);
};

Alloy.Globals.closeWindow = function() {
	var rightSlide = Titanium.UI.createAnimation();
    rightSlide.left = Titanium.Platform.displayCaps.platformWidth; // to put it back to the right side of the window
    rightSlide.duration = 300;
    
    var win = windowStack.pop();
    
    if (win.cleanTour !== undefined) win.cleanTour();
    
	win.close(rightSlide);
};
