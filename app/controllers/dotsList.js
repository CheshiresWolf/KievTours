$.backButton.addEventListener("click", function() {
	Alloy.Globals.closeWindow();
});

function createRow(flag, dot, i, distance, currentI) {
	
	var row = Titanium.UI.createTableViewRow({hasChild: true, height: 40});
	
	var img = "images/dotsList/TableKmBlock_center.png";
	if (i === 0) {
		img = "images/dotsList/TableKmBlock_top.png";
	} 
	if (flag) {
		img = "images/dotsList/TableKmBlock_bottom.png";
	}
	
	var kmBlock =  Titanium.UI.createImageView({
		image: img,
		width: 40,
		height: 40,
		left: 4,
		top: 0
	});
	row.add(kmBlock);
	
	var distanceLabel = Titanium.UI.createLabel({
		text: distance.toFixed(2) + " km",
		left: 11,
		width: 28,
		height: 30,
		font: {
			fontSize: 8
		},
		textAlign: 'center',
		zIndex: 4
	});
	row.add(distanceLabel);
	
	var numberImg = "images/dotsList/TableNumber_off.png";
	if (i === currentI) numberImg = "images/dotsList/TableNumber_on.png";
	var dotNumber =  Titanium.UI.createImageView({
		image: numberImg,
		width: 20,
		height: 20,
		left: 50,
		top: 10
	});
	row.add(dotNumber);
	
	var dotNameLabel = Titanium.UI.createLabel({
		text: i,
		color: "white",
		font: {
			fontSize: 8
		},
		width: 20,
		height: 20,
		left: 50,
		top: 10,
		textAlign: 'center'
	});
	row.add(dotNameLabel);
	
	var dotName = Titanium.UI.createLabel({
		text: dot.name,
		font: {
			fontSize: 8
		},
		left: 80,
		width: 'auto',
		height: 20,
		textAlign: 'left',
		zIndex: 4
	});
	row.add(dotName);
	
	return row;
}

function toRad(grad) {
	return Math.PI * grad / 180;
}

//in google we trust
function distance(dotA, dotB) {
   
    var R = 6371; //Earth radius
    var latA = toRad(dotA.latitude), latB = toRad(dotB.latitude);
    var lonA = toRad(dotA.longitude), lonB = toRad(dotB.longitude);
    var x = (lonB - lonA) * Math.cos((latA + latB) / 2);
	var y = (latB - latA);
    
    return Math.acos(
	    	Math.sin(latA) * Math.sin(latB) +
	    	Math.cos(latA) * Math.cos(latB) *
	    	Math.cos(lonB - lonA)
    	) * R;
}


exports.fillTable = function(dots, userPosition, index, title) {
	var tableData = [], flag = false;
	
	$.title.text = title;
	
	for (var i = 0; i < dots.length; i++) {
		if (i === dots.length - 1) {
			flag = true;
		}
		
		tableData.push( createRow(flag, dots[i], i, distance(userPosition, dots[i]), index) );
	}
	
	$.table.data = tableData;
};
