function Tour(tourImage, tourTitle, tourText, fileSize, tourDots, timeLength, backgroundImage, tourPrice) {
    this.img = tourImage;
    this.title = tourTitle;
    this.text = tourText;
    this.size = fileSize;
    this.dots = [ 1 ];
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

buf.dots.push(0);

buf.dots.push(0);

buf.dots.push(0);

buf.dots.push(0);

tours.push(buf);

tours.push(new Tour("images/SmallSircle.png", "Жемчужины Печерска", "Полное описание тура к Югу от Киева, между притоками Днепра, рек Коник и Вита, расположен Жуков остров. Вы увидите то, что осталось от когда-то секретного обьекта.", 125, null, "2:10", "images/APP_Kiev_background.png", 9.99));

tours.push(new Tour("images/SmallSircle.png", "Жемчужины Печерска", "Полное описание тура к Югу от Киева, между притоками Днепра, рек Коник и Вита, расположен Жуков остров. Вы увидите то, что осталось от когда-то секретного обьекта.", 95, null, "2:10", "images/APP_Kiev_background.png", 9.99));

Alloy.Globals.getTours = function() {
    return tours;
};

var index = Alloy.createController("index");

var tourViewProcedures = require("lib/tourViewProcedures");

index.getView().open();

tourViewProcedures.initTourViews(index);

Alloy.createController("index");