function tour() {}

var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

tour.prototype.set = function(img, title, text, size, dots, length) {
    this.img = img;
    this.title = title;
    this.text = text;
    this.size = size;
    this.dots = dots;
    this.length = length;
};

var tours = [];

var tour1 = new tour();

tour1.set("images/SmallSircle.png", "O_o", "Run FULS!", 125, null, "2:10");

tours.push(tour1);

Alloy.Globals.getTours = function() {
    return tours;
};

Alloy.createController("index").getView().open();

Alloy.createController("index");