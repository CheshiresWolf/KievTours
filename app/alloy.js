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

var tour = {
	img: "",
	title: "",
	text: "",
	size: 0,
	dots: {},
	length: 0
}
tour.set = function(img, title, text, size, dots, length) {
  	this.img = img
	this.title = title;
	this.text = text;
	this.size = size;
	this.dots = dots;
	this.length = length;
}

var tours = [];

//load tours from somwere and cast it to array
function load(url) {
	tours.add(new tour.set("images/APP_Kiev_logo.png", "O_o", "Run FULS!", 125, 31, "2:10"));
};

Alloy.Globals.getTours = function() {
	return tours;
}

Alloy.createController('index').getView().open()

//===========================================
//Ti.API.info("alloy.js open");
//===========================================
