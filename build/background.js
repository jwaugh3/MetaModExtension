/* global chrome */

chrome.browserAction.onClicked.addListener(function(tab) {
  // chrome.tabs.executeScript(tab.id, {code: './content.js'}, ()=>{console.log('ran')} )
  chrome.tabs.sendMessage(tab.id, { message: 'load' });
});