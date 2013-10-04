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

var Cloud = require("ti.cloud");
var tours = [], i = 0, counter = 0;

Cloud.debug = true;

function Tour(tourImage, tourTitle, tourText, fileSize, timeLength, backgroundImage, tourPrice, songPath) {
	this.img = tourImage;
	this.title = tourTitle;
	this.text = tourText;
	this.size = fileSize;
	this.dots = [];
	this.time = timeLength;
	this.background = backgroundImage;
	this.price = tourPrice;
	this.songPath = songPath;
	
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

function getPhoto(id, index) {
	//var tagArray = [];
	//tagArray.push(id);
	//tagArray.push(backId);
	
	Cloud.Photos.query({
	    where: {
	        tags_array: id
	    }
	}, function (e) {
	    if (e.success) {
			tours[index].background = e.photos[0].urls.original;
			Ti.API.info('IMAGE SET to ' + index);
			starter();
	    } else {
			alert('Error: ' + ((e.error && e.message) || JSON.stringify(e)));
	    }
	});
}

function getAudio(id, index) {
	Cloud.Files.query({
	    where: {
	        id: id
	    }
	}, function (e) {
	    if (e.success) {
			tours[index].songPath = e.files[0].url;
			Ti.API.info('FILE SET to ' + index);
			starter();
	    } else {
			alert('Error: ' + ((e.error && e.message) || JSON.stringify(e)));  
	    }
	});
}

function starter() {
	counter--;
	
	if (counter <= 0) {
		//var window = Ti.UI.createWindow({width: "auto", height: "auto", backgroundColor: "red"});
		//var imgView = Ti.UI.createImageView({image: tours[0].img, top: 0, left: 0, width: 200, height: 200});
		//window.add(imgView);
		//window.open();
		
		var index = Alloy.createController("index");
		var tourViewProcedures = require("lib/tourViewProcedures");
		tourViewProcedures.initTourViews(index);
	}
}

function addTour(tour, index) {
	var bufTour = new Tour(
		tour.photo.urls.original,//getPhoto(tour.photo.id, bufTour.img), // ===============
		tour.name,
		tour.text,
		tour.audio_size,
		tour.audio_length,
		null,//getPhoto(tour.background_id), // ===============
		tour.price,
		null//getAudio(tour.audio_id)
	);
	getPhoto(tour.id, index);
	getAudio(tour.audio_id, index);
	//getPhoto(tour.photo.id, bufTour.background);
	//Ti.API.info(">>[ ORIGINAL: " + bufTour.img + " ]<<");
	tours.push(bufTour);
}

//=================================MAIN================================

Cloud.Users.login({
	login: "guest@gmail.com",
	password: "12345"
}, function(e) {
	if (e.success)   {
		Cloud.Objects.query({
			classname: 'Tour'
		}, function(ee) {
			if (ee.success) {
				//alert('Success: ' + ee.Tour.length);
				counter = ee.Tour.length * 2;
				
				for (i = 0; i < ee.Tour.length; i++) {
					addTour(ee.Tour[i], i);
				}
				
			} else {
				alert('Error: ' + ((ee.error && ee.message) || JSON.stringify(ee)));        
			} // else - fail
		});
	} else {
		alert('Login Error: ' + ((e.error && e.message) || JSON.stringify(e)));
	}
});

/* <====== KILL THIS TO RETURN
var tours = [];

//load tours from somwere and cast it to array
//function load(url) {
var gallery = [];
gallery.push("bufTour/bufGallery/SmallSircleBuf.png");
gallery.push("bufTour/bufGallery/SmallSircleBuf2.png");
gallery.push("bufTour/bufGallery/SmallSircleBuf3.png");
gallery.push("bufTour/bufGallery/SmallSircleBuf4.png");

var buf = new Tour(
	"images/SmallSircle.png",
	"Жемчужины Печерска",
	"Полное описание тура к Югу от Киева, между притоками Днепра, рек Коник и Вита, расположен Жуков остров. Вы увидите то, что осталось от когда-то секретного обьекта.",
	125,
	null,
	"2:10",
	"images/APP_Kiev_background.png",
	9.99,
	"bufTour/song.mp3"
);
buf.dots.push({
	number: 0,
	name: "Особняк по ул. Шелковичная 19",
	text: "Шелковичное описание тура к Югу от Киева, между притоками Днепра, рек Коник и Вита, расположен Жуков остров. Вы увидите то, что осталось от когда-то секретного обьекта.",
	gallery: gallery,
	latitude: 50.4635,//37.390749,
	longitude: 30.3718
});
buf.dots.push({
	number: 1,
	name: "Мост благородных девиц",
	text: "Мост с девицами",
	gallery: gallery,
	latitude: 50.466,//37.390749,
	longitude: 30.3718
});
buf.dots.push({
	number: 2,
	name: "Мариинский парк и его достопримечательности",
	text: "Парк с достопримечательностями",
	gallery: gallery,
	latitude: 50.47,//37.390749,
	longitude: 30.3718
});
buf.dots.push({
	number: 3,
	name: "Пряничный домик",
	text: "Полное описание тура к Югу от Киева, между притоками Днепра, рек Коник и Вита, расположен Жуков остров. Вы увидите то, что осталось от когда-то секретного обьекта.Полное описание тура к Югу от Киева, между притоками Днепра, рек Коник и Вита, расположен Жуков остров. Вы увидите то, что осталось от когда-то секретного обьекта.Полное описание тура к Югу от Киева, между притоками Днепра, рек Коник и Вита, расположен Жуков остров. Вы увидите то, что осталось от когда-то секретного обьекта.Полное описание тура к Югу от Киева, между притоками Днепра, рек Коник и Вита, расположен Жуков остров. Вы увидите то, что осталось от когда-то секретного обьекта.",
	gallery: gallery,
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
	9.99,
	"bufTour/song.mp3"
));
*/

Alloy.Globals.getTours = function() {
	return tours;
};
/*
var index = Alloy.createController("index");


var tourViewProcedures = require("lib/tourViewProcedures");
tourViewProcedures.initTourViews(index);
//*/
/*
var insideTourProcedures = require("lib/insideTourProcedures");
insideTourProcedures.setData(Alloy.createController("index"), tours[0]);
insideTourProcedures.initDotsView();
*/

//===========================================
Alloy.Globals.openWindow = function(win) {
	var leftSlide = Titanium.UI.createAnimation();
    leftSlide.left = 0; // to put it back to the left side of the window
    leftSlide.duration = 300;
    win.applyProperties({left: Titanium.Platform.displayCaps.platformWidth});
    
	win.open(leftSlide);
};

Alloy.Globals.closeWindow = function(win) {
	var rightSlide = Titanium.UI.createAnimation();
    rightSlide.left = Titanium.Platform.displayCaps.platformWidth; // to put it back to the left side of the window
    rightSlide.duration = 300;
    
	win.close(rightSlide);
};
