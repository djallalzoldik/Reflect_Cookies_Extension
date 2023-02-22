



// console.log("Hi background");

let arrayofCookies;
let url;

 
chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse) {

 
 
  
// if the message is the start from content.js => This mean the content.js said to the background Start Your Work :)
if (message.start === "true") {
  url = message.url;

  chrome.action.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });
  chrome.action.setBadgeText({text: "0" }); 
  
    //get all cookies with function getAll
    chrome.cookies.getAll({"url": url}, function(allcookies) {
      console.log('thank you from background all the cookies was send here is'+ allcookies)
      arrayofCookies = allcookies;
    
   //Send All The Cookies to content.js
    let msg = {
      Cookies_all: allcookies
      };
    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
      chrome.tabs.sendMessage(tabs[0].id, msg);  
  });
  
  })
  
}
 
// notifecation of how many reflected Cookie found
if (message.note) {

  let numbers = message.note
  let num = numbers.toString();
  chrome.action.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });
  chrome.action.setBadgeText({text: num });   

}

// Recieve Cookie name from popup , Which will change it 
if (message.updateCookie) {

  console.log('Thank you we recieved your Cookie name to change it and is ' + message.nameed)
  chrome.cookies.set({
    "url": url,
    "name": message.nameed,
    // "domain": message.domained,
    // "expirationDate": expdate,
    "httpOnly": message.httpOnlycookie,
    "path": message.pathed,
    "sameSite": message.sameSited,
    "secure": message.securecookie,
    // "storeId": message.storeIded,       
    "value": message.payload

  }, function (cookie) {
    
    console.log('Ok we update the value of cookie'+message.nameed+'from'+message.valueCookie+'to Value' +  message.payload);

    // when update the cookie value send to the content.js to reload the page
    let msg = {
      reload: "true"
      };
    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
      chrome.tabs.sendMessage(tabs[0].id, msg);  
  });


  });
 
  
}


}






  
 