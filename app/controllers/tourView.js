var tourProcedures = require("lib/tourViewProcedures");
var swapDirection = false; // false - swap small with big

$.smallPicture.addEventListener("click", function(e) {
	if (!swapDirection) {
		$.tourContent.setVisible(false);
		$.bigPicture.animate(tourProcedures.getSmallImageStyle());
		$.smallPicture.animate(tourProcedures.getBigImageStyle());
		$.bigPicture.applyProperties({image: "images/SmallSircleInfo.png"});
		swapDirection = true;
	}
});

$.bigPicture.addEventListener("click", function(e) {
	if (swapDirection) {
		$.bigPicture.applyProperties({image: "images/BigSircle.png"});
		$.bigPicture.animate(tourProcedures.getBigImageStyle());
		$.smallPicture.animate(tourProcedures.getSmallImageStyle());
		$.tourContent.setVisible(true);
		swapDirection = false;
	}
});
