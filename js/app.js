var audioCtx = null;

document.addEventListener('DOMContentLoaded', function() {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
});