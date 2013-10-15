var audioPlayer, isPlay = false, songTime = 0, intervalStep = 1000, duration = audioPlayer.getDuration() * 1000;

var interval = setInterval(function() {
    //Ti.API.info('Time Played: ' + Math.round(e.progress) + ' milliseconds');
    
    songTime = audioPlayer.time;
    $.sliderSong.value = songTime;
	$.timePassed.text = secToString(songTime);
}, intervalStep);

                              
$.sliderVolume.addEventListener('change', function(e) {
	//Ti.API.info('audioPlayer| volume = ' + e.value); //====================
    audioPlayer.volume = e.value;
});

$.buttonBack.addEventListener("click", function () {
	if (songTime > 5000) {
		
		Ti.API.info('audioPlayer| (<<) | newTime = ' + songTime); //====================
		
		audioPlayer.pause();
		songTime -= 5000;
		audioPlayer.setTime(songTime);
		audioPlayer.play();
	}
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
	if (songTime < duration - 6000) {
		
		Ti.API.info('audioPlayer| (>>) | newTime = ' + songTime); //====================
		
		audioPlayer.pause();
		songTime += 5000;
		audioPlayer.setTime(songTime);
		audioPlayer.play();
	}
});

function secToString (ms) {
	var min = (ms / 60000).toString();
	return min[0] + ":" + min[2] + min[3];
}

exports.initPlayer = function(width, player) {
	audioPlayer = player;
	
	$.timeLeft.text = secToString(duration);
	
	$.container.applyProperties({
		width: width * 0.6,
		height: width / 3
	});
	
	Ti.API.info('audioPlayer| duration = ' + duration); //====================
	
	$.sliderSong.applyProperties({
		max: duration,
		width: width * 0.6 - 40
	});
	
	$.sliderVolume.applyProperties({
		width: width * 0.6 - 40
	});
};

exports.closePlayer = function () {
	//$.buttonPlay.applyProperties({image: "images/dotsView/audioPlayerButtonPlay.png"});
	clearInterval(interval);
	audioPlayer.pause();
	audioPlayer.setTime(0);
	//audioPlayer.release();
};
