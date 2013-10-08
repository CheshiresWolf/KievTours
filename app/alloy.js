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

var Cloud = require("ti.cloud");
var starter, dotViewStarter;

//var loading = {
//	index: 0,
//	view: null
//};
//var timer;

//Cloud.debug = true;

//=================================<Starter>================================
//wait when we get all tours
function Starter(toursAmount) {
	this.size = toursAmount;
	this.tours = [];
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
	//getAudio(this.tour);
	
	Cloud.Places.query({
		where: {
			tags_array: this.tour.id
		}
	}, function(e) {
		if (e.success) {
			var i = 0;
			
			this.size = e.places.length;
			
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
				
	            starter.saveDot({
					id: place.id,
					name: place.name,
					text: place.custom_fields.text,
					cover: place.photo.urls.original,
					gallery: createPhotoArray(e.photos),
					latitude: place.latitude,
					longitude: place.longitude
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
	
	if (this.index === this.size) {
		
		//=============================================<<<<<<<<<<
		Ti.API.info('alloy.js| Load finished');
		//=============================================<<<<<<<<<<
		
		this.tour.isDownloaded = true;
		//clearInterval(timer);
		//loading.view.setVisible(false);
		this.done("images/tourView/Play_Button.png");
	}
};

function createPhotoArray(oldArray) {
	var photoArray = [], i = 0;
	
	for (i; i < oldArray.length; i++) {
		photoArray.push(oldArray[i].urls.original);
	}
	
	return photoArray;
}

//=================================</DotViewStarter>================================

//=================================<Tour>================================

function Tour(tourId, tourImage, backgroundImage, tourTitle, tourText, fileSize, audioLength, tourPrice, dotsPath, audioId) {
	
	this.id = tourId; //id in cloud
	this.img = tourImage;
	this.background = backgroundImage;
	this.title = tourTitle;
	this.text = tourText;
	this.size = fileSize;
	this.time = audioLength;
	this.price = tourPrice;
	this.dots = [];
	this.tourPath = dotsPath;
	
	this.audio = {
		id: audioId,
		player: null
	};
	
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

function timerTick(timer) {
	Ti.API.info('alloy.js| timer index = ' + timer.index); //============================
		
	timer.view.applyProperties({image: "images/tourView/loading/loading_ico_" + timer.index + ".png"});
	timer.index++;
	if (timer.index === 3) timer.index = 0;
}

Tour.prototype.download = function(pressButton, view) {
	//downloading
	//...
	//var loading = this.loading;
	//loading.view = view;
	//loading.view.setVisible(true);
	//timer = setInterval(function() {
	//	Ti.API.info('alloy.js| timer index = ' + loading.index); //============================
	//		
	//	loading.view.applyProperties({image: "images/tourView/loading/loading_ico_" + loading.index + ".png"});
	//	loading.index++;
	//	if (loading.index === 3) loading.index = 0;
	//}, 1000);
	
	getAudio(this);
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
		tour.path,
		tour.audio_id
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

function getAudio(tour) {
	Cloud.Files.show({
		file_id: tour.audio.id
	}, function (e) {
		
		//=============================================<<<<<<<<<<
		Ti.API.info("alloy.js| Loading audio file (" + e.files[0].name + ")");
		//=============================================<<<<<<<<<<
		
	    if (e.success) {
			tour.audio.player = Ti.Media.createSound({ 
			    url: e.files[0].url,
			    volume: 0.5,
			    allowBackground: true,
			    preload: true
			});
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
