function Tour(tourImage, tourTitle, tourText, fileSize, tourDots, timeLength, backgroundImage, tourPrice) {
    this.img = tourImage;
    this.title = tourTitle;
    this.text = tourText;
    this.size = fileSize;
    this.dots = {};
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

tours.push(new Tour("images/SmallSircle.png", "1", "Run FULS!", 125, null, "2:10", "images/APP_Kiev_background.png", 9.99));

var tourBuf = new Tour("images/SmallSircleBuf.png", "TWO TwO tWo two 2", "Abir Abi rWald ffffffff fffffff fffff ffff fffffff asjdfk adjhfasbv bcbvb fbvusybv vjbsnc chvs jvb", 111, null, "0:15", "images/APP_Kiev_background_Buf.png", 5);

tourBuf.download();

tours.push(tourBuf);

tours.push(new Tour("images/SmallSircle.png", "3", "Run FULS!", 125, null, "2:10", "images/APP_Kiev_background.png", 9.99));

tours.push(new Tour("images/SmallSircle.png", "4", "Run FULS!", 95, null, "2:10", "images/APP_Kiev_background.png", 9.99));

Alloy.Globals.getTours = function() {
    return tours;
};

Alloy.createController("index").getView().open();

Alloy.createController("index");