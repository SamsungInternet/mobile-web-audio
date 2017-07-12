var audioCtx = null;

document.addEventListener('DOMContentLoaded', function() {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    document.getElementById('btnTag').addEventListener('click', function(){
        console.log('Tag');
    });

    document.getElementById('btnMic').addEventListener('click', function(){
        console.log('Mic');
    });

    document.getElementById('btnOsc').addEventListener('click', function(){
        console.log('Osc');
    });
});

