var audioPlayer, isPlay = false, songTime = 0, intervalStep = 1000, duration = 0;

var interval = null;
                              
$.sliderVolume.addEventListener('change', function(e) {
    audioPlayer.volume = e.value;
});

$.buttonBack.addEventListener("click", function () {
	initInterval();
	
	if (songTime > 5000) {		
		audioPlayer.pause();
		songTime -= 5000;
		audioPlayer.setTime(songTime);
		audioPlayer.play();
	}
});

$.buttonPlay.addEventListener("click", function () {
	initInterval();
	
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
	initInterval();
	
	if (songTime < duration - 6000) {		
		audioPlayer.pause();
		songTime += 5000;
		audioPlayer.setTime(songTime);
		audioPlayer.play();
	}
});

function initInterval() {
	if (interval === null) {
		interval = setInterval(function() {		    
		    songTime = audioPlayer.time;
		    $.sliderSong.value = songTime;
			$.timePassed.text = secToString(songTime);
		}, intervalStep);
	}
}

function secToString (ms) {
	var min = (ms / 60000).toString();
	return min[0] + ":" + min[2] + min[3];
}

exports.initPlayer = function(width, player) {
	audioPlayer = player;
	duration = audioPlayer.getDuration() * 1000;
	
	$.timePassed.text = "0:00";
	$.timeLeft.text = secToString(duration);
	
	$.container.applyProperties({
		width: width * 0.6,
		height: width / 3
	});
	
	$.sliderSong.applyProperties({
		max: duration,
		width: width * 0.6 - 40
	});
	
	$.sliderVolume.applyProperties({
		width: width * 0.6 - 40
	});
};

exports.closePlayer = function () {
	if (interval !== null) {
		clearInterval(interval);
	}
	audioPlayer.pause();
	audioPlayer.setTime(0);
};
