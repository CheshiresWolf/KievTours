var insideTourProcedures = require("lib/insideTourProcedures");
//var swapDirection = false; // false - swap small with big

Ti.API.info("dotView.js");

$.bigPicture.addEventListener("click", function(e) {
	playerShow(false);
	$.smallPicturePhoto.animate(insideTourProcedures.getSmallImagePhotoStyle());
	$.smallPictureAudio.animate(insideTourProcedures.getSmallImageAudioStyle());
	$.bigPicture.animate(insideTourProcedures.getBigImageStyle(), function() {
		bigPictureShow(true);
		insideTourProcedures.centering($.map);
	});
});

$.smallPicturePhoto.addEventListener("click", function(e) {
	
	bigPictureShow(false);
	playerShow(false);
	$.bigPicture.animate(insideTourProcedures.getSmallImagePhotoStyle());
	$.smallPicturePhoto.animate(insideTourProcedures.getBigImageStyle());
	$.smallPictureAudio.animate(insideTourProcedures.getSmallImageAudioStyle());
});

$.smallPictureAudio.addEventListener("click", function(e) {
	bigPictureShow(false);
	$.bigPicture.animate(insideTourProcedures.getSmallImageAudioStyle());
	$.smallPicturePhoto.animate(insideTourProcedures.getSmallImagePhotoStyle());
	$.smallPictureAudio.animate(insideTourProcedures.getBigImageStyle(), function() {
		playerShow(true);
	});
});

$.smallPictureList.addEventListener("click", function(e) {
	var list = Alloy.createController("dotsList");
	list.fillTable(insideTourProcedures.getDots());
	list.getView().open();
});

$.smallPictureCenter.addEventListener("click", function(e) {
	$.smallPicturePhoto.animate(insideTourProcedures.getSmallImagePhotoStyle());
	$.smallPictureAudio.animate(insideTourProcedures.getSmallImageAudioStyle(), function() {	
		playerShow(false);
	});
	$.bigPicture.animate(insideTourProcedures.getBigImageStyle(), function() {	
		bigPictureShow(true);
		insideTourProcedures.centering($.map);
	});
});

function bigPictureShow(flag) {
	var img = "";
	
	if (!flag) img = "images/SmallSircleMap.png";
	
	$.bigPicture.applyProperties({backgroundImage: img});
	$.mapMask.setVisible(flag);
	$.map.setVisible(flag);
}

function playerShow(flag) {
	var img = "images/dotsView/audioBackground.png";
	
	if (!flag) img = "images/dotsView/SmallPictureAudio.png";
	
	$.smallPictureAudio.applyProperties({backgroundImage: img});
	$.player.setVisible(flag);
}