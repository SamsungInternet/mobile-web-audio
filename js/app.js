var audioCtx = null;

document.addEventListener('DOMContentLoaded', function() {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    document.getElementById('btnTag').addEventListener('click', function(){
        playTag();
    });

    document.getElementById('btnMic').addEventListener('click', function(){
        console.log('Mic');
    });

    document.getElementById('btnOsc').addEventListener('click', function(){
        console.log('Osc');
    });
});

var playTag = function(){
    //gets the tag with the media element
    var tag = document.getElementById('violin');
    //creates a source based on this element
    var src = audioCtx.createMediaElementSource(tag);
    //gain node for volume
    var gainNode = audioCtx.createGain();
    gainNode.gain.value = 1;
    //connects nodes
    src.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    //plays audio
    tag.play();

};

var playOsc = function(){

};

