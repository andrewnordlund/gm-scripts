// ==UserScript==
// @name        Globe and Mail Paywall
// @namespace   https://www.nordburg.ca/
// @description Gets rid of the paywall thing
// @include     https://www.theglobeandmail.com/*
// @version     1
// @grant       none
// @run-at      document-end
// ==/UserScript==

console.log ("globeandmail::BLAHLABLABLA");

var dbug = true;
if (dbug) console.log ("globeandmail::Running.");
var contents  = "<p>Article contents:</p>";

var article = document.querySelector(".c-article-body");

if (article) {
  if (dbug) console.log ("globeandmail::Got article: " + article.innerHTML + ".");
  contents = article.innerHTML;
} else {
	if (dbug) console.log ("globeandmail::Didn't get article.");
}

function removeStuff () {
	var paywallModalUpsell = document.getElementById("paywallModalUpsell");
	var content = document.getElementById("content");
	var backdrop = document.querySelector(".js-tgam-paywall-backdrop");
	var tpbackdrop = document.querySelector("div.tp-backdrop");
  var tpmodal = document.querySelector(".tp-modal");

	if (dbug) console.log ("globeandmail:: Got the stuff.  Checking to see if I should do anything...");

	if (tpbackdrop) {
  	if (dbug) console.log ("globeandmail::Found tpbackdrop: " + tpbackdrop + ".");
  	tpbackdrop.parentNode.removeChild(tpbackdrop);
  	if (dbug) console.log ("globeandmail::tpbackdrop removed.");
	} else {
	  if (dbug) console.log ("globeandmail::Didn't get tpbackdrop.");
	}
  
  if (tpmodal) {
    if (dbug) console.log ("globeandmail::Found tpmodal.");
    tpmodal.parentNode.removeChild(tpmodal);
    if (dbug) console.log ("globeandmail::...and removed it.");
  } else {
	  if (dbug) console.log ("globeandmail::Didn't get tpmodal.");
  }
  
  var hiddenText = document.querySelectorAll(".c-article-body__text");
  var newStyleStr = "display: inherit";
  
  for (var i = 0; i < hiddenText.length; i++) {
    if (hiddenText[i].hasAttribute("style")) {
      hiddenText[i].setAttribute("style", hiddenText[i].getAttribute("style") + " " + newStyleStr);
    } else {
      hiddenText[i].setAttribute("style", newStyleStr);
    }
  }
  
  var mainEl = document.getElementsByTagName("body");
  if (mainEl) {
    if (dbug) console.log ("globeandmail::Got main.");
    mainEl.innerHTML = contents;
  } else {
    if (dbug) console.log ("globeandmail::Didn't get main.");
  }
} // End of removeStuff

function oknowdone () {
  console.log ("globeandmail::All done!");
}


addEventListener("DOMContentLoaded", oknowdone, false);
var timeout = window.setTimeout(removeStuff, 4000);
addEventListener("click", oknowdone, false);

/*
if (paywallModalUpsell && content && backdrop) {
  if (dbug) console.log("globeandmail::Got all three");
  //content.removeChild(paywallModalUpsell);
  //content.removeChild(backdrop);
  paywallModalUpsell.parentNode.removeChild(paywallModalUpsell);
  backdrop.parentNode.removeChild(backdrop);
} else {
  if (dbug) {
    console.log("globeandmail::paywallModalUpsell: " + paywallModalUpsell + ".");
    console.log("globeandmail::content: " + content + ".");
    console.log("globeandmail::backdrop: " + backdrop + ".");
  }
}
*/
