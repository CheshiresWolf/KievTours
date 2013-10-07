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

function getAudio(tour) {
    Cloud.Files.query({
        where: {
            id: tour.audio_id
        }
    }, function(e) {
        e.success ? tour.songPath = e.files[0].url : alert("Error: " + (e.error && e.message || JSON.stringify(e)));
    });
}

function createPhotoArray(oldArray) {
    var photoArray = [], i = 0;
    for (i; oldArray.length > i; i++) photoArray.push(oldArray[i].urls.original);
    return photoArray;
}

function Tour(tourId, tourImage, backgroundImage, tourTitle, tourText, fileSize, audioLength, tourPrice, dotsPath) {
    this.id = tourId;
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
    this.isBuyed = 0 !== tourPrice ? false : true;
    this.isDownloaded = false;
}

function loadTour(tour) {
    var bufTour = new Tour(tour.id, tour.photo.urls.original, null, tour.name, tour.text, tour.audio_size, tour.audio_length, tour.price, tour.path);
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

var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Ti.API.info("alloy.js start");

var Cloud = require("ti.cloud");

var starter, dotViewStarter;

Cloud.debug = true;

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
    getAudio(this.tour);
    Cloud.Places.query({
        where: {
            tags_array: this.tour.id
        }
    }, function(e) {
        if (e.success) {
            var i = 0;
            this.size = e.places.length;
            Ti.API.info("load dots; length = " + this.size);
            for (i; this.size > i; i++) starter.createDot(e.places[i]);
        } else alert("Error: " + (e.error && e.message || JSON.stringify(e)));
    });
};

DotViewStarter.prototype.createDot = function(place) {
    var starter = this;
    Cloud.PhotoCollections.showPhotos({
        collection_id: place.custom_fields.collection_id
    }, function(e) {
        if (e.success) if (e.photos) {
            Ti.API.info("createDot");
            starter.saveDot({
                id: place.id,
                name: place.name,
                text: place.text,
                cover: place.photo.urls.original,
                gallery: createPhotoArray(e.photos),
                latitude: place.custom_fields.coordinates[1],
                longitude: place.custom_fields.coordinates[0]
            });
        } else alert("Success: No photos"); else alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
    });
};

DotViewStarter.prototype.saveDot = function(dot) {
    var i = this.tour.tourPath.indexOf(dot.id);
    this.tour.dots[i] = dot;
    this.index++;
    Ti.API.info("saveDot [ " + this.index + " | " + this.size + " ]");
    if (this.index === this.size) {
        Ti.API.info("DONNNNNEN");
        this.tour.isDownloaded = true;
        this.done("images/tourView/Play_Button.png");
    }
};

Tour.prototype.buy = function(pressButton) {
    this.isBuyed = true;
    pressButton("images/tourView/Download_Button.png");
};

Tour.prototype.download = function(pressButton) {
    Ti.API.info("Tour.prototype.download");
    dotViewStarter = new DotViewStarter(pressButton, this);
    dotViewStarter.loadDots();
};

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
        } else alert("Error: " + (ee.error && ee.message || JSON.stringify(ee)));
    }) : alert("Login Error: " + (e.error && e.message || JSON.stringify(e)));
});

Alloy.Globals.getTours = function() {
    return starter.tours;
};

Alloy.Globals.openWindow = function(win) {
    var leftSlide = Titanium.UI.createAnimation();
    leftSlide.left = 0;
    leftSlide.duration = 300;
    win.applyProperties({
        left: Titanium.Platform.displayCaps.platformWidth
    });
    win.open(leftSlide);
};

Alloy.Globals.closeWindow = function(win) {
    var rightSlide = Titanium.UI.createAnimation();
    rightSlide.left = Titanium.Platform.displayCaps.platformWidth;
    rightSlide.duration = 300;
    win.close(rightSlide);
};

Alloy.createController("index");