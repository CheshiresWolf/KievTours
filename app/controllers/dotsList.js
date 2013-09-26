$.backButton.addEventListener("click", function() {
	$.window.close();
});

function createRow(i, dot) {
	var row = Titanium.UI.createTableViewRow({hasChild: true, height: 40});
	
	var img = "images/dotsList/TableKmBlock_center.png";
	if (i === 0) {
		img = "images/dotsList/TableKmBlock_top.png";
	} else if (i === -1) {
		img = "images/dotsList/TableKmBlock_bottom.png";
	}
	
	var kmBlock =  Titanium.UI.createImageView({
		image: img,
		width: 20,
		height: 40,
		left: 4,
		top: 0
	});
	row.add(kmBlock);
	
	var distance = Titanium.UI.createLabel({
		text: "0.1 km",
		top: 10,
		left: 4,
		width: 20,
		height: 20,
		font: {
			fontSize: 8
		},
		textAlign: 'left',
		zIndex: 4
	});
	row.add(distance);
	
	var dotNumber =  Titanium.UI.createImageView({
		image: "images/dotsList/TableNumber_off.png",
		width: 20,
		height: 20,
		left: 30,
		top: 10
	});
	row.add(dotNumber);
	
	var dotName = Titanium.UI.createLabel({
		text: dot.name,
		font: {
			fontSize: 8
		},
		width: 'auto',
		textAlign: 'left',
		left: 60,
		height: 20
	});
	row.add(dotName);
	
	return row;
}

exports.fillTable = function(dots) {
	var tableData = [], flag = 0;
	
	for (var i = 0; i < dots.length; i++) {
		if (i === dots.length - 1) {
			flag = -1;
		} else {
			flag = i;
		}
		
		tableData.push(createRow(flag, dots[i]));
	}
	
	$.table.data = tableData;
};
