var Cloud = require("ti.cloud");

var width = Titanium.Platform.displayCaps.platformWidth, currentPlace;

$.backButton.addEventListener("click", function() {
	Alloy.Globals.closeWindow();
});

$.table.addEventListener("click", function(e) {
	
	//Is this a parent cell?
	if (e.row.isparent) {
		var i;
		//Is it opened?
		if (e.row.opened) {
			e.row.openIco.image = "images/discover/discover_menu_close.png";
			for(i = e.row.sub.length; i > 0; i = i - 1) {
				$.table.deleteRow(e.index + i);
			}
			e.row.opened = false;
		} else {
			//Add teh children.
			var currentIndex = e.index;
			e.row.openIco.image = "images/discover/discover_menu_open.png";
			for (i = 0; i < e.row.sub.length; i++) {
				$.table.insertRowAfter(currentIndex, e.row.sub[i]);
				currentIndex++;
			}
			e.row.opened = true;
		}
				
	}
			
});

function getText(text) {
	var res = "", i = 0;
	
	if (typeof text === 'string') {
		res = text;
	} else {		
		for (i; i < text.length; i++) {
			res += text[i] + " ";
		}
	}
	
	return res;
}

function createRow(img, text) {
	var row = Titanium.UI.createTableViewRow({isparent: true, opened: false, height: 30});
	
	var icon = Ti.UI.createImageView({
		image: img,
		left: 5,
		top: 5,
		width: 25,
		height: 20
	});
	row.add(icon);
	
	var title = Ti.UI.createLabel({
		text: text,
		left: 35,
		font: {
			fontSize: 15
		}
	});
	row.add(title);
	
	var openIco = Ti.UI.createImageView({
		image: "images/discover/discover_menu_close.png",
		right: 5,
		top: 10,
		width: 20,
		height: 10
	});
	row.add(openIco);
	row.openIco = openIco;
	
	return row;
}

function createMap() {
	var width = Titanium.Platform.displayCaps.platformWidth * 0.55;
	
	var row = Titanium.UI.createTableViewRow({height: width + 90});
	
	var topImg = Ti.UI.createImageView({
		image: currentPlace.photo.urls.original,
		top: 5,
		left: 5,
		width: width,
		height: width,
		zIndex: 5
	});
	row.add(topImg);
	
	var bottomImg = Ti.UI.createImageView({
		image: "images/dotsView/MapMask.png",
		top: 5,
		right: 5,
		width: width,
		height: width,
		zIndex: 4
	});
	row.add(bottomImg);
	
	var point = Ti.UI.createImageView({
		width: 35,
		height: 55,
		image: "images/dotsView/MapPin_on.png"
	});
	
	var annot = Titanium.Map.createAnnotation({
		title: 0,
		image: point.toImage(),
		latitude: currentPlace.latitude,
		longitude: currentPlace.longitude
	});
	
	var map = Titanium.Map.createView({
		mapType: Titanium.Map.STANDARD_TYPE,
		userLocation: false,
	    region: {
			latitude: currentPlace.latitude,
			longitude: currentPlace.longitude,
			latitudeDelta: 0.01,
			longitudeDelta: 0.01
	    },
	    annotations: [annot],
	    top: 5,
		right: 5,
		width: width,
		height: width,
		zIndex: 3
	});
	row.add(map);
	
	var button = Ti.UI.createImageView({
		image: "images/discover/discover_showTours.png",
		top: 10 + width,
		right: 5,
		width: width * 0.8,
		height: 40,
		zIndex: 4
	});
	row.add(button);
		
	var iconContainer = Ti.UI.createView({
		backgroundColor: "#dbdbdb",
		top: 55 + width,
		right: 7,
		width: width * 0.8 - 4,
		height: 30,
		borderRadius: 5,
		zIndex: 4
	});
	row.add(iconContainer);
	
	var rateIco = Titanium.UI.createImageView({
		image: "images/discover/icon_star.png",
		left: 10,
		width: 15,
		height: 15,
		zIndex: 4
	});
	iconContainer.add(rateIco);
	
	var rate = Titanium.UI.createLabel({
		text: "3",
		font: {
			fontSize: 10 
		},
		left: 30,
		width: 30,
		height: 20,
		textAlign: 'left',
		zIndex: 4
	});
	iconContainer.add(rate);
	
	var pathIco = Titanium.UI.createImageView({
		image: "images/discover/Discover_icon_path_green.png",
		width: 15,
		height: 15,
		zIndex: 4
	});
	iconContainer.add(pathIco);
	
	var roundPath = Alloy.Globals.getDistanceTo({latitude: currentPlace.latitude, longitude: currentPlace.longitude}).toFixed(2);
	
	var path = Titanium.UI.createLabel({
		text: roundPath + " km",
		font: {
			fontSize: 10 
		},
		left: (width * 0.8 - 4) / 2 + 15,
		width: 50,
		height: 20,
		textAlign: 'left',
		zIndex: 4
	});
	iconContainer.add(path);
	
	var textContainer = Ti.UI.createView({
		top: 10 + width,
		left: 7,
		width: width - 10,
		height: 80,
		zIndex: 4
	});
	row.add(textContainer);
	
	var address = Ti.UI.createLabel({
		text: currentPlace.address + ", " + currentPlace.city,
		font: {
			fontSize: 10 
		},
		top: 0,
		width: "auto",
		textAlign: 'center',
		zIndex: 4
	});
	textContainer.add(address);
	
	if (currentPlace.phone_number !== undefined) {
		var phone = Ti.UI.createLabel({
			text: currentPlace.phone_number,
			font: {
				fontSize: 10,
				fontWeight: 'bold'
			},
			top: 20,
			width: "auto",
			textAlign: 'center',
			zIndex: 4
		});
		textContainer.add(phone);
	}
	
	if (currentPlace.custom_fields.email !== undefined) {
		var email = Ti.UI.createLabel({
			text: "e-mail: " + currentPlace.custom_fields.email,
			font: {
				fontSize: 10
			},
			top: 40,
			width: "auto",
			textAlign: 'center',
			zIndex: 4
		});
		textContainer.add(email);
	}
	
	if (currentPlace.website !== undefined) {
		var site = Ti.UI.createLabel({
			text: currentPlace.website,
			font: {
				fontSize: 10
			},
			top: 60,
			width: "auto",
			textAlign: 'center',
			zIndex: 4
		});
		textContainer.add(site);
	}
	
	return row;
}

function createSummary() {
	var row = createRow("images/discover/discover_summary.png", "Summary");
	
	var subRow = Titanium.UI.createTableViewRow();
	
	var aA = Ti.UI.createImageView({
		image: "images/dotsView/Aa.png",
		width: 15,
		height: 10,
		top: 7,
		left: 10
	});
	subRow.add(aA);
	
	var text = Ti.UI.createLabel({
		text: getText(currentPlace.custom_fields.text),
		width: Titanium.Platform.displayCaps.platformWidth - 35,
		top: 5,
		left: 35,
		font: {
			fontSize: 10
		}
	});
	subRow.add(text);
	
	row.sub = [subRow];
	
	return row;
}

function createTime() {
	var row = createRow("images/discover/discover_time.png", "Working hours");
	
	var subRow = Titanium.UI.createTableViewRow({title: "O_o_O", height: 60});
	
	row.sub = [subRow];
	
	return row;
}

function createTicket() {
	var row = createRow("images/discover/discover_ticket.png", "Tickets");
	
	var subRow = Titanium.UI.createTableViewRow({title: "o_O_o", height: 60});
	
	row.sub = [subRow];
	
	return row;
}

function createRate(commentObj) {
	var row = createRow("images/discover/discover_rate.png", "Rate&Comment");
	var subRow = Titanium.UI.createTableViewRow({name: "rateAndComment"});
	var container = Titanium.UI.createView({width: (width - 20), top: 0, left: 10});
	var i = 0, topOffset = 0, commentsOffset = 0;
	
	//========================<Rate>=======================
	
	topOffset += 10;
	
	var rateContainer = Ti.UI.createView({
		top: topOffset,
		width: "auto",
		height: 20,
		layout: "horizontal"
	});
	
	var rateText = Ti.UI.createLabel({
		text: "Rate:   ",
		font: {
			fontSize: 14
		}
	});
	rateContainer.add(rateText);
	
	for (i; i < 5; i++) {
		rateContainer.add(
			Ti.UI.createImageView({
				image: "images/discover/icon_star_off.png",
				width: 20,
				height: 20
			})
		);
	}
	
	var rateNumbers = Ti.UI.createLabel({
		text: "   " + commentObj.rate + "(" + commentObj.rate_number + ")",
		font: {
			fontSize: 14
		}
	});
	rateContainer.add(rateNumbers);
	
	container.add(rateContainer);
	topOffset += 20;
	
	//========================<Comments>=======================
	
	topOffset += 20;
	
	i = 0;
	var splitBuf;
	for (i; i < commentObj.comments.length; i++) {
		
		splitBuf = commentObj.comments[i].split("|");
	
		container.add(Ti.UI.createLabel({
			text: splitBuf[0],
			top: topOffset,
			left: 0,
			font: {
				fontSize: 10,
				fontWeight: 'bold'
			}
		}));
		
		container.add(Ti.UI.createLabel({
			text: splitBuf[1],
			top: topOffset,
			right: 0,
			font: {
				fontSize: 10
			}
		}));
	
		topOffset += 20;
		
		var commentText = Ti.UI.createLabel({
			text: splitBuf[2],
			top: topOffset,
			left: 0,
			font: {
				fontSize: 14
			}
		});
		container.add(commentText);
		topOffset += commentText.toImage().height + 20;
	}
	
	commentsOffset = topOffset;
	
	//========================<Input>=======================	
	
	topOffset += 20;
	
	var inputWidth = width - 20;
	var inputContainer = Ti.UI.createView({top: topOffset, left: 0, height: 177});
	
	var inputUser = Ti.UI.createTextField({
		value: "Nickname",
		color: "gray",
		top: 0,
		//borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		borderRadius: 5,
		borderColor: "e1e1e1",
		width: inputWidth,
		height: 25
	});
	inputUser.hintText = inputUser.value;
 
	inputUser.addEventListener('focus', textFocus);
	inputUser.addEventListener('blur', textBlur);
	inputContainer.add(inputUser);
	
	topOffset += 26;
	
	var inputMail = Ti.UI.createTextField({
		value: "E-mail",
		color: "gray",
		top: 26,
		//borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		borderRadius: 5,
		borderColor: "e1e1e1",
		width: inputWidth,
		height: 25
	});
	inputMail.hintText = inputMail.value;
 
	inputMail.addEventListener('focus', textFocus);
	inputMail.addEventListener('blur', textBlur);
	inputContainer.add(inputMail);
	
	topOffset += 26;
	
	var inputComment = Ti.UI.createTextField({
		value: "Add comment",
		color: "gray",
		top: 52,
		//borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		borderRadius: 5,
		borderColor: "e1e1e1",
		width: inputWidth,
		height: 75
	});
	inputComment.hintText = inputComment.value;
 
	inputComment.addEventListener('focus', textFocus);
	inputComment.addEventListener('blur', textBlur);
	inputContainer.add(inputComment);
	
	topOffset += 85;
	
	//container.add(getSpace(20));
	
	var sendButton = Ti.UI.createButton({
		backgroundImage: "images/discover/Send_Button.png",
		top: 137,
		right: 0,
		width: 80,
		height: 30
	});
	sendButton.addEventListener('click', function(e) {
		//==========================================================================
		Ti.API.info('discoverMenuEntry| sendButton');
		//==========================================================================
		
		if (inputUser.value !== inputUser.hintText) {
			if (inputMail.value !== inputMail.hintText) {
				if (inputComment.value !== inputComment.hintText) {
					
					var date = new Date();
					var currentDate = date.getDay() + "." + date.getMonth() + "." + date.getFullYear();
					commentObj.comments.push(inputUser.value + "|" + currentDate + "|" + inputComment.value + "|" + inputMail.value);
					
					updateComment(commentObj);
					
					var commentText = Ti.UI.createLabel({
						text: inputComment.value,
						top: commentsOffset + 20,
						left: 0,
						font: {
							fontSize: 14
						}
					});
					var commentTextHeight = commentText.toImage().height + 40;
					topOffset += commentTextHeight;
					container.animate({height: container.height + commentTextHeight});
					
					inputContainer.animate({top: inputContainer.top + commentTextHeight});
					
					container.add(Ti.UI.createLabel({
						text: inputUser.value,
						top: commentsOffset,
						left: 0,
						font: {
							fontSize: 10,
							fontWeight: 'bold'
						}
					}));
					
					container.add(Ti.UI.createLabel({
						text: currentDate,
						top: commentsOffset,
						right: 0,
						font: {
							fontSize: 10
						}
					}));
					
					container.add(commentText);
					
					commentsOffset += commentTextHeight;
					
					inputComment.color = "gray";
					inputComment.value = inputComment.hintText;
					
					inputMail.color = "gray";
					inputMail.value = inputMail.hintText;
					
					inputUser.color = "gray";
					inputUser.value = inputUser.hintText;
					
				} else {
					inputComment.color = "red";
				}
			} else {
				inputMail.color = "red";
			}
		} else {
			inputUser.color = "red";
		}
	});
	inputContainer.add(sendButton);
	
	topOffset += 40;
	
	container.add(inputContainer);
	container.height = topOffset;
	subRow.add(container);
	
	row.sub = [subRow];
	
	return row;
}

