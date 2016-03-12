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