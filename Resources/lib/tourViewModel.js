var bigImgSize = .9 * Titanium.Platform.displayCaps.platformWidth;

var leftOffset = (Titanium.Platform.displayCaps.platformWidth - bigImgSize) / 2;

var topOffset = Titanium.Platform.displayCaps.platformHeight / 2 - bigImgSize / 2;

var textWidth;

var buttonImgPath;

var smallImgSize = bigImgSize / 3;

var bigImageStyle = {
    width: bigImgSize,
    height: bigImgSize,
    left: leftOffset,
    top: topOffset,
    zIndex: 3
};

var smallImageStyle = {
    width: smallImgSize,
    height: smallImgSize,
    left: Titanium.Platform.displayCaps.platformWidth - (leftOffset + smallImgSize),
    top: topOffset - smallImgSize / 2,
    zIndex: 5
};

Alloy.Globals.smallImageStyle = smallImageStyle;

Alloy.Globals.bigImageStyle = bigImageStyle;

exports.makeTourView = function(tour) {
    var controller = Alloy.createController("tourView");
    controller.getView("bigPicture").applyProperties(bigImageStyle);
    smallImageStyle.image = tour.img;
    controller.getView("smallPicture").applyProperties(smallImageStyle);
    controller.getView("background").applyProperties({
        image: tour.background
    });
    controller.getView("title").text = tour.title;
    textWidth = controller.getView("title").toImage().width;
    textWidth > 7 * bigImgSize / 10 && (textWidth = .7 * bigImgSize);
    controller.getView("title").applyProperties({
        top: bigImgSize / 6,
        width: textWidth
    });
    controller.getView("text").text = tour.text;
    textWidth = controller.getView("text").toImage().width;
    textWidth > 8 * bigImgSize / 10 && (textWidth = .8 * bigImgSize);
    controller.getView("text").applyProperties({
        top: bigImgSize / 6 + 10 + controller.getView("title").toImage().height,
        width: textWidth
    });
    buttonImgPath = 0 !== tour.price ? "images/Buy_Button.png" : tour.isDownloaded ? "images/Play_Button.png" : "images/Download_Button.png";
    controller.getView("button").applyProperties({
        width: 92,
        height: 25,
        bottom: 10,
        left: bigImgSize / 2 - 46,
        image: buttonImgPath
    });
    return controller.getView();
};