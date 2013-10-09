$.backButton.addEventListener("click", function() {
	Alloy.Globals.closeWindow();
});

function createRow(tip) {
	var row = Titanium.UI.createTableViewRow({hasChild: true, height: 40});
	
	var icon =  Titanium.UI.createImageView({
		image: tip.photo.urls.original,
		width: 20,
		height: 20,
		left: 10,
		top: 10
	});
	row.add(icon);
	
	var title = Titanium.UI.createLabel({
		text: tip.short_title,
		font: {
			fontSize: 10,
			fontWeight: 'bold' 
		},
		top: 0,
		left: 40,
		width: 'auto',
		height: 20,
		textAlign: 'left',
		zIndex: 4
	});
	row.add(title);
	
	var text = Titanium.UI.createLabel({
		text: tip.short_text,
		font: {
			fontSize: 10
		},
		top: 20,
		left: 40,
		width: 'auto',
		height: 20,
		textAlign: 'left',
		zIndex: 4
	});
	row.add(text);
	
	return row;
}

exports.init = function(tipsArray) {
	var i = 0, tableData = [];
	
	for (i; i < tipsArray.length; i++) {
		tableData.push(createRow(tipsArray[i]));
	}
	
	$.table.data = tableData;
	
	$.table.addEventListener("click", function(e) {
	    var sityTipsEntry = Alloy.createController("sityTipsEntry");
	    var menu = Alloy.createController("menuView");
	
		sityTipsEntry.getView("window").add(menu.getView("menuListener"));
		sityTipsEntry.getView("window").add(menu.getView("menu"));
	
	    sityTipsEntry.init(tipsArray[e.index]);
	    Alloy.Globals.openWindow(sityTipsEntry.getView());
	});
};
