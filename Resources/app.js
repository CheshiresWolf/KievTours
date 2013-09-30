function Tour(tourImage, tourTitle, tourText, fileSize, tourDots, timeLength, backgroundImage, tourPrice, songPath) {
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

var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Ti.API.info("alloy.js start");

Tour.prototype.buy = function() {
    this.isBuyed = true;
};

Tour.prototype.download = function() {
    this.isDownloaded = true;
};

var tours = [];

var gallery = [];

gallery.push("bufTour/bufGallery/SmallSircleBuf.png");

gallery.push("bufTour/bufGallery/SmallSircleBuf2.png");

gallery.push("bufTour/bufGallery/SmallSircleBuf3.png");

gallery.push("bufTour/bufGallery/SmallSircleBuf4.png");

var buf = new Tour("images/SmallSircle.png", "Жемчужины Печерска", "Полное описание тура к Югу от Киева, между притоками Днепра, рек Коник и Вита, расположен Жуков остров. Вы увидите то, что осталось от когда-то секретного обьекта.", 125, null, "2:10", "images/APP_Kiev_background.png", 9.99, "bufTour/song.mp3");

buf.dots.push({
    name: "Особняк по ул. Шелковичная 19",
    gallery: gallery,
    latitude: 50.4635,
    longitude: 30.3718
});

buf.dots.push({
    name: "Мост благородных девиц",
    gallery: gallery,
    latitude: 50.466,
    longitude: 30.3718
});

buf.dots.push({
    name: "Мариинский парк и его достопримечательности",
    gallery: gallery,
    latitude: 50.47,
    longitude: 30.3718
});

buf.dots.push({
    name: "Пряничный домик",
    gallery: gallery,
    latitude: 50.46,
    longitude: 30.3718
});

tours.push(buf);

tours.push(new Tour("images/SmallSircle.png", "Жемчужины Печерска", "Полное описание тура к Югу от Киева, между притоками Днепра, рек Коник и Вита, расположен Жуков остров. Вы увидите то, что осталось от когда-то секретного обьекта.", 125, null, "2:10", "images/APP_Kiev_background.png", 9.99, "bufTour/song.mp3"));

Alloy.Globals.getTours = function() {
    return tours;
};

var index = Alloy.createController("index");

var tourViewProcedures = require("lib/tourViewProcedures");

tourViewProcedures.initTourViews(index);

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