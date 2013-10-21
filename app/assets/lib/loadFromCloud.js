var Cloud = require("ti.cloud");
var tourStarter;
var downloadedTours = [], sityTips = [];

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
	
	this.size = currentTour.tourPath.length + 1; // + 1 audio file
	this.index = 0;
	this.loadAudio = true;
	
	load(this);
}

DotViewStarter.prototype.isDownloaded = function() {
	this.index++;
	
	if (this.index === this.size) {	//dots + audio file
		
		this.tour.isDownloaded = true;
		this.done();
		saveToCloud(this.tour.id);
	}
};

function load(starter) {
	if (starter.loadAudio) {
		getAudio(starter);
	}
	
	Cloud.Places.query({
		per_page: 100,
		where: {
			tags_array: starter.tour.id
		}
	}, function(e) {
		if (e.success) {
			var i = 0;
			
			for (i; i < e.places.length; i++) {
				createDot(e.places[i], starter);
			}
	    } else {
			alert('Error: ' + ((e.error && e.message) || JSON.stringify(e)));  
	    }
	});
};

function getText(text) {
	var res = "", i = 0;
	
	if (typeof text === 'string') {
		res = text;
	} else {		
		for (i; i < text.length; i++) {
			res += text[i] + " ";
		}
	}
	
	return res;
}

function createDot(place, starter) {
	Cloud.PhotoCollections.showPhotos({
		collection_id: place.custom_fields.collection_id
	}, function (e) {
	    if (e.success) {
	        if (!e.photos) {
	            alert('Success: No photos');
	        } else {
				var text = getText(place.custom_fields.text);
	
	            saveDot({
					id: place.id,
					name: place.name,
					text: text,
					cover: place.photo.urls.original,
					gallery: createPhotoArray(e.photos),
					latitude: place.latitude,
					longitude: place.longitude
	            }, starter);
	        }
	    } else {
	        alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
	    }
	});
}

function saveDot(dot, starter) {		
	var i = starter.tour.tourPath.indexOf(dot.id);
	starter.tour.dots[i] = dot;
	
	//if audio file already loaded we don't need to wait
	if (starter.loadAudio) {
		starter.isDownloaded();
	}
}

function createPhotoArray(oldArray) {
	var photoArray = [], i = 0;
	
	for (i; i < oldArray.length; i++) {
		photoArray.push(oldArray[i].urls.original);
	}
	
	return photoArray;
}

function getAudio(starter) {
	Cloud.Files.show({
		file_id: starter.tour.audio.id
	}, function (e) {		
	    if (e.success) {
		 
		    localFile = Titanium.Filesystem.getApplicationDataDirectory() + starter.tour.id + ".mp3";
		    
		    if (starter.tour.isDownloaded) {
				//if file already loaded on phone
				starter.tour.audio.player = createPlayer(localFile);
				starter.isDownloaded();
		    } else {
				//load file from cloud			 
			    var httpClient = Titanium.Network.createHTTPClient();
			    httpClient.setTimeout(1000000);
			 
			    // Data received
			    httpClient.onload = function(e) {
			        //=============================================<<<<<<<<<<
					Ti.API.info("loadFromCloud| Save path - " + localFile);
					//=============================================<<<<<<<<<<
					
					var file = Titanium.Filesystem.getFile(localFile);
			        file.write(this.responseData);
			        
			        starter.tour.audio.player = createPlayer(localFile);
			        starter.tour.isDownloaded = true;
			        starter.isDownloaded();
			    };
			 
			    // Handle state change
			    httpClient.onreadystatechange = function(e) {
			        if (e.readyState === 4) {
						Ti.API.info('loadFromCloud.js| Download complete');
			        }
			    };
			 
			    // Handle error event
			    httpClient.onerror = function(e) {
			        Ti.API.info('loadFromCloud.js| HTTP error!');
			    };
	
			    httpClient.open('GET', e.files[0].url);
			    httpClient.send();
			}
	    } else {
			alert('Error: ' + ((e.error && e.message) || JSON.stringify(e)));  
	    }
	});
}

function createPlayer(path) {
	return Ti.Media.createSound({ 
	    url: path,
	    volume: 0.5,
	    allowBackground: true,
	    autoplay: false
	});
}

function saveToCloud(id) {
	downloadedTours.push(id);
	
	Cloud.Users.update({
		login: "user1",
		custom_fields: {
			downloadedTours: downloadedTours
		}
	}, function(e) {
		Ti.API.info("loadFromCloud| Updete user.downloadedTours = " + downloadedTours.toString());
	});
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

Tour.prototype.buy = function() {
	//buying
	//...
	
	this.isBuyed = true;
};

Tour.prototype.download = function(pressButton) {
	//downloading
	//...
	
	var dotViewStarter = new DotViewStarter(pressButton, this);
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
	//if audio file already loaded
	if (downloadedTours.indexOf(bufTour.id) !== -1) {
		//if file hasn't been removed
		if (Titanium.Filesystem.getFile(Titanium.Filesystem.getApplicationDataDirectory(), bufTour.id + ".mp3").exists()) {
			var bufStarter = new DotViewStarter(null, bufTour);
			bufStarter.loadAudio = false;
			bufStarter.size -= 1;
			bufTour.isBuyed = true;
			bufTour.isDownloaded = true;
		}
	}
	
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
			tourStarter.addTour(tour);
	    } else {
			alert('Error: ' + ((e.error && e.message) || JSON.stringify(e)));
	    }
	});
}

//=================================</Tour>================================

//=================================<SityTips>================================

function loadTips() {
	Cloud.Objects.query({
		classname: 'SityTips'
	}, function(e) {
		if (e.success) {
			sityTips = e.SityTips;
			
			//=============================================<<<<<<<<<<
			Ti.API.info("loadFromCloud| SityTips are loaded.");
			//=============================================<<<<<<<<<<
		
		} else {
			alert('Error: ' + ((ee.error && ee.message) || JSON.stringify(ee)));        
		}
	});
}

//=================================</SityTips>================================

//=================================<MAIN>================================

exports.init = function() {
	Cloud.Users.login({
		login: "user1",
		password: "user1"
	}, function(e) {
		if (e.success)   {
			downloadedTours = e.users[0].custom_fields.downloadedTours;
			
			getToursFromCloud();
		} else {
			alert('Login Error: ' + ((e.error && e.message) || JSON.stringify(e)));
		}
	});
};

function getToursFromCloud() {
	Cloud.Objects.query({
		classname: 'Tour'
	}, function(ee) {
		if (ee.success) {
			var i = 0;
			tourStarter = new Starter(ee.Tour.length);
			
			for (i; i < ee.Tour.length; i++) {
				loadTour(ee.Tour[i]);
			}
			
			loadTips();
			
		} else {
			alert('Error: ' + ((ee.error && ee.message) || JSON.stringify(ee)));        
		}
	});
}

//=================================</MAIN>===============================

//===============================<Discover>==============================

exports.getDotsNear = function() {
	var pos = Alloy.Globals.userPosition;
	
	Cloud.Places.query({
		where: {
	        lnglat: {
	            '$nearSphere': [pos.longitude,pos.latitude],
	            '$maxDistance': 0.003
	        }
	    }
	}, function(e) {
		if (e.success) {
			var i = 0;
			var discover = Alloy.createController("discoverMenu");

			discover.fillTable(e.places);
			discover.getView().windowName = "discoverMenu";
			Alloy.Globals.openWindow(discover.getView());
			
	    } else {
			alert('Error: ' + ((e.error && e.message) || JSON.stringify(e)));  
	    }
	});
};

//==============================</Discover>==============================

exports.getTours = function() {
	return tourStarter.tours;
};

exports.getTips = function() {
	return sityTips;
};
