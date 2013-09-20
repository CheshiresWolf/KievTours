var insideTourProcedures = require("lib/insideTourProcedures");
//var swapDirection = false; // false - swap small with big

Ti.API.info("dotView.js");

$.bigPicture.addEventListener("click", function(e) {
	//Ti.API.info("bigPicture click 0");
	//if (swapDirection) {
		//Ti.API.info("bigPicture click 1");
		$.bigPicture.animate(insideTourProcedures.getBigImageStyle());
		$.smallPicturePhoto.animate(insideTourProcedures.getSmallImagePhotoStyle());
		$.smallPictureAudio.animate(insideTourProcedures.getSmallImageAudioStyle());
		$.bigPicture.applyProperties({image: "images/BigSircle.png"});
	//}
});

$.smallPicturePhoto.addEventListener("click", function(e) {
	//Ti.API.info("smallPicturePhoto click 0");
	//if (!swapDirection) {
		//Ti.API.info("smallPicturePhoto click 1");
		$.bigPicture.animate(insideTourProcedures.getSmallImagePhotoStyle());
		$.smallPicturePhoto.animate(insideTourProcedures.getBigImageStyle());
		$.smallPictureAudio.animate(insideTourProcedures.getSmallImageAudioStyle());
		$.bigPicture.applyProperties({image: "images/SmallSircleMap.png"});
		//swapDirection = true;
	//}
});

$.smallPictureAudio.addEventListener("click", function(e) {
	$.bigPicture.animate(insideTourProcedures.getSmallImageAudioStyle());
	$.smallPicturePhoto.animate(insideTourProcedures.getSmallImagePhotoStyle());
	$.smallPictureAudio.animate(insideTourProcedures.getBigImageStyle());
	$.bigPicture.applyProperties({image: "images/SmallSircleMap.png"});
});


