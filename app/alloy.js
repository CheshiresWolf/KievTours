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
Ti.API.info("alloy.js start");
//===========================================

function Tour(tourImage, tourTitle, tourText, fileSize, tourDots, timeLength, backgroundImage, tourPrice) {
	this.img = tourImage;
	this.title = tourTitle;
	this.text = tourText;
	this.size = fileSize;
	this.dots = {};
	this.time = timeLength;
	this.background = backgroundImage;
	this.price = tourPrice;
	
	if (tourPrice !== 0) {
		this.isBuyed = false;
	} else {
		this.isBuyed = true;
	}
	
	this.isDownloaded = false;
}

Tour.prototype.buy = function() {
	//buying
	//...
	
	this.isBuyed = true;
};

Tour.prototype.download = function() {
	//downloading
	//...
	
	this.isDownloaded = true;
};

var tours = [];

//load tours from somwere and cast it to array
//function load(url) {
tours.push(new Tour(
	"images/SmallSircle.png",
	"1",
	"Run FULS!",
	125,
	null,
	"2:10",
	"images/APP_Kiev_background.png",
	9.99
));

//tours.push(tour1);

var tourBuf = new Tour(
	"images/SmallSircleBuf.png",
	"TWO TwO tWo two 2",
	"Abir Abi rWald ffffffff fffffff fffff ffff fffffff asjdfk adjhfasbv bcbvb fbvusybv vjbsnc chvs jvb",
	111,
	null,
	"0:15",
	"images/APP_Kiev_background_Buf.png",
	5
	);
tourBuf.download();
tours.push(tourBuf);

tours.push(new Tour(
	"images/SmallSircle.png",
	"3",
	"Run FULS!",
	125,
	null,
	"2:10",
	"images/APP_Kiev_background.png",
	9.99
));

//tours.push(tour3);

tours.push(new Tour(
	"images/SmallSircle.png",
	"4",
	"Run FULS!",
	95,
	null,
	"2:10",
	"images/APP_Kiev_background.png",
	9.99
));
//tours.push(tour4);

Alloy.Globals.getTours = function() {
	return tours;
};

Alloy.createController('index').getView().open();

//===========================================
//Ti.API.info("alloy.js open");
//===========================================