function updateComment(commentObj) {
	Cloud.Objects.update({
	    classname: 'PlaceComments',
	    id: commentObj.id,
	    fields: {
	        comments: commentObj.comments
	    }
	}, function (e) {
	    if (e.success) {
			//==========================================================================
	        Ti.API.info("Comment to \'" + commentObj.place_name + "\' saved.");
			//==========================================================================
		} else {
			alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
	    }
	});
	
	Cloud.Places.update({
	    place_id: currentPlace.id,
	    custom_fields: {
			comments_number: commentObj.comments.length
	    }
	}, function (e) {
	    if (e.success) {
	        Ti.API.info('updateCloud.js| updatePlace');
	    } else {
	        alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
	    }
	});
}

function textFocus(e) {
	if (e.source.value === e.source.hintText) {
        e.source.value = "";
        e.source.color = "black";
    }
}

function textBlur(e) {
	if (e.source.value === "") {
        e.source.color = "gray";
        e.source.value = e.source.hintText;
    }
}

//some sort of magic
function createFooter() {
	return Titanium.UI.createTableViewRow({height: 300});
}

exports.fillTable = function(place, comments) {
	var tableData = [], i = 0;
	currentPlace = place;

	$.title.applyProperties({text: currentPlace.name, width: Titanium.Platform.displayCaps.platformWidth - 105});
	
	tableData.push(createMap());	
	tableData.push(createSummary());
	tableData.push(createTime());
	tableData.push(createTicket());
	tableData.push(createRate(comments));
	tableData.push(createFooter());
	
	$.table.data = tableData;
    
    var menu = Alloy.createController("menuView");
    
	$.window.add(menu.getView("menuListener"));
	$.window.add(menu.getView("menu"));
};