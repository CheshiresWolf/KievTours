var audioPlayer, isPlay = false, songTime = 0;
                              
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

function audioProgress() {
	if (isPlay) {
		songTime = audioPlayer.time / 1000;
		$.sliderSong.value = songTime;
		$.timePassed.text = secToString(songTime);
	}
}

exports.initPlayer = function(width, player) {
	
	audioPlayer = player;
	
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
	
	
	setInterval(audioProgress, 1000);
};

exports.closePlayer = function () {
	//$.buttonPlay.applyProperties({image: "images/dotsView/audioPlayerButtonPlay.png"});
	clearInterval(audioProgress);
	audioPlayer.pause();
	audioPlayer.setTime(0);
	//audioPlayer.release();
};
