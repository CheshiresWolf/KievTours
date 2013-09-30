exports.initText = function(dot) {
	$.dotNumber.applyProperties({left: (Titanium.Platform.displayCaps.platformWidth - $.dotTitle.toImage().width) / 2});
	$.dotText.applyProperties({width: Titanium.Platform.displayCaps.platformWidth - 40});
};
