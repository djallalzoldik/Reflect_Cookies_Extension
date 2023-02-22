let tbody = document.getElementById('tbody')


chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse) {


  // Received Array Of Cookies From content.js
  if (message.reflectedCookies) {

      console.log("Thank You we Recieved The Cookies")
    let allcookiesreflected = message.reflectedCookies;

    let i = 0;
    while (allcookiesreflected[i]) {
    console.log("this is refelct"+allcookiesreflected[i].name)

    tbody.innerHTML += '<h1>'+allcookiesreflected[i].name+'</h1>'
    // `
    //     <tr>
    //       <td data-title='Provider Name'>
    //         ${allcookiesreflected[i].name}
    //       </td>
    //       <td data-title='E-mail'>
    //       ${allcookiesreflected[i].value}
    //       </td>
    //       <td class='select'>
    //         <a class='button' href='#'>
    //           Select
    //         </a>
    //       </td>
    //     </tr> `
       
       i++;
     }
  }




}

// Requesting Reflected Cookies from the content.js
window.addEventListener('DOMContentLoaded', () => {

  
  let msg = {
    run: "true"
    };
  
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    chrome.tabs.sendMessage(tabs[0].id, msg);  
    console.log('Thank You We Request The Cookies From content.js')
});



})




