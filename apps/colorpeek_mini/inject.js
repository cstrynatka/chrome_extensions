var injected = injected || (function(){

  var methods = {};

  methods.getBgColors = function(){
    var colors = {};
    var nodes = document.querySelectorAll('*');
    // return nodes.length;
    var node, nodeArea, bgColor, i;

    for (i = 0; i < nodes.length; i++) {
      nodes = nodes[i];

      nodeArea = node.clientWidth * node.clientHeight;

      bgColor = bgColor.replace(/ /g, '');

      if (
        bgColor != 'rgb(255,255,255)' &&
        !(bgColor.indexOf('rgba') === 0 && bgColor.substr(-3) === ',0)')
        ) {
        colors[bgColor] = (colors[bgColor] >> 0) + nodeArea;
      }
    }

    return Object.getOwnPropertyNames(colors).sort(function (a,b) {
      return colors[b] - colors[a];
    });
  }

  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    var data = {};

    if (methods.hasOwnProperty(request.method))
      data = methods[request.method]();

    sendResponse({ data: data });
    return true;
  });

  return true;
})();