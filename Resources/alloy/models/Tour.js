var tour = function(img, title, text, size, dots, length) {
    this.img = img;
    this.title = title;
    this.text = text;
    this.size = size;
    this.dots = dots;
    this.length = length;
};

var tours = [];

exports.load = function() {
    tours.add(new tour("images/APP_Kiev_logo.png", "O_o", "Run FULS!", 125, 31, "2:10"));
};

exports.tours = tours;

var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

model = Alloy.M("Tour", exports.definition, []);

collection = Alloy.C("Tour", exports.definition, model);

exports.Model = model;

exports.Collection = collection;