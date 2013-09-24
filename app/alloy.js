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
	this.dots = [];
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
var buf = new Tour(
	"images/SmallSircle.png",
	"Жемчужины Печерска",
	"Полное описание тура к Югу от Киева, между притоками Днепра, рек Коник и Вита, расположен Жуков остров. Вы увидите то, что осталось от когда-то секретного обьекта.",
	125,
	null,
	"2:10",
	"images/APP_Kiev_background.png",
	9.99
);
buf.dots.push({
	name: "Особняк по ул. Шелковичная 19",
	latitude: 50.4635,//37.390749,
	longitude: 30.3718
});
buf.dots.push({
	name: "Мост благородных девиц",
	latitude: 50.466,//37.390749,
	longitude: 30.3718
});
buf.dots.push({
	name: "Мариинский парк и его достопримечательности",
	latitude: 50.47,//37.390749,
	longitude: 30.3718
});
buf.dots.push({
	name: "Пряничный домик",
	latitude: 50.46,//37.390749,
	longitude: 30.3718
});
tours.push(buf);

tours.push(new Tour(
	"images/SmallSircle.png",
	"Жемчужины Печерска",
	"Полное описание тура к Югу от Киева, между притоками Днепра, рек Коник и Вита, расположен Жуков остров. Вы увидите то, что осталось от когда-то секретного обьекта.",
	125,
	null,
	"2:10",
	"images/APP_Kiev_background.png",
	9.99
));
/*
tours.push(new Tour(
	"images/SmallSircle.png",
	"Жемчужины Печерска",
	"Полное описание тура к Югу от Киева, между притоками Днепра, рек Коник и Вита, расположен Жуков остров. Вы увидите то, что осталось от когда-то секретного обьекта.",
	95,
	null,
	"2:10",
	"images/APP_Kiev_background.png",
	9.99
));
*/

Alloy.Globals.getTours = function() {
	return tours;
};
/*
var index = Alloy.createController("index");
var tourViewProcedures = require("lib/tourViewProcedures");
index.getView().open();
tourViewProcedures.initTourViews(index);
*/
///*
var insideTourProcedures = require("lib/insideTourProcedures");
insideTourProcedures.setData(Alloy.createController("index"), tours[0]);
insideTourProcedures.initDotsView();
//*/
//===========================================
//Ti.API.info("alloy.js open");
//===========================================
