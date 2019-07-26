var s = document.createElement("script");
s.src = chrome.extension.getURL("pagescript.js");
(document.head || document.documentElement).appendChild(s);
s.parentNode.removeChild(s);
