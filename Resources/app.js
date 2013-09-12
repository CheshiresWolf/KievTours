function load() {
    tours.add(new tour.set("images/APP_Kiev_logo.png", "O_o", "Run FULS!", 125, 31, "2:10"));
}

var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

var tour = {
    img: "",
    title: "",
    text: "",
    size: 0,
    dots: {},
    length: 0
};

tour.set = function(img, title, text, size, dots, length) {
    this.img = img;
    this.title = title;
    this.text = text;
    this.size = size;
    this.dots = dots;
    this.length = length;
};

var tours = [];

Alloy.Globals.getTours = function() {
    return tours;
};

Alloy.createController("index").getView().open();

Alloy.createController("index");