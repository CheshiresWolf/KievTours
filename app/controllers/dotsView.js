var insideTourProcedures = require("lib/insideTourProcedures");
//var swapDirection = false; // false - swap small with big

Ti.API.info("dotView.js");

$.bigPicture.addEventListener("click", function(e) {
	$.bigPicture.animate(insideTourProcedures.getBigImageStyle());
	$.smallPicturePhoto.animate(insideTourProcedures.getSmallImagePhotoStyle());
	$.smallPictureAudio.animate(insideTourProcedures.getSmallImageAudioStyle());
	$.bigPicture.applyProperties({image: "images/Map.png"});
});

$.smallPicturePhoto.addEventListener("click", function(e) {
	$.bigPicture.animate(insideTourProcedures.getSmallImagePhotoStyle());
	$.smallPicturePhoto.animate(insideTourProcedures.getBigImageStyle());
	$.smallPictureAudio.animate(insideTourProcedures.getSmallImageAudioStyle());
	$.bigPicture.applyProperties({image: "images/SmallSircleMap.png"});
});

$.smallPictureAudio.addEventListener("click", function(e) {
	$.bigPicture.animate(insideTourProcedures.getSmallImageAudioStyle());
	$.smallPicturePhoto.animate(insideTourProcedures.getSmallImagePhotoStyle());
	$.smallPictureAudio.animate(insideTourProcedures.getBigImageStyle());
	$.bigPicture.applyProperties({image: "images/SmallSircleMap.png"});
});

$.smallPictureList.addEventListener("click", function(e) {
	var list = Alloy.createController("dotsList");
	list.getView().open();
});

$.smallPictureCenter.addEventListener("click", function(e) {
	$.bigPicture.animate(insideTourProcedures.getBigImageStyle());
	$.smallPicturePhoto.animate(insideTourProcedures.getSmallImagePhotoStyle());
	$.smallPictureAudio.animate(insideTourProcedures.getSmallImageAudioStyle());
	$.bigPicture.applyProperties({image: "images/Map.png"});
});


