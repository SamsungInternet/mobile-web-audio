var audioCtx = null;
var tag = null;
var osc = null;

document.addEventListener('DOMContentLoaded', function() {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    //try to play bg sound
    autoPlayBgSound();

    _setupTag();

    document.getElementById('btnTag').addEventListener('click', function(){
        console.log('playing media element ');
        playTag();      
    });

    document.getElementById('btnMic').addEventListener('click', function(){
        console.log('Mic');
    });

    document.getElementById('btnOsc').addEventListener('click', function(){
        console.log('playing ocsillator');
        playOsc();
    });
});

var _setupTag = function(){
    //gets the tag with the media element
    tag = document.getElementById('violin');
    //creates a source based on this element
    var src = audioCtx.createMediaElementSource(tag);
    //gain node for volume
    var gainNode = audioCtx.createGain();
    gainNode.gain.value = 1;
    //connects nodes
    src.connect(gainNode);
    gainNode.connect(audioCtx.destination);
};

var playTag = function(){
    tag.play();
};

var playOsc = function(){
    //crate, configure and play oscillator
    osc = audioCtx.createOscillator();
    osc.frequency.value = 150;
    osc.type = "triangle";
    osc.connect(audioCtx.destination);
    osc.start(audioCtx.currentTime);
    osc.stop(audioCtx.currentTime + .5);
};

var autoPlayBgSound = function(){
    var bgSound = document.getElementById('applause');
    var src = audioCtx.createMediaElementSource(bgSound);
    var gainNode = audioCtx.createGain();
    gainNode.gain.value = .5;
    src.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    bgSound.play();
};
