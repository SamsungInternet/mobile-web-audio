var audioCtx = null;
var tag = null;
var osc = null;
var mic = null;

document.addEventListener('DOMContentLoaded', function() {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    //try to play bg sound
    try{
        autoPlayBgSound();
    }
    catch(e)
    {
        console.log('cant play bg sound' + e.message);
    }
    

    _setupTag();

    document.getElementById('btnTag').addEventListener('click', function(){
        console.log('playing media element ');
        playTag();      
    });

    document.getElementById('btnMic').addEventListener('click', function(){
        console.log('playing stream microphone');
        playMic();
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
    //create, configure and play oscillator
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

var playMic = function(){
    //support for older or partial implementations of devices.getUserMedia
    if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {};
    }
    if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = function(constraints) {
            var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
            if (!getUserMedia) {
                return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
            }
            return new Promise(function(resolve, reject) {
                getUserMedia.call(navigator, constraints, resolve, reject);
            });
        }
    }

    //get microphone stream  
    var mediaconstraints = {audio:true}; //defines media device constraints     
    navigator.mediaDevices.getUserMedia(mediaconstraints).then(function(mediaStream){ 
        //create audio nodes 
        source = audioCtx.createMediaStreamSource(mediaStream); 
        gainNode = audioCtx.createGain(); 
        gainNode.gain.value = .8; 
        //connect nodes 
        source.connect(gainNode); 
        gainNode.connect(audioCtx.destination); 
    }).catch(function(err){console.log(err);});  
};
