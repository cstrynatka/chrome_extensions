// This is what will happen when the user clicks on the designated browser action
chrome.browserAction.onClicked.addListener(function(tab) {

	// Send a message to the tab the user is currently on
	chrome.tabs.query( {
		active: true, currentWindow: true
	},
		function(tabs) {
			var activeTab = tabs[0];
			chrome.tabs.sendMessage(activeTab.id, {
				"message": "clicked_browser_action"
			});
		});

	// Next we need to receive the message sent by the new info in the content.js file so that we can 
	// receive the URL and open a new tab
	chrome.runtime.onMessage.addListener(
		function(request, sender, sendResponse) {
			if( request.message === "open_new_tab" ) {
				chrome.tabs.create( {
					"url": request.url
				});
			}
		})
});

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