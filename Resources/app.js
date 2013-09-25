function Tour(tourImage, tourTitle, tourText, fileSize, tourDots, timeLength, backgroundImage, tourPrice) {
    this.img = tourImage;
    this.title = tourTitle;
    this.text = tourText;
    this.size = fileSize;
    this.dots = [];
    this.time = timeLength;
    this.background = backgroundImage;
    this.price = tourPrice;
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

var buf = new Tour("images/SmallSircle.png", "Жемчужины Печерска", "Полное описание тура к Югу от Киева, между притоками Днепра, рек Коник и Вита, расположен Жуков остров. Вы увидите то, что осталось от когда-то секретного обьекта.", 125, null, "2:10", "images/APP_Kiev_background.png", 9.99);

buf.dots.push({
    name: "Особняк по ул. Шелковичная 19",
    latitude: 50.4635,
    longitude: 30.3718
});

buf.dots.push({
    name: "Мост благородных девиц",
    latitude: 50.466,
    longitude: 30.3718
});

buf.dots.push({
    name: "Мариинский парк и его достопримечательности",
    latitude: 50.47,
    longitude: 30.3718
});

buf.dots.push({
    name: "Пряничный домик",
    latitude: 50.46,
    longitude: 30.3718
});

tours.push(buf);

tours.push(new Tour("images/SmallSircle.png", "Жемчужины Печерска", "Полное описание тура к Югу от Киева, между притоками Днепра, рек Коник и Вита, расположен Жуков остров. Вы увидите то, что осталось от когда-то секретного обьекта.", 125, null, "2:10", "images/APP_Kiev_background.png", 9.99));

Alloy.Globals.getTours = function() {
    return tours;
};

var index = Alloy.createController("index");

var tourViewProcedures = require("lib/tourViewProcedures");

tourViewProcedures.initTourViews(index);

Alloy.createController("index");