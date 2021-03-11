/* global chrome */

const siteURL = 'https://metamoderation.com'

chrome.runtime.onMessage.addListener(function(request, sender, callback) {
  let embeddedFrame = document.getElementById('modal-window')

  if(embeddedFrame){
    let embeddedFrameDisplay = embeddedFrame.style.display
    embeddedFrameDisplay === "none" ? embeddedFrame.style.display = "block" : embeddedFrame.style.display = "none"
  } else {
    main()
  }
});

function main() {
  // eslint-disable-next-line no-undef
  const extensionOrigin = 'chrome-extension://' + chrome.runtime.id;
  // eslint-disable-next-line no-restricted-globals
  if (!location.ancestorOrigins.contains(extensionOrigin)) {
    // Fetch the local React index.html page
    // eslint-disable-next-line no-undef
    fetch(chrome.runtime.getURL('index.html') /*, options */)
      .then((response) => response.text())
      .then((html) => {
        const styleStashHTML = html.replace(/\/static\//g, `${extensionOrigin}/static/`);
        // eslint-disable-next-line no-undef
        $(styleStashHTML).appendTo('body');
        console.log('extension loaded to page')

        chrome.storage.sync.clear()

        window.addEventListener("message", (event)=>{
        
          if(event.origin === siteURL && event.data.includes('?token=')){
            chrome.storage.sync.set({mmtkn: event.data.split('?token=').pop()}, ()=>{
              window.postMessage('mmtkn=' + event.data.split('?token=').pop(), '*')
            })
          }

          if(event.data === 'mm-mounted'){
            //Get token from storage
            chrome.storage.sync.get(['mmtkn'], (result)=>{
              if(typeof result.mmtkn !== 'undefined'){
                window.postMessage('mmtkn=' + result.mmtkn, '*')
              }
            })
          }

           else if(event.data.includes('?settings=')){
            window.postMessage('mm_fmb_settings=' + event.data.split('?settings=').pop(), '*')
          }

          if(event.data === 'clear-token'){
            chrome.storage.sync.remove('mmtkn')
          }
        })

        
        
      })
      .catch((error) => {
        console.warn(error);
      });
  }
}