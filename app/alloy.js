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
//Ti.API.info("alloy.js start");
//===========================================

function tour() {
	var img = "";
	var title = "";
	var text = "";
	var size = 0;
	var dots = {};
	var length = 0;
}
tour.prototype.set = function(img, title, text, size, dots, length) {
  	this.img = img
	this.title = title;
	this.text = text;
	this.size = size;
	this.dots = dots;
	this.length = length;
}

var tours = [];

//load tours from somwere and cast it to array
//function load(url) {
var tour1 = new tour();
	tour1.set("images/SmallSircle.png", "O_o", "Run FULS!", 125, null, "2:10")
	tours.push(tour1);
//};

Alloy.Globals.getTours = function() {
	return tours;
}

Alloy.createController('index').getView().open()

//===========================================
//Ti.API.info("alloy.js open");
//===========================================
