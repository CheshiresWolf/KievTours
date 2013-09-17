var bigImgSize = Titanium.Platform.displayCaps.platformWidth * (18 / 20); //90% of screen size
var leftOffset = (Titanium.Platform.displayCaps.platformWidth - bigImgSize) / 2; //5%
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
	//Read data about tours and create views
	//for (i = 0; i < tours.length; i++) {
		//===========================================
		//Ti.API.info("index.js loop");
		//===========================================
		
		var controller = Alloy.createController("tourView");
		
		//bigPicture
		controller.getView("bigPicture").applyProperties(bigImageStyle);
		
		//smallPicture
		smallImageStyle.image = tour.img;
		controller.getView("smallPicture").applyProperties(smallImageStyle);
		
		//background
		controller.getView("background").applyProperties({image: tour.background});
		
		//title
		controller.getView("title").text = tour.title;
		
		textWidth = controller.getView("title").toImage().width;
		if (textWidth > (bigImgSize * 7 / 10)) {
			textWidth = bigImgSize * (7 / 10);
		}
	
		controller.getView("title").applyProperties({
			top: bigImgSize / 6,
			width: textWidth
		});
		
		//text
		controller.getView("text").text = tour.text;
		
		textWidth = controller.getView("text").toImage().width;
		if (textWidth > (bigImgSize * 8 / 10)) {
			textWidth = bigImgSize * (8 / 10);
		}
	
		controller.getView("text").applyProperties({
			top: bigImgSize / 6 + 10 + controller.getView("title").toImage().height,
			width: textWidth
		});
		
		//button
		if (tour.price !== 0) {
			buttonImgPath = "images/Buy_Button.png";
		} else {
			if (tour.isDownloaded) {
				buttonImgPath = "images/Play_Button.png";
			} else {
				buttonImgPath = "images/Download_Button.png";
			}
		}
		controller.getView("button").applyProperties({
			width: 92,
			height: 25,
			bottom: 10,
			left: bigImgSize / 2 - 46,
			image: buttonImgPath
		});
		
		//show View
		return controller.getView();
	//}
};