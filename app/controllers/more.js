$.backButton.addEventListener("click", function() {
	Alloy.Globals.closeWindow();
});

function createRow(img, text) {
	var row = Titanium.UI.createTableViewRow({hasChild: true, height: 40});
	
	var icon =  Titanium.UI.createImageView({
		image: img,
		width: 20,
		height: 20,
		left: 10,
		top: 10
	});
	row.add(icon);
	
	var name = Titanium.UI.createLabel({
		text: text,
		font: {
			fontSize: 10,
			fontWeight: 'bold' 
		},
		left: 40,
		width: 'auto',
		height: 20,
		textAlign: 'left',
		zIndex: 4
	});
	row.add(name);
	
	return row;
}

exports.fillTable = function() {
	var tableData = [];
	
	tableData.push(createRow("images/more/_settings.png", "Settings"));
	tableData.push(createRow("images/more/_languages.png", "Languages"));
	tableData.push(createRow("images/more/_about.png", "About application"));
	tableData.push(createRow("images/more/_contact.png", "Contact us"));
	tableData.push(createRow("images/more/_feed.png", "Feedback"));
	tableData.push(createRow("images/more/_social.png", "Social networks"));
	
	$.table.data = tableData;
};