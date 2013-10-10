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

function closeWindowAnimation(win) {
	var rightSlide = Titanium.UI.createAnimation();
    rightSlide.left = Titanium.Platform.displayCaps.platformWidth; // to put it back to the right side of the window
    rightSlide.duration = 300;
    
    //var win = windowStack.pop();
    
    if (win.cleanTour !== undefined) win.cleanTour();
    
	win.close(rightSlide);
}

function openWindowAnimation(win) {
	var leftSlide = Titanium.UI.createAnimation();
    leftSlide.left = 0; // to put it back to the left side of the window
    leftSlide.duration = 300;
    win.applyProperties({left: Titanium.Platform.displayCaps.platformWidth});
    
	win.open(leftSlide);
}

function isInStackAlready(win) {
	var i = 1;
	
	for (i; i < windowStack.length; i++) {
		if (windowStack[i].windowName === win.windowName) {
			return i;
		}
	}
	
	return -1;
}

function backToStackPos(pos) {
	var last = windowStack.pop();
    var i = windowStack.length - 1;
    
    //Ti.API.info('alloy.js| backToStackPos | i = ' + i + "; pos = " + pos); //==========================
    
	for (i; i > pos; i--) {
		if (windowStack[i].cleanTour !== undefined) windowStack[i].cleanTour();
		windowStack[i].close();
		windowStack.pop();
	}
	
	closeWindowAnimation(last);
}

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
	if (windowStack.length > 1) backToStackPos(0);
};

Alloy.Globals.openWindow = function(win) {
	var pos = isInStackAlready(win);
	
	//Ti.API.info('alloy.js| windowPos = ' + pos + " -----------------------------------"); //==========================
	
	switch(pos) {
		case -1:
			openWindowAnimation(win);
			windowStack.push(win);
			
			//Ti.API.info('alloy.js| case = -1'); //==========================
		break;
		case (windowStack.length - 1):
			//if user try to open window from the same window
			//Ti.API.info('alloy.js| case = ' + (windowStack.length - 1)); //==========================
		break;
		default:
			backToStackPos(pos);
			
			//Ti.API.info('alloy.js| case = def'); //==========================
		break;
	}
};

Alloy.Globals.closeWindow = function() {
	closeWindowAnimation(windowStack.pop());
};
