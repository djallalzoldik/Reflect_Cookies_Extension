console.log("hello browser")
const allcookiesreflected = [];
let btn = document.getElementsByClassName('button');
let decoded;

// send message to background To start 
window.addEventListener("load", myScript); 
function myScript() {
  console.log("myscriptwork")
  chrome.runtime.sendMessage({
    url: document.location.href,
    start: "true",
    note: 0
  });
 
  
};

// Listen to messages
chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse) {

  // Listen to Comes Cookies from background
  if (message.Cookies_all) {

    // Pass all the Cookies we received from content.js array we called => arrayCookies
    let arrayCookies = message.Cookies_all;

    // number of Reflected Cookies
    let n = 1;

    console.log('Thank You from Content.js We Recieved The Cookies From the background.js and Here are'+ arrayCookies);
   
    // grep each single Cookie and try find it in the Document content
       for (let i = 0; i < arrayCookies.length; i++) {

        let valueCoo = arrayCookies[i].value;
           console.log(arrayCookies[i].value)
        

          // check if the Value is base64 
         var base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
         //try to decode the value base64
         if (base64regex.test(valueCoo) && isNaN(valueCoo) && !/^[a-zA-Z]+$/.test(valueCoo)) {
           decoded = decodeURIComponent(escape(window.atob(valueCoo)));
            
            }




           if (document.body.textContent.includes(valueCoo)) {
            
            // Check if the Cookie is Reflected on the DOM content or not
               console.log('✅ text exists on page');  

               // Push reflected cookies to allcookiesreflected array =>> After that we send it to POPUP in index.js     
               allcookiesreflected.push(arrayCookies[i])

               // Send notification number to background 
               chrome.runtime.sendMessage({
                note: n               
              });
              n++
               
             }
             else if (document.body.textContent.includes(decoded)) {
              console.log('docode mode work');
              arrayCookies[i].base = decoded
              let test = arrayCookies[i].base;
              console.log('HI this injected base64 on the array '+test);
              allcookiesreflected.push(arrayCookies[i])
              
               // Send notification number to background 
               chrome.runtime.sendMessage({
                note: n                     
              });
              n++

             }
             else {
               console.log('⛔️ text does not exist on page');
             }
   
             
       
         } 

         // 
         console.log("Ok We Push All the Reflected Cookies into allcookiesreflected Array, and here is "+ allcookiesreflected)

  };

  // we recieved message from popup which order from us to send  the Reflected Cookies we get 
  if(message.run) {
    console.log("we get orderd from popup to send the cookies that reflected")
    chrome.runtime.sendMessage({
      reflectedCookies: allcookiesreflected
                    
    });
  }
  if (message.reload) {
    window.location.reload();

  }


}

