function buyButtonEventListener(tour, view) {
    tour.buy();
    view.applyProperties({
        image: "images/tourView/Download_Button.png"
    });
    view.removeEventListener("click", function() {});
    view.addEventListener("click", function() {
        downloadButtonEventListener(tour, view);
    });
}

function downloadButtonEventListener(tour, view) {
    tour.download();
    view.applyProperties({
        image: "images/tourView/Play_Button.png"
    });
    view.removeEventListener("click", function() {});
    view.addEventListener("click", function() {
        playButtonEventListener();
    });
}

function playButtonEventListener() {
    if (!isInsideTourWindowOpen) {
        var newWindow = Alloy.createController("index");
        newWindow.getView("buttonTours").addEventListener("click", function() {
            newWindow.getView().close();
            isInsideTourWindowOpen = false;
        });
        insideTourProcedures.setData(newWindow, tours[currentPage]);
        insideTourProcedures.initDotsView();
        isInsideTourWindowOpen = true;
    }
}

function makeTourView(tour) {
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
    controller.getView("icons").applyProperties({
        top: 4 * bigImgSize / 6,
        left: bigImgSize / 2 - 90
    });
    controller.getView("sizeMb").text = tour.size;
    controller.getView("dotAmount").text = 31;
    controller.getView("time").text = tour.time;
    controller.getView("price").text = 0 === tour.price ? "FREE" : "$" + tour.price;
    var buttonView = controller.getView("button");
    buttonView.currentTour = tour;
    if (tour.isBuyed) if (tour.isDownloaded) {
        buttonImgPath = "images/tourView/Play_Button.png";
        buttonView.addEventListener("click", function() {
            playButtonEventListener();
        });
    } else {
        buttonImgPath = "images/tourView/Download_Button.png";
        buttonView.addEventListener("click", function() {
            downloadButtonEventListener(tour, buttonView);
        });
    } else {
        buttonImgPath = "images/tourView/Buy_Button.png";
        buttonView.addEventListener("click", function() {
            buyButtonEventListener(tour, buttonView);
        });
    }
    buttonView.applyProperties({
        left: bigImgSize / 2 - 46,
        image: buttonImgPath
    });
    return controller.getView();
}

var platformWidth = Titanium.Platform.displayCaps.platformWidth;

var bigImgSize = .9 * platformWidth;

var leftOffset = .05 * platformWidth;

var topOffset = (Titanium.Platform.displayCaps.platformHeight - bigImgSize) / 2;

var textWidth, buttonImgPath;

var smallImgSize = bigImgSize / 3;

var currentPage = 0;

var tours = Alloy.Globals.getTours();

var insideTourProcedures = require("lib/insideTourProcedures");

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
    left: platformWidth - (leftOffset + smallImgSize),
    top: topOffset - smallImgSize / 2,
    zIndex: 5
};

var isInsideTourWindowOpen = false;

exports.initTourViews = function(index) {
    var toursLength = tours.length, pagingArray = [], oldIndex = 0;
    var paging = index.getView("paging"), scrollView = index.getView("scrollView");
    for (var i = 0; toursLength > i; i++) {
        Ti.API.info("O_o");
        pagingArray.push(Ti.UI.createImageView({
            width: 5,
            height: 5,
            left: 10 * i,
            image: "images/Radio_bullets_off.png"
        }));
        paging.add(pagingArray[i]);
    }
    paging.applyProperties({
        bottom: 50,
        height: 5,
        width: 10 * pagingArray.length,
        zIndex: 4
    });
    pagingArray[0].applyProperties({
        image: "images/Radio_bullets_on.png"
    });
    scrollView.addEventListener("scrollend", function() {
        var newIndex = scrollView.getCurrentPage();
        if (oldIndex !== newIndex) {
            var children = scrollView.getViews(), loadedPages = [];
            if (newIndex > oldIndex) {
                currentPage++;
                loadedPages.push(children[oldIndex]);
                loadedPages.push(children[oldIndex + 1]);
                if (tours.length > currentPage + 1) {
                    loadedPages.push(makeTourView(tours[currentPage + 1]));
                    oldIndex = 1;
                }
                scrollView.setViews(loadedPages);
                scrollView.setCurrentPage(1);
                pagingArray[currentPage - 1].applyProperties({
                    image: "images/Radio_bullets_off.png"
                });
                pagingArray[currentPage].applyProperties({
                    image: "images/Radio_bullets_on.png"
                });
            } else {
                currentPage--;
                if (currentPage - 1 >= 0) {
                    loadedPages.push(makeTourView(tours[currentPage - 1]));
                    oldIndex = 1;
                } else oldIndex = 0;
                loadedPages.push(children[0]);
                loadedPages.push(children[1]);
                scrollView.setViews(loadedPages);
                scrollView.setCurrentPage(oldIndex);
                pagingArray[currentPage + 1].applyProperties({
                    image: "images/Radio_bullets_off.png"
                });
                pagingArray[currentPage].applyProperties({
                    image: "images/Radio_bullets_on.png"
                });
            }
        }
    });
    scrollView.addView(makeTourView(tours[0]));
    scrollView.addView(makeTourView(tours[1]));
};

exports.getBigImageStyle = function() {
    return bigImageStyle;
};

exports.getSmallImageStyle = function() {
    return smallImageStyle;
};