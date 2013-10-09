var textWidth = Titanium.Platform.displayCaps.platformWidth - 30;

$.backButton.addEventListener("click", function() {
	Alloy.Globals.closeWindow();
});

function createTextBlock(title, text, view) {
	
	var titleLabel = Ti.UI.createLabel({
		text: title,
		width: textWidth,
		font: {
	        fontSize: '10dp',
			fontWeight: 'bold'   
	    }
	});
	
	var textLabel = Ti.UI.createLabel({
		text: text,
		width: textWidth,
		font: {
	        fontSize: '10dp'  
	    }
	});
	
	var space = Ti.UI.createLabel({
		text: "        ",
		width: textWidth
	});
	
	view.add(titleLabel);
	view.add(textLabel);
	view.add(space);
	
	//return view;
}

exports.init = function(tip) {
	var i = 0;
	
	$.title.text = tip.short_title;
	$.textContainer.applyProperties({width: textWidth});
	
	for (i; i < tip.titles.length; i++) {
		createTextBlock(tip.titles[i], tip.texts[i], $.textContainer);
	}
};
