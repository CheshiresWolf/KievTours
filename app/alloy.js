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
	var background = "";
	var price = 0;
	var isDownloaded = false;
};
tour.prototype.set = function(img, title, text, size, dots, length, background, price) {
  	this.img = img;
	this.title = title;
	this.text = text;
	this.size = size;
	this.dots = dots;
	this.length = length;
	this.background = background;
	this.price = price;
};
tour.prototype.download = function() {
	//downloading
	//...
	
	this.isDownloaded = true;
};

var tours = [];

//load tours from somwere and cast it to array
//function load(url) {
var tour1 = new tour();
tour1.set(
	"images/SmallSircle.png",
	"O_o",
	"Run FULS!",
	125,
	null,
	"2:10",
	"images/APP_Kiev_background.png",
	9.99
	);
tours.push(tour1);

var tour2 = new tour();
tour2.set(
	"images/SmallSircleBuf.png",
	"O_o",
	"Abir Abi rWald ffffffff fffffff fffff ffff fffffff",
	125,
	null,
	"2:10",
	"images/APP_Kiev_background_Buf.png",
	0
	);
tour2.download();
tours.push(tour2);
//};

Alloy.Globals.getTours = function() {
	return tours;
};

Alloy.createController('index').getView().open();

//===========================================
//Ti.API.info("alloy.js open");
//===========================================
