function getBgColors (tab) {
	alert('The browser action was clicked! Yay!');
}

// To actually get the browser action when it's clicked, call the getBgColors function
chrome.browserAction.onClicked.addListener(getBgColors);