function Starter(toursAmount) {
    this.size = toursAmount;
    this.tours = [];
}

function DotViewStarter(pressButton, currentTour) {
    this.done = pressButton;
    this.tour = currentTour;
    this.size = currentTour.tourPath.length;
    this.index = 0;
}

function createPhotoArray(oldArray) {
    var photoArray = [], i = 0;
    for (i; oldArray.length > i; i++) photoArray.push(oldArray[i].urls.original);
    return photoArray;
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

function timerTick(timer) {
    Ti.API.info("loadFromCloud| timer index = " + timer.index);
    timer.view.applyProperties({
        image: "images/tourView/loading/loading_ico_" + timer.index + ".png"
    });
    timer.index++;
    3 === timer.index && (timer.index = 0);
}

function loadTour(tour) {
    var bufTour = new Tour(tour.id, tour.photo.urls.original, null, tour.name, tour.text, tour.audio_size, tour.audio_length, tour.price, tour.path, tour.audio_id);
    bufTour.dots = [ tour.path.length ];
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
            starter.addTour(tour);
        } else alert("Error: " + (e.error && e.message || JSON.stringify(e)));
    });
}

function getAudio(tour) {
    Cloud.Files.show({
        file_id: tour.audio.id
    }, function(e) {
        Ti.API.info("loadFromCloud| Loading audio file (" + e.files[0].name + ")");
        e.success ? tour.audio.player = Ti.Media.createSound({
            url: e.files[0].url,
            volume: .5,
            allowBackground: true,
            preload: true
        }) : alert("Error: " + (e.error && e.message || JSON.stringify(e)));
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

var Cloud = require("ti.cloud");

var starter, dotViewStarter;

var sityTips = [];

Starter.prototype.addTour = function(tour) {
    this.tours.push(tour);
    if (this.tours.length === this.size) {
        var index = Alloy.createController("index");
        var tourViewProcedures = require("lib/tourViewProcedures");
        tourViewProcedures.initTourViews(index);
    }
};

DotViewStarter.prototype.loadDots = function() {
    var starter = this;
    Cloud.Places.query({
        where: {
            tags_array: this.tour.id
        }
    }, function(e) {
        if (e.success) {
            var i = 0;
            this.size = e.places.length;
            for (i; this.size > i; i++) starter.createDot(e.places[i]);
        } else alert("Error: " + (e.error && e.message || JSON.stringify(e)));
    });
};

DotViewStarter.prototype.createDot = function(place) {
    var starter = this;
    Cloud.PhotoCollections.showPhotos({
        collection_id: place.custom_fields.collection_id
    }, function(e) {
        e.success ? e.photos ? starter.saveDot({
            id: place.id,
            name: place.name,
            text: place.custom_fields.text,
            cover: place.photo.urls.original,
            gallery: createPhotoArray(e.photos),
            latitude: place.latitude,
            longitude: place.longitude
        }) : alert("Success: No photos") : alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
    });
};

DotViewStarter.prototype.saveDot = function(dot) {
    var i = this.tour.tourPath.indexOf(dot.id);
    this.tour.dots[i] = dot;
    this.index++;
    if (this.index === this.size) {
        Ti.API.info("loadFromCloud| Load finished");
        this.tour.isDownloaded = true;
        this.done("images/tourView/Play_Button.png");
    }
};

Tour.prototype.buy = function(pressButton) {
    this.isBuyed = true;
    pressButton("images/tourView/Download_Button.png");
};

Tour.prototype.download = function(pressButton) {
    getAudio(this);
    dotViewStarter = new DotViewStarter(pressButton, this);
    dotViewStarter.loadDots();
};

exports.init = function() {
    Cloud.Users.login({
        login: "guest@gmail.com",
        password: "12345"
    }, function(e) {
        e.success ? Cloud.Objects.query({
            classname: "Tour"
        }, function(ee) {
            if (ee.success) {
                var i = 0;
                starter = new Starter(ee.Tour.length);
                for (i; ee.Tour.length > i; i++) loadTour(ee.Tour[i]);
                loadTips();
            } else alert("Error: " + (ee.error && ee.message || JSON.stringify(ee)));
        }) : alert("Login Error: " + (e.error && e.message || JSON.stringify(e)));
    });
};

exports.getTours = function() {
    return starter.tours;
};

exports.getTips = function() {
    return sityTips;
};