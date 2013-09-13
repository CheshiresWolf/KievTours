var bigImgSize = Titanium.Platform.displayCaps.platformWidth * (18 / 20); //90% of screen size
var leftOffset = (Titanium.Platform.displayCaps.platformWidth - bigImgSize) / 2; //5%
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
	top: topOffset - smallImgSize / 2
};

Alloy.Globals.smallImageStyle = smallImageStyle;
Alloy.Globals.bigImageStyle = bigImageStyle;

exports.showTours = function(scrollView) {
	//Read data about tours and create views
	for (i = 0; i < tours.length; i++) {
		//===========================================
		//Ti.API.info("index.js loop");
		//===========================================
		
		tours[i].controller = Alloy.createController("tourView");
		
		//bigPicture
		tours[i].controller.getView("bigPicture").applyProperties(bigImageStyle);
		
		//smallPicture
		smallImageStyle.image = tours[i].img;
		tours[i].controller.getView("smallPicture").applyProperties(smallImageStyle);
		
		//background
		tours[i].controller.getView("background").applyProperties({image: tours[i].background});
		
		//title
		tours[i].controller.getView("title").text = tours[i].title;
		
		textWidth = tours[i].controller.getView("title").toImage().width;
		if (textWidth > (bigImgSize * 7 / 10)) {
			textWidth = bigImgSize * (7 / 10);
		}
	
		tours[i].controller.getView("title").applyProperties({
			top: bigImgSize / 6,
			width: textWidth
		});
		
		//text
		tours[i].controller.getView("text").text = tours[i].text;
		
		textWidth = tours[i].controller.getView("text").toImage().width;
		if (textWidth > (bigImgSize * 8 / 10)) {
			textWidth = bigImgSize * (8 / 10);
		}
	
		tours[i].controller.getView("text").applyProperties({
			top: bigImgSize / 6 + 10 + tours[i].controller.getView("title").toImage().height,
			width: textWidth
		});
		
		//button
		if (tours[i].price != 0) {
			buttonImgPath = "images/Buy_Button.png";
		} else {
			if (tours[i].isDownloaded) {
				buttonImgPath = "images/Play_Button.png";
			} else {
				buttonImgPath = "images/Download_Button.png";
			}
		}
		tours[i].controller.getView("button").applyProperties({
			width: 92,
			height: 25,
			bottom: 10,
			left: bigImgSize / 2 - 46,
			image: buttonImgPath
		});
		
		//show View
		scrollView.addView(tours[i].controller.getView());
	}
};