var model = Ti.include("model/tourViewModel.js");

function swap() {
	tours[i].controller.getView("smallPicture").animate(model.bigImageStyle);
	
	tours[i].controller.getView("bigPicture").animate(model.smallImageStyle);
}