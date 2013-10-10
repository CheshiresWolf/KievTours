var audioPlayer, isPlay = false, songTime = 0, intervalStep = 1000;
                              
$.sliderVolume.addEventListener('change', function(e) {
	Ti.API.info('audioPlayer| volume = ' + e.value); //====================
    audioPlayer.volume = e.value;
});

$.buttonBack.addEventListener("click", function () {
	audioPlayer.pause();
	if (songTime > 6000) {
		//audioPlayer.setTime((songTime - 5) * 1000);
		songTime -= 5000;
		audioPlayer.setCurrentPlaybackTime(songTime);
	} else {
		audioPlayer.setCurrentPlaybackTime(0);
	}
	audioPlayer.play();
	isPlay = true;
	
	Ti.API.info('audioPlayer| currentPlaybackTime = ' + audioPlayer.getCurrentPlaybackTime()); //====================
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
	if (songTime < audioPlayer.duration - 6000) {
		//audioPlayer.setTime((songTime + 5) * 1000);
		songTime += 5000;
		audioPlayer.setCurrentPlaybackTime(songTime + 5000);
		
	} else {
		audioPlayer.setCurrentPlaybackTime(0);
	}
	
	audioPlayer.play();
	isPlay = true;
});

function secToString (ms) {
	var min = (ms / 60000).toString();
	return min[0] + ":" + min[2] + min[3];
}

function audioProgress() {
	if (isPlay) {
		songTime = audioPlayer.getCurrentPlaybackTime();
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
	
	Ti.API.info('audioPlayer| duration = ' + audioPlayer.getDuration()); //====================
	
	$.sliderSong.applyProperties({
		max: audioPlayer.getDuration(),
		width: width * 0.6 - 40
	});
	
	$.sliderVolume.applyProperties({
		width: width * 0.6 - 40
	});
	
	
	setInterval(audioProgress, intervalStep);
};

exports.closePlayer = function () {
	//$.buttonPlay.applyProperties({image: "images/dotsView/audioPlayerButtonPlay.png"});
	clearInterval(audioProgress);
	audioPlayer.pause();
	audioPlayer.setCurrentPlaybackTime(0);
	//audioPlayer.release();
};
