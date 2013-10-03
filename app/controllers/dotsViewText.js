var maxWidth = Titanium.Platform.displayCaps.platformWidth - 40;

exports.initText = function(dot) {
	$.dotNumber.text = dot.number;
	$.dotText.text = dot.text;
	
	var title = showTitleAndGetSize(dot.name);
	
	$.dotNumber.applyProperties({
		left: (Titanium.Platform.displayCaps.platformWidth - title.width) / 2 - 20
	});
	$.dotText.applyProperties({
		top: title.height + 10,
		width: maxWidth
	});
	$.Aa.applyProperties({
		top: title.height + 12
	});
};

function showTitleAndGetSize(text) {
	var globalHeight = 0, maxWidth = 0;
	
	var splitBuf = text.split(" "), bufNew = "", bufOld = "";
	var i = 0, splitLength = splitBuf.length;
	
	var bufLabel, approvedLabel;
	
	for (i; i < splitLength; i++) {
		if (i !== 0) bufNew += " ";
		
		bufNew += splitBuf[i];
		//bufLabel = Ti.UI.createLabel({text: bufNew});
		
		if (Ti.UI.createLabel({text: bufNew}).toImage().width > 280) {
			approvedLabel = Ti.UI.createLabel({
				text: bufOld,
				top: globalHeight,
				font: {
					fontSize: 13,
					fontWeight: 'bold'  
				}
			});
			$.container.add(approvedLabel);
			
			bufOld = "";
			bufNew = splitBuf[i];
			globalHeight += approvedLabel.toImage().height;
			
			if (approvedLabel.toImage().width > maxWidth) {
				maxWidth = approvedLabel.toImage().width;
			}
		} else {
			bufOld = bufNew;
		}

		if (i === splitLength - 1) {
			approvedLabel = Ti.UI.createLabel({
				text: bufNew,
				top: globalHeight,
				font: {
					fontSize: 13,
					fontWeight: 'bold'  
				}
			});
			$.container.add(approvedLabel);
			
			globalHeight += approvedLabel.toImage().height;
			
			if (approvedLabel.toImage().width > maxWidth) {
				maxWidth = approvedLabel.toImage().width;
			}
		}
	}
	
	return {height: globalHeight, width: maxWidth};
}