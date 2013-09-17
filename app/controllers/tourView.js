var swapDirection = false; // big to small

$.smallPicture.addEventListener("click", function(e) {
	if (!swapDirection) {
		$.bigPicture.animate(Alloy.Globals.smallImageStyle);
		$.tourContent.setVisible(false);
		$.smallPicture.animate(Alloy.Globals.bigImageStyle);
		swapDirection = true;
	}
});

$.bigPicture.addEventListener("click", function(e) {
	if (swapDirection) {
		$.bigPicture.animate(Alloy.Globals.bigImageStyle);
		$.tourContent.setVisible(true);
		$.smallPicture.animate(Alloy.Globals.smallImageStyle);
		swapDirection = false;
	}
});
