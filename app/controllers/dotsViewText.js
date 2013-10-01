var scroll;

exports.initText = function(dot, sc) {
	scroll = sc;
	$.dotNumber.text = dot.number;
	$.dotTitle.text = dot.name;
	$.dotText.text = dot.text;
	//$.container.applyProperties({top: Titanium.Platform.displayCaps.platformHeight - 50});
	//$.dotNumber.applyProperties({left: (Titanium.Platform.displayCaps.platformWidth - $.dotTitle.toImage().width) / 2 - 20});
	
	$.dotTitle.applyProperties({
		width: Titanium.Platform.displayCaps.platformWidth - 40
	});	
	$.dotText.applyProperties({
		width: Titanium.Platform.displayCaps.platformWidth - 40
	});
};

function refreshScroll() {
	$.container.removeEventListener('postlayout', refreshScroll);
	$.topContainer.applyProperties({
		left: (Titanium.Platform.displayCaps.platformWidth - $.topContainer.toImage().width) / 2
	});
	$.textContainer.applyProperties({
		top: $.dotTitle.toImage().height + 10
	});
	$.Aa.applyProperties({
		top: $.dotTitle.toImage().height + 10
	});
	//scroll.applyProperties({contentHeight: Titanium.Platform.displayCaps.platformHeight + $.dotTitle.toImage().height + $.dotText.toImage().height + 10});
}

$.container.addEventListener('postlayout', refreshScroll);
