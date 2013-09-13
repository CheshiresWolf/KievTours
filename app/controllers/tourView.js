
$.smallPicture.addEventListener("click", function(e) {
	Ti.API.info("swapped");
	
	$.bigPicture.animate(Alloy.Globals.smallImageStyle);
	$.bigPicture.removeAllChildren();
	$.smallPicture.animate(Alloy.Globals.bigImageStyle);
});
