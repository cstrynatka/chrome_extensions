// Content for the extension that'll do cool stuff on the page
// alert("Here is the theme song to Donald Trump!")

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if( request.message === "clicked_browser_action" ) {
			var firstHref = $("a[href^='http']").eq(0).attr("href");

			console.log(firstHref);

			// Adding in more info to the action so that clicking on the browser action will trigger
			// the URL to be sent back to the background.js file and a new tab will open
			chrome.runtime.sendMessage( {
				"message": "open_new_tab", "url": firstHref
			});
		}
	}
);

var audioElement = document.createElement('audio');
audioElement.setAttribute('src', "Jaws_Theme_Song.mp3", "Jaws_Theme_Song.ogg");
audioElement.play();

// onload = function() {
// 	document.getElementById("Jaws_Theme_Song.mp3").play
// }

var regexDonaldTrump = /Donald Trump/;
var regexTrump = /Trump/;

function isDonaldTrumpArticle() {
	return regexDonaldTrump.test(document.title) ||
		(regexTrump.test(document.title) && regex.DonaldTrump.test(document.body.textContent));
}

window.onbeforeunload = function(e) {
	if (isDonaldTrumpArticle()) {
		chrome.extension.sendMessage({
			action: "stop"
		});
	}
}

document.onreadystatechange = function(e) {
	if (document.readyState === 'complete') {
		if (isDonaldTrumpArticle()) {
			chrome.extension.sendMessage({
				action: "play"
			});
		}
	}
};

document.onload = function(e) {
	if (isDonaldTrumpArticle()) {
		chrome.extension.sendMessage({
			action: "play"
		});
	}
};