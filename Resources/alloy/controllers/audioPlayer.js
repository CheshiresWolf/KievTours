function Controller() {
    function initInterval() {
        if (null === interval) {
            $.buttonPlay.applyProperties({
                image: "images/dotsView/audioPlayerButtonPause.png"
            });
            interval = setInterval(function() {
                songTime = audioPlayer.time;
                $.sliderSong.value = songTime;
                $.timePassed.text = secToString(songTime);
            }, intervalStep);
        }
    }
    function secToString(ms) {
        var min = (ms / 6e4).toString();
        return min[0] + ":" + min[2] + min[3];
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
            fontSize: "9dp"
        },
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
            fontSize: "9dp"
        },
        id: "timeLeft"
    });
    $.__views.container.add($.__views.timeLeft);
    $.__views.buttonBack = Ti.UI.createImageView({
        zIndex: 4,
        image: "images/dotsView/audioPlayerButtonBack.png",
        left: 20,
        width: 15,
        height: 15,
        touchEnabled: false,
        id: "buttonBack"
    });
    $.__views.container.add($.__views.buttonBack);
    $.__views.buttonBackListener = Ti.UI.createView({
        zIndex: 5,
        image: "images/dotsView/audioPlayerButtonBack.png",
        left: 0,
        height: 30,
        id: "buttonBackListener"
    });
    $.__views.container.add($.__views.buttonBackListener);
    $.__views.buttonPlay = Ti.UI.createImageView({
        zIndex: 4,
        image: "images/dotsView/audioPlayerButtonPlay.png",
        width: 15,
        height: 15,
        touchEnabled: false,
        id: "buttonPlay"
    });
    $.__views.container.add($.__views.buttonPlay);
    $.__views.buttonPlayListener = Ti.UI.createView({
        zIndex: 5,
        image: "images/dotsView/audioPlayerButtonPlay.png",
        height: 30,
        id: "buttonPlayListener"
    });
    $.__views.container.add($.__views.buttonPlayListener);
    $.__views.buttonForward = Ti.UI.createImageView({
        zIndex: 4,
        image: "images/dotsView/audioPlayerButtonForward.png",
        right: 20,
        width: 15,
        height: 15,
        touchEnabled: false,
        id: "buttonForward"
    });
    $.__views.container.add($.__views.buttonForward);
    $.__views.buttonForwardListener = Ti.UI.createView({
        zIndex: 5,
        image: "images/dotsView/audioPlayerButtonForward.png",
        right: 0,
        height: 30,
        id: "buttonForwardListener"
    });
    $.__views.container.add($.__views.buttonForwardListener);
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
    var audioPlayer, isPlay = false, songTime = 0, intervalStep = 1e3, duration = 0;
    var interval = null;
    $.sliderVolume.addEventListener("change", function(e) {
        audioPlayer.volume = e.value;
    });
    $.buttonBackListener.addEventListener("click", function() {
        initInterval();
        if (songTime > 5e3) {
            audioPlayer.pause();
            songTime -= 5e3;
            audioPlayer.setTime(songTime);
            audioPlayer.play();
        }
    });
    $.buttonPlayListener.addEventListener("click", function() {
        initInterval();
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
    $.buttonForwardListener.addEventListener("click", function() {
        initInterval();
        if (duration - 6e3 > songTime) {
            audioPlayer.pause();
            songTime += 5e3;
            audioPlayer.setTime(songTime);
            audioPlayer.play();
        }
    });
    exports.initPlayer = function(width, player) {
        audioPlayer = player;
        duration = 1e3 * audioPlayer.getDuration();
        $.timePassed.text = "0:00";
        $.timeLeft.text = secToString(duration);
        var containerWidth = .6 * width;
        $.container.applyProperties({
            width: containerWidth,
            height: width / 3
        });
        $.buttonBackListener.applyProperties({
            width: containerWidth / 3
        });
        $.buttonPlayListener.applyProperties({
            width: containerWidth / 3
        });
        $.buttonForwardListener.applyProperties({
            width: containerWidth / 3
        });
        $.sliderSong.applyProperties({
            max: duration,
            width: containerWidth - 40
        });
        $.sliderVolume.applyProperties({
            width: containerWidth - 40
        });
    };
    exports.closePlayer = function() {
        null !== interval && clearInterval(interval);
        audioPlayer.pause();
        audioPlayer.setTime(0);
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;