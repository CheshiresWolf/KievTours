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
    this.isBuyed = 0 !== tourPrice ? false : true;
    this.isDownloaded = false;
}

function getPhoto(id, index) {
    Cloud.Photos.query({
        where: {
            tags_array: id
        }
    }, function(e) {
        if (e.success) {
            tours[index].background = e.photos[0].urls.original;
            Ti.API.info("IMAGE SET to " + index);
            starter();
        } else alert("Error: " + (e.error && e.message || JSON.stringify(e)));
    });
}

function getAudio(id, index) {
    Cloud.Files.query({
        where: {
            id: id
        }
    }, function(e) {
        if (e.success) {
            tours[index].songPath = e.files[0].url;
            Ti.API.info("FILE SET to " + index);
            starter();
        } else alert("Error: " + (e.error && e.message || JSON.stringify(e)));
    });
}

function starter() {
    counter--;
    if (0 >= counter) {
        var index = Alloy.createController("index");
        var tourViewProcedures = require("lib/tourViewProcedures");
        tourViewProcedures.initTourViews(index);
    }
}

function addTour(tour, index) {
    var bufTour = new Tour(tour.photo.urls.original, tour.name, tour.text, tour.audio_size, tour.audio_length, null, tour.price, null);
    getPhoto(tour.id, index);
    getAudio(tour.audio_id, index);
    tours.push(bufTour);
}

var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Ti.API.info("alloy.js start");

var Cloud = require("ti.cloud");

var tours = [], i = 0, counter = 0;

Cloud.debug = true;

Tour.prototype.buy = function() {
    this.isBuyed = true;
};

Tour.prototype.download = function() {
    this.isDownloaded = true;
};

Cloud.Users.login({
    login: "guest@gmail.com",
    password: "12345"
}, function(e) {
    e.success ? Cloud.Objects.query({
        classname: "Tour"
    }, function(ee) {
        if (ee.success) {
            counter = 2 * ee.Tour.length;
            for (i = 0; ee.Tour.length > i; i++) addTour(ee.Tour[i], i);
        } else alert("Error: " + (ee.error && ee.message || JSON.stringify(ee)));
    }) : alert("Login Error: " + (e.error && e.message || JSON.stringify(e)));
});

Alloy.Globals.getTours = function() {
    return tours;
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