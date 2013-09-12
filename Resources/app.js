function tour() {}

var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

tour.prototype.set = function(img, title, text, size, dots, length, background) {
    this.img = img;
    this.title = title;
    this.text = text;
    this.size = size;
    this.dots = dots;
    this.length = length;
    this.background = background;
};

var tours = [];

var tour1 = new tour();

tour1.set("images/SmallSircle.png", "O_o", "Run FULS!", 125, null, "2:10", "images/APP_Kiev_background.png");

tours.push(tour1);

var tour2 = new tour();

tour2.set("images/SmallSircleBuf.png", "O_o", "Abir Abi rWald ffffffff fffffff fffff ffff fffffff", 125, null, "2:10", "images/APP_Kiev_background_Buf.png");

tours.push(tour2);

Alloy.Globals.getTours = function() {
    return tours;
};

Alloy.createController("index").getView().open();

Alloy.createController("index");