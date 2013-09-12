var bigImgSize = .9 * Titanium.Platform.displayCaps.platformWidth;

var leftOffset = (Titanium.Platform.displayCaps.platformWidth - bigImgSize) / 2;

var topOffset = Titanium.Platform.displayCaps.platformHeight / 2 - bigImgSize / 2;

var textWidth;

var buttonImgPath;

var smallImgSize = bigImgSize / 3;

var tours = Alloy.Globals.getTours();

var bigImageStyle = {
    width: bigImgSize,
    height: bigImgSize,
    left: leftOffset,
    top: topOffset
};

var smallImageStyle = {
    width: smallImgSize,
    height: smallImgSize,
    right: leftOffset,
    top: topOffset - smallImgSize / 2,
    image: tours[i].img
};

exports.showTours = function() {
    for (i = 0; tours.length > i; i++) {
        tours[i].controller = Alloy.createController("tourView");
        tours[i].controller.getView("bigPicture").applyProperties(bigImageStyle);
        tours[i].controller.getView("smallPicture").applyProperties(smallImageStyle);
        tours[i].controller.getView("background").applyProperties({
            image: tours[i].background
        });
        tours[i].controller.getView("title").text = tours[i].title;
        textWidth = tours[i].controller.getView("title").toImage().width;
        textWidth > 7 * bigImgSize / 10 && (textWidth = .7 * bigImgSize);
        tours[i].controller.getView("title").applyProperties({
            top: bigImgSize / 6,
            width: textWidth
        });
        tours[i].controller.getView("text").text = tours[i].text;
        textWidth = tours[i].controller.getView("text").toImage().width;
        textWidth > 8 * bigImgSize / 10 && (textWidth = .8 * bigImgSize);
        tours[i].controller.getView("text").applyProperties({
            top: bigImgSize / 6 + 10 + tours[i].controller.getView("title").toImage().height,
            width: textWidth
        });
        buttonImgPath = 0 != tours[i].price ? "images/Buy_Button.png" : tours[i].isDownloaded ? "images/Play_Button.png" : "images/Download_Button.png";
        tours[i].controller.getView("button").applyProperties({
            width: 92,
            height: 25,
            bottom: 10,
            left: bigImgSize / 2 - 46,
            image: buttonImgPath
        });
        $.scrollView.addView(tours[i].controller.getView());
    }
};