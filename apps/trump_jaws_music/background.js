var timeout;
textarea.addEventListener("keydown", function(e) {
	clearTimeout(timeout);
	self = e.target;
	timeout = setTimeout(function(function) {
		console.log(self.value);
		if (self.value.indexOf("Donald Trump") > -1) {
			alert("Here's the theme music to Donald Trump");
		}
	}, 500)
})

var audioElement = document.createElement('audio');
audioElement.setAttribute("preload", "auto");
audioElement.autobuffer = true;
var source1 = document.createElement('source');
source1.type = 'audio/mpeg';
source1.src = 'Jaws_Theme_Song.mp3';

source2.type = 'audio/ogg';
source2.src = 'Jaws_Theme_Song.ogg';

audioElement.appendChild(source1, source2);
audioElement.load;

function isPlaying() {
	return !audioElement.paused && !audioElement.ended && 0 < audioElement.currentTime;
}

chrome.extension.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.action == "play" && !isPlaying()) {
			audioElement.play();
		} else if (request.action == "stop" && isPlaying()) {
			audioElement.pause();
			audioElement.currentTime = 0;
		}
	});