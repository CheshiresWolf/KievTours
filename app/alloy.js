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

//==================<UserPosition>=================

var userPosition = {
	latitude: 0,
	longitude: 0
};

Titanium.Geolocation.getCurrentPosition(function(e) {
	if (!e.error) {
		userPosition.latitude = e.coords.latitude;
		userPosition.longitude = e.coords.longitude;
	} else {
		Ti.API.info('T_T');
	}
});

//==================</UserPosition>=================

//======================<Start>=====================

var loadFromCloud = require("lib/loadFromCloud");
loadFromCloud.init();

//var updateCloud = require("lib/updateCloud");
//updateCloud.start();

//======================</Start>=====================

function closeWindowAnimation(win) {
	var rightSlide = Titanium.UI.createAnimation();
    rightSlide.left = Titanium.Platform.displayCaps.platformWidth; // to put it back to the right side of the window
    rightSlide.duration = 300;
    
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
    
	for (i; i > pos; i--) {
		if (windowStack[i].cleanTour !== undefined) windowStack[i].cleanTour();
		windowStack[i].close();
		windowStack.pop();
	}
	
	closeWindowAnimation(last);
}

function toRad(grad) {
	return Math.PI * grad / 180;
}

//in google we trust
Alloy.Globals.getDistanceTo = function(dot) {
   
    var R = 6371; //Earth radius
    var latA = toRad(userPosition.latitude), latB = toRad(dot.latitude);
    var lonA = toRad(userPosition.longitude), lonB = toRad(dot.longitude);
    var x = (lonB - lonA) * Math.cos((latA + latB) / 2);
	var y = (latB - latA);
    
    return Math.acos(
	    	Math.sin(latA) * Math.sin(latB) +
	    	Math.cos(latA) * Math.cos(latB) *
	    	Math.cos(lonB - lonA)
    	) * R;
};

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
	
	switch(pos) {
		case -1:
			openWindowAnimation(win);
			windowStack.push(win);
		break;
		case (windowStack.length - 1):
			//if user try to open window from the same window
		break;
		default:
			backToStackPos(pos);
		break;
	}
};

Alloy.Globals.closeWindow = function() {
	closeWindowAnimation(windowStack.pop());
};

Alloy.Globals.userPosition = userPosition;
