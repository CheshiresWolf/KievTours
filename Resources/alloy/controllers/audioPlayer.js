function Controller() {
    function secToString(ms) {
        var min = (ms / 6e4).toString();
        return min[0] + ":" + min[2] + min[3];
    }
    function audioProgress() {
        if (isPlay) {
            songTime = audioPlayer.getCurrentPlaybackTime();
            $.sliderSong.value = songTime;
            $.timePassed.text = secToString(songTime);
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "audioPlayer";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.container = Ti.UI.createView({
        id: "container"
    });
    $.__views.container && $.addTopLevelView($.__views.container);
    $.__views.timePassed = Ti.UI.createLabel({
        zIndex: 4,
        top: 0,
        left: 0,
        width: 20,
        height: 20,
        font: {
            fontSize: "10dp"
        },
        text: "0:00",
        id: "timePassed"
    });
    $.__views.container.add($.__views.timePassed);
    $.__views.sliderSong = Ti.UI.createSlider({
        zIndex: 4,
        top: 0,
        left: 20,
        height: 5,
        min: 0,
        value: 0,
        thumbImage: "images/dotsView/slider/SliderSongCenter.png",
        highlightedThumbImage: "images/dotsView/slider/SliderSongCenter.png",
        rightTrackImage: "images/dotsView/slider/SliderVolumeRight.png",
        leftTrackImage: "images/dotsView/slider/SliderVolumeLeft.png",
        touchEnabled: false,
        id: "sliderSong"
    });
    $.__views.container.add($.__views.sliderSong);
    $.__views.timeLeft = Ti.UI.createLabel({
        zIndex: 4,
        top: 0,
        right: 0,
        width: 20,
        height: 20,
        font: {
            fontSize: "10dp"
        },
        text: "0:00",
        id: "timeLeft"
    });
    $.__views.container.add($.__views.timeLeft);
    $.__views.buttonBack = Ti.UI.createImageView({
        zIndex: 4,
        image: "images/dotsView/audioPlayerButtonBack.png",
        left: 20,
        width: 15,
        height: 15,
        id: "buttonBack"
    });
    $.__views.container.add($.__views.buttonBack);
    $.__views.buttonPlay = Ti.UI.createImageView({
        zIndex: 4,
        image: "images/dotsView/audioPlayerButtonPlay.png",
        width: 15,
        height: 15,
        id: "buttonPlay"
    });
    $.__views.container.add($.__views.buttonPlay);
    $.__views.buttonForward = Ti.UI.createImageView({
        zIndex: 4,
        image: "images/dotsView/audioPlayerButtonForward.png",
        right: 20,
        width: 15,
        height: 15,
        id: "buttonForward"
    });
    $.__views.container.add($.__views.buttonForward);
    $.__views.audioIconMin = Ti.UI.createImageView({
        zIndex: 4,
        image: "images/dotsView/audioPlayerVolumeMin.png",
        bottom: 2,
        left: 0,
        width: 15,
        height: 15,
        id: "audioIconMin"
    });
    $.__views.container.add($.__views.audioIconMin);
    $.__views.sliderVolume = Ti.UI.createSlider({
        zIndex: 4,
        bottom: 0,
        left: 20,
        height: 5,
        min: 0,
        value: .5,
        max: 1,
        thumbImage: "images/dotsView/slider/SliderVolumeCenter_small.png",
        highlightedThumbImage: "images/dotsView/slider/SliderVolumeCenter_small.png",
        rightTrackImage: "images/dotsView/slider/SliderVolumeRight.png",
        leftTrackImage: "images/dotsView/slider/SliderVolumeLeft.png",
        id: "sliderVolume"
    });
    $.__views.container.add($.__views.sliderVolume);
    $.__views.audioIconMax = Ti.UI.createImageView({
        zIndex: 4,
        image: "images/dotsView/audioPlayerVolumeMax.png",
        bottom: 3,
        right: 0,
        width: 15,
        height: 15,
        id: "audioIconMax"
    });
    $.__views.container.add($.__views.audioIconMax);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var audioPlayer, isPlay = false, songTime = 0, intervalStep = 1e3;
    $.sliderVolume.addEventListener("change", function(e) {
        Ti.API.info("audioPlayer| volume = " + e.value);
        audioPlayer.volume = e.value;
    });
    $.buttonBack.addEventListener("click", function() {
        audioPlayer.pause();
        if (songTime > 6e3) {
            songTime -= 5e3;
            audioPlayer.setCurrentPlaybackTime(songTime);
        } else audioPlayer.setCurrentPlaybackTime(0);
        audioPlayer.play();
        isPlay = true;
        Ti.API.info("audioPlayer| currentPlaybackTime = " + audioPlayer.getCurrentPlaybackTime());
    });
    $.buttonPlay.addEventListener("click", function() {
        if (isPlay) {
            $.buttonPlay.applyProperties({
                image: "images/dotsView/audioPlayerButtonPlay.png"
            });
            audioPlayer.pause();
            isPlay = false;
        } else {
            $.buttonPlay.applyProperties({
                image: "images/dotsView/audioPlayerButtonPause.png"
            });
            audioPlayer.play();
            isPlay = true;
        }
    });
    $.buttonForward.addEventListener("click", function() {
        audioPlayer.pause();
        if (audioPlayer.duration - 6e3 > songTime) {
            songTime += 5e3;
            audioPlayer.setCurrentPlaybackTime(songTime + 5e3);
        } else audioPlayer.setCurrentPlaybackTime(0);
        audioPlayer.play();
        isPlay = true;
    });
    exports.initPlayer = function(width, player) {
        audioPlayer = player;
        $.timeLeft.text = secToString(audioPlayer.duration);
        $.container.applyProperties({
            width: .6 * width,
            height: width / 3
        });
        Ti.API.info("audioPlayer| duration = " + audioPlayer.getDuration());
        $.sliderSong.applyProperties({
            max: audioPlayer.getDuration(),
            width: .6 * width - 40
        });
        $.sliderVolume.applyProperties({
            width: .6 * width - 40
        });
        setInterval(audioProgress, intervalStep);
    };
    exports.closePlayer = function() {
        clearInterval(audioProgress);
        audioPlayer.pause();
        audioPlayer.setCurrentPlaybackTime(0);
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;