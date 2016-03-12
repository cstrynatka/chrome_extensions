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

var audio = new Audio();
Audio.src = "Jaws_Theme_Song.mp3", "Jaws_Theme_Song.ogg";
Audio.play();

var audio = document.getElementById('audio');
audio.play();

window.onload = function() {
	document.getElementById("Jaws_Theme_Music").play();
}

var loaded = false;
var aud = new Audio();

aud.addEventListener('loadeddata', function() {
	loaded = true;
	aud.play();
}, false);

aud.addEventListener('error', function() {
	alert('error loading audio');
}, false);

function check_audio() 
{
  var elem = document.createElement('audio'), bool = false;
   
  try
  {
    if ( bool = !!elem.canPlayType ) 
    {
      bool = new Boolean(bool);
      bool.ogg = elem.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,'');
      bool.mp3 = elem.canPlayType('audio/mpeg;').replace(/^no$/,'');
      bool.wav = elem.canPlayType('audio/wav; codecs="1"').replace(/^no$/,'');
      bool.m4a = (elem.canPlayType('audio/x-m4a;') || elem.canPlayType('audio/aac;')).replace(/^no$/,'');
    }
  } 
  catch(e) 
  { 
  }
   
  return bool;
}
 
var b = check_audio();
 
if(!b)
{
  document.write('No Audio support');
}
else
{
  var formats = ['ogg', 'mp3', 'wav', 'm4a'];
  for(var i = 0; i < formats.length; i++)
  {
    document.write(formats[i] + ' support status ' + b[formats[i]] + '<br />');
  }
}

aud.src = 'Jaws_Theme_Song.mp3', 'Jaws_Theme_Song.ogg';