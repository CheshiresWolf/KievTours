function Starter(toursAmount) {
    this.size = toursAmount;
    this.tours = [];
}

function DotViewStarter(pressButton, currentTour) {
    this.done = pressButton;
    this.tour = currentTour;
    this.size = currentTour.tourPath.length + 1;
    this.index = 0;
    this.loadAudio = true;
    this.load();
}

function createDot(place, starter) {
    Cloud.PhotoCollections.showPhotos({
        collection_id: place.custom_fields.collection_id
    }, function(e) {
        e.success ? e.photos ? saveDot({
            id: place.id,
            name: place.name,
            text: place.custom_fields.text,
            cover: place.photo.urls.original,
            gallery: createPhotoArray(e.photos),
            latitude: place.latitude,
            longitude: place.longitude
        }, starter) : alert("Success: No photos") : alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
    });
}

function saveDot(dot, starter) {
    var i = starter.tour.tourPath.indexOf(dot.id);
    starter.tour.dots[i] = dot;
    starter.loadAudio && starter.isDownloaded();
}

function createPhotoArray(oldArray) {
    var photoArray = [], i = 0;
    for (i; oldArray.length > i; i++) photoArray.push(oldArray[i].urls.original);
    return photoArray;
}

function getAudio(starter) {
    Cloud.Files.show({
        file_id: starter.tour.audio.id
    }, function(e) {
        Ti.API.info("loadFromCloud| Loading audio file (" + e.files[0].name + ")");
        if (e.success) {
            localFile = Titanium.Filesystem.getApplicationDataDirectory() + starter.tour.id + ".mp3";
            if (starter.tour.isDownloaded) {
                starter.tour.audio.player = createPlayer(localFile);
                starter.isDownloaded();
            } else {
                var httpClient = Titanium.Network.createHTTPClient();
                httpClient.setTimeout(1e6);
                httpClient.onload = function() {
                    Ti.API.info("loadFromCloud| Save path - " + localFile);
                    var file = Titanium.Filesystem.getFile(localFile);
                    file.write(this.responseData);
                    starter.tour.audio.player = createPlayer(localFile);
                    starter.tour.isDownloaded = true;
                    starter.isDownloaded();
                };
                httpClient.onreadystatechange = function(e) {
                    4 === e.readyState && Ti.API.info("loadFromCloud.js| Download complete");
                };
                httpClient.onerror = function() {
                    Ti.API.info("loadFromCloud.js| HTTP error!");
                };
                httpClient.open("GET", e.files[0].url);
                httpClient.send();
            }
        } else alert("Error: " + (e.error && e.message || JSON.stringify(e)));
    });
}

function createPlayer(path) {
    return Ti.Media.createSound({
        url: path,
        volume: .5,
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
    }, function() {
        Ti.API.info("loadFromCloud| Updete user.downloadedTours = " + downloadedTours.toString());
    });
}

function Tour(tourId, tourImage, backgroundImage, tourTitle, tourText, fileSize, audioLength, tourPrice, dotsPath, audioId) {
    this.id = tourId;
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
    this.isBuyed = 0 !== tourPrice ? false : true;
    this.isDownloaded = false;
}

function loadTour(tour) {
    var bufTour = new Tour(tour.id, tour.photo.urls.original, null, tour.name, tour.text, tour.audio_size, tour.audio_length, tour.price, tour.path, tour.audio_id);
    if (-1 !== downloadedTours.indexOf(bufTour.id)) {
        var bufStarter = new DotViewStarter(null, bufTour);
        bufStarter.loadAudio = false;
        bufTour.isBuyed = true;
        bufTour.isDownloaded = true;
    }
    setBackground(bufTour);
}

function setBackground(tour) {
    Cloud.Photos.query({
        where: {
            tags_array: tour.id
        }
    }, function(e) {
        if (e.success) {
            tour.background = e.photos[0].urls.original;
            tourStarter.addTour(tour);
        } else alert("Error: " + (e.error && e.message || JSON.stringify(e)));
    });
}

function loadTips() {
    Cloud.Objects.query({
        classname: "SityTips"
    }, function(e) {
        if (e.success) {
            sityTips = e.SityTips;
            Ti.API.info("loadFromCloud| SityTips are loaded.");
        } else alert("Error: " + (ee.error && ee.message || JSON.stringify(ee)));
    });
}

function getToursFromCloud() {
    Cloud.Objects.query({
        classname: "Tour"
    }, function(ee) {
        if (ee.success) {
            var i = 0;
            tourStarter = new Starter(ee.Tour.length);
            for (i; ee.Tour.length > i; i++) loadTour(ee.Tour[i]);
            loadTips();
        } else alert("Error: " + (ee.error && ee.message || JSON.stringify(ee)));
    });
}

var Cloud = require("ti.cloud");

var tourStarter, dotViewStarter, downloadedTours = [];

var sityTips = [];

Cloud.debug = true;

Starter.prototype.addTour = function(tour) {
    this.tours.push(tour);
    if (this.tours.length === this.size) {
        var index = Alloy.createController("index");
        var tourViewProcedures = require("lib/tourViewProcedures");
        tourViewProcedures.initTourViews(index);
    }
};

DotViewStarter.prototype.load = function() {
    var starter = this;
    this.loadAudio && getAudio(this);
    Cloud.Places.query({
        where: {
            tags_array: this.tour.id
        }
    }, function(e) {
        if (e.success) {
            var i = 0;
            this.size = e.places.length;
            for (i; this.size > i; i++) createDot(e.places[i], starter);
        } else alert("Error: " + (e.error && e.message || JSON.stringify(e)));
    });
};

DotViewStarter.prototype.isDownloaded = function() {
    this.index++;
    if (this.index === this.size) {
        Ti.API.info("loadFromCloud| Load finished");
        this.tour.isDownloaded = true;
        this.done("images/tourView/Play_Button.png");
        saveToCloud(this.tour.id);
    }
};

Tour.prototype.buy = function(pressButton) {
    this.isBuyed = true;
    pressButton("images/tourView/Download_Button.png");
};

Tour.prototype.download = function(pressButton) {
    Ti.API.info("loadFromCloud| Tour.title = " + this.title);
    dotViewStarter = new DotViewStarter(pressButton, this);
};

exports.init = function() {
    Cloud.Users.login({
        login: "user1",
        password: "user1"
    }, function(e) {
        if (e.success) {
            downloadedTours = e.users[0].custom_fields.downloadedTours;
            getToursFromCloud();
        } else alert("Login Error: " + (e.error && e.message || JSON.stringify(e)));
    });
};

exports.getDotsNear = function() {
    var pos = Alloy.Globals.userPosition;
    Cloud.Places.query({
        where: {
            lnglat: {
                $nearSphere: [ pos.longitude, pos.latitude ],
                $maxDistance: .003
            }
        }
    }, function(e) {
        if (e.success) {
            var discover = Alloy.createController("discoverMenu");
            discover.fillTable(e.places);
            discover.getView().windowName = "discoverMenu";
            Alloy.Globals.openWindow(discover.getView());
        } else alert("Error: " + (e.error && e.message || JSON.stringify(e)));
    });
};

exports.getTours = function() {
    return tourStarter.tours;
};

exports.getTips = function() {
    return sityTips;
};