function changeVolume() {
	Ti.API.info('changed');
}

exports.initPlayer = function(width) {
	$.container.applyProperties({
		width: width * 0.6,
		height: width / 3
	});
	
	$.sliderSong.applyProperties({	
		width: width * 0.6 - 40
	});
	
	$.sliderVolume.applyProperties({	
		width: width * 0.6 - 40
	});
};
