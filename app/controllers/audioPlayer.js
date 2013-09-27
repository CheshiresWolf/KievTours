var audioPlayer, isPlay = false, songTime = 0;

setInterval(function() { 
	if (isPlay) {
		songTime = audioPlayer.time / 1000;
		$.sliderSong.value = songTime;
		$.timePassed.text = secToString(songTime);
	}
}, 1000);
                              
$.sliderVolume.addEventListener('change', function(e) {
    audioPlayer.volume = e.value;
});

$.buttonBack.addEventListener("click", function () {
	audioPlayer.pause();
	if (songTime >= 5) {
		audioPlayer.setTime((songTime - 5) * 1000);
	}
	audioPlayer.play();
	isPlay = true;
});

$.buttonPlay.addEventListener("click", function () {
	if (isPlay) {
		$.buttonPlay.applyProperties({image: "images/dotsView/audioPlayerButtonPlay.png"});
		audioPlayer.pause();
		isPlay = false;
	} else {
		$.buttonPlay.applyProperties({image: "images/dotsView/audioPlayerButtonPause.png"});
		audioPlayer.play();
		isPlay = true;
	}
});

$.buttonForward.addEventListener("click", function () {
	audioPlayer.pause();
	if (songTime <= audioPlayer.duration - 5) {
		audioPlayer.setTime((songTime + 5) * 1000);
	}
	audioPlayer.play();
	isPlay = true;
});

function secToString (sec) {
	var min = (sec / 60).toString();
	return min[0] + ":" + min[2] + min[3];
}

exports.initPlayer = function(width, songPath) {
	
	audioPlayer = Ti.Media.createSound({ 
	    url: songPath,
	    volume: 0.5,
	    allowBackground: true
	}); 
	
	$.timeLeft.text = secToString(audioPlayer.duration);
	
	$.container.applyProperties({
		width: width * 0.6,
		height: width / 3
	});
	
	$.sliderSong.applyProperties({
		max: audioPlayer.duration,
		width: width * 0.6 - 40
	});
	
	$.sliderVolume.applyProperties({
		width: width * 0.6 - 40
	});
};

exports.closePlayer = function () {
	audioPlayer.release();
};
