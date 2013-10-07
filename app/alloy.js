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
var starter, dotViewStarter;

Cloud.debug = true;

//=================================<Starter>================================
//wait when we get all tours
function Starter(toursAmount) {
	this.size = toursAmount;
	this.tours = [];
	//callback function can use it when calling the other method
	//this.starter = this;
}

Starter.prototype.addTour = function(tour) {
	this.tours.push(tour);
	
	if (this.tours.length === this.size) {
		var index = Alloy.createController("index");
		var tourViewProcedures = require("lib/tourViewProcedures");
		tourViewProcedures.initTourViews(index);
	}
};
//=================================</Starter>================================

//=================================<DotViewStarter>================================

function DotViewStarter(pressButton, currentTour) {
	this.done = pressButton;
	this.tour = currentTour;
	
	this.size = currentTour.tourPath.length;
	this.index = 0;
}

DotViewStarter.prototype.loadDots = function() {
	var starter = this;
	getAudio(this.tour);
	
	Cloud.Places.query({
		where: {
			tags_array: this.tour.id
		}
	}, function(e) {
		if (e.success) {
			var i = 0;
			
			this.size = e.places.length;
			
			//=============================================<<<<<<<<<<
			Ti.API.info('load dots; length = ' + this.size);
			//=============================================<<<<<<<<<<
			
			for (i; i < this.size; i++) {
				starter.createDot(e.places[i]);
			}
	    } else {
			alert('Error: ' + ((e.error && e.message) || JSON.stringify(e)));  
	    }
	});
};

DotViewStarter.prototype.createDot = function(place) {
	var starter = this;
	
	Cloud.PhotoCollections.showPhotos({
		collection_id: place.custom_fields.collection_id
	}, function (e) {
	    if (e.success) {
	        if (!e.photos) {
	            alert('Success: No photos');
	        } else {

				//=============================================<<<<<<<<<<
				Ti.API.info('createDot');
				//=============================================<<<<<<<<<<
				
	            starter.saveDot({
					id: place.id,
					name: place.name,
					text: place.text,
					cover: place.photo.urls.original,
					gallery: createPhotoArray(e.photos),
					latitude: place.custom_fields.coordinates[1],
					longitude: place.custom_fields.coordinates[0]
	            });
	        }
	    } else {
	        alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
	    }
	});
};

DotViewStarter.prototype.saveDot = function(dot) {	
	var i = this.tour.tourPath.indexOf(dot.id);
	this.tour.dots[i] = dot;
	this.index++;
	
	//=============================================<<<<<<<<<<
	Ti.API.info("saveDot [ " + this.index + " | " + this.size + " ]");
	//=============================================<<<<<<<<<<
	
	if (this.index === this.size) {
		//=============================================<<<<<<<<<<
		Ti.API.info('DONNNNNEN');
		//=============================================<<<<<<<<<<
		this.tour.isDownloaded = true;
		this.done("images/tourView/Play_Button.png");
	}
};


function getAudio(tour) {
	Cloud.Files.query({
	    where: {
	        id: tour.audio_id
	    }
	}, function (e) {
	    if (e.success) {
			tour.songPath = e.files[0].url;
	    } else {
			alert('Error: ' + ((e.error && e.message) || JSON.stringify(e)));  
	    }
	});
}

function createPhotoArray(oldArray) {
	var photoArray = [], i = 0;
	
	for (i; i < oldArray.length; i++) {
		photoArray.push(oldArray[i].urls.original);
	}
	
	return photoArray;
}

//=================================</DotViewStarter>================================

//=================================<Tour>================================

function Tour(tourId, tourImage, backgroundImage, tourTitle, tourText, fileSize, audioLength, tourPrice, dotsPath) {
	
	this.id = tourId; //id in cloud
	this.img = tourImage;
	this.background = backgroundImage;
	this.title = tourTitle;
	this.text = tourText;
	this.size = fileSize;
	this.time = audioLength;
	this.price = tourPrice;
	this.songPath = "";
	this.dots = [];
	this.tourPath = dotsPath;
	
	if (tourPrice !== 0) {	//wrong logic, if we buy tour - hide price (=======FIX======)
		this.isBuyed = false;
	} else {
		this.isBuyed = true;
	}
	
	this.isDownloaded = false;
}

Tour.prototype.buy = function(pressButton) {
	//buying
	//...
	
	this.isBuyed = true;
	pressButton("images/tourView/Download_Button.png");
};

Tour.prototype.download = function(pressButton) {
	//downloading
	//...
	
	//=============================================<<<<<<<<<<
	Ti.API.info('Tour.prototype.download');
	//=============================================<<<<<<<<<<
	
	dotViewStarter = new DotViewStarter(pressButton, this);
	dotViewStarter.loadDots();
};

function loadTour(tour) {
	var bufTour = new Tour(
		tour.id,
		tour.photo.urls.original,
		null,
		tour.name,
		tour.text,
		tour.audio_size,
		tour.audio_length,
		tour.price,
		tour.path
	);
	bufTour.dots = [tour.path.length];
	setBackground(bufTour);
}

function setBackground(tour) {	
	Cloud.Photos.query({
	    where: {
	        tags_array: tour.id
	    }
	}, function (e) {
	    if (e.success) {
			tour.background = e.photos[0].urls.original;
			starter.addTour(tour);
	    } else {
			alert('Error: ' + ((e.error && e.message) || JSON.stringify(e)));
	    }
	});
}

//=================================</Tour>================================

//=================================<MAIN>================================

Cloud.Users.login({
	login: "guest@gmail.com",
	password: "12345"
}, function(e) {
	if (e.success)   {
		Cloud.Objects.query({
			classname: 'Tour'
		}, function(ee) {
			if (ee.success) {
				var i = 0;
				starter = new Starter(ee.Tour.length);
				
				for (i; i < ee.Tour.length; i++) {
					loadTour(ee.Tour[i]);
				}
				
			} else {
				alert('Error: ' + ((ee.error && ee.message) || JSON.stringify(ee)));        
			}
		});
	} else {
		alert('Login Error: ' + ((e.error && e.message) || JSON.stringify(e)));
	}
});
//=================================</MAIN>===============================

//=================================<Globals>===============================

Alloy.Globals.getTours = function() {
	return starter.tours;
};

Alloy.Globals.openWindow = function(win) {
	var leftSlide = Titanium.UI.createAnimation();
    leftSlide.left = 0; // to put it back to the left side of the window
    leftSlide.duration = 300;
    win.applyProperties({left: Titanium.Platform.displayCaps.platformWidth});
    
	win.open(leftSlide);
};

Alloy.Globals.closeWindow = function(win) {
	var rightSlide = Titanium.UI.createAnimation();
    rightSlide.left = Titanium.Platform.displayCaps.platformWidth; // to put it back to the right side of the window
    rightSlide.duration = 300;
    
	win.close(rightSlide);
};


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
