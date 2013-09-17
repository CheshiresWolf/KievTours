function Tour() {}

var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Ti.API.info("alloy.js start");

Tour.prototype.set = function(img, title, text, size, dots, length, background, price) {
    this.img = img;
    this.title = title;
    this.text = text;
    this.size = size;
    this.dots = dots;
    this.length = length;
    this.background = background;
    this.price = price;
};

Tour.prototype.download = function() {
    this.isDownloaded = true;
};

var tours = [];

var tour1 = new Tour();

tour1.set("images/SmallSircle.png", "1", "Run FULS!", 125, null, "2:10", "images/APP_Kiev_background.png", 9.99);

tours.push(tour1);

var tour2 = new Tour();

tour2.set("images/SmallSircleBuf.png", "2", "Abir Abi rWald ffffffff fffffff fffff ffff fffffff", 125, null, "2:10", "images/APP_Kiev_background_Buf.png", 0);

tour2.download();

tours.push(tour2);

var tour3 = new Tour();

tour3.set("images/SmallSircle.png", "3", "Run FULS!", 125, null, "2:10", "images/APP_Kiev_background.png", 9.99);

tours.push(tour3);

var tour4 = new Tour();

tour4.set("images/SmallSircle.png", "4", "Run FULS!", 125, null, "2:10", "images/APP_Kiev_background.png", 9.99);

tours.push(tour4);

Alloy.Globals.getTours = function() {
    return tours;
};

Alloy.createController("index").getView().open();

Alloy.createController("index");