function restapiSearch() {
  let radioFound = document.querySelector('input[name="nav-bar"]:checked');
  let input = document.getElementById("restapi_search").value.toLowerCase();
  let containerArray = document.getElementById("keywords_search").children;
  let length = document.getElementById("restapi_search").value.length;

  if(radioFound.id != "button_search") {
    buttonMemory = radioFound.id;
  }
  
  for(i = 0; i < containerArray.length; i++) {
    if(containerArray[i].innerHTML.toLowerCase().includes(input)) {
      containerArray[i].style.display = "block";
    } else {
      containerArray[i].style.display = "none";
    }
  }
  
  if(length > 2) {
    document.getElementById("button_search").checked = true;
  } else {
    document.getElementById(buttonMemory).checked = true;
  }
}

loadResourceAsync('/API/aapi-schema', {returntype: 'json'})
  .then(schema => {
    schema = schema['AAPI_schema']
    delete schema['__schema^2__']
    const keys = Object.keys(schema).sort((a,b) => (a.toLowerCase() > b.toLowerCase())?1:-1);
    let tempHTML = ''; 
    for(let c=65;c<91;c++) {
      const character = String.fromCharCode(c);
      tempHTML += '<input type = "radio" class="nav-buttons" id= "glossary_button_' + character + '" name="nav-bar" disabled>' 
      + '<label for="glossary_button_' + character + '" id="button_label_' + character + '" disabled>' + character + '</label>' 
      + '<div class="label-content" id="keywords_' + character + '"></div>';
    }
    document.getElementById('nav_bar_restapi').innerHTML += tempHTML;
    tempHTML = '';


    document.getElementById('top_button_restapi').addEventListener('click', function() {
      scrollToY(0, 6000, 'easeOutSine');
    }, false);

    keys.forEach(restapi_keyword => {
      let keywordUpper = restapi_keyword[0].toUpperCase();
      
      if(schema[restapi_keyword]["status"] !== "production") return; 

      searchID =  
        '<div class="restapi-keyword-container keyword-' + keywordUpper + '" id=search_"' + restapi_keyword + '">';
      cardID = 
        '<div class="restapi-keyword-container keyword-' + keywordUpper + '" id="' + restapi_keyword + '">';
      let unitVar = schema[restapi_keyword]["units"];
      if (typeof unitVar === "undefined") unitVar = "none";

      tempHTML = 
             '<h2 class="restapi-keyword-styling">' + restapi_keyword + '</h2>'
         +   '<dl>' 
         +     '<dt>' + schema[restapi_keyword]["title"] + '</dt>' 
         +     '<dd>' 
         +       '<ul class="list-attributes">' 
         +         '<li><b>Description:</b> ' + schema[restapi_keyword]["description"] + '</li>' 
         +         '<li><b>Type:</b> ' + schema[restapi_keyword]["type"] + '</li>'
         +         '<li><b>Unit:</b> ' + unitVar + '</li>' 
         +         '<li class="keyword-example"><b>Example:</b> ' + schema[restapi_keyword]["example"] + '</li>'
         +         '<li><b>Syntax:</b> <code>' + schema[restapi_keyword]["syntax"] + '</code> </li>' 
         +       '</ul>' 
         +     '</dd>' 
         +     '</dl>' 
         + '</div>';
      document.getElementById("keywords_" + keywordUpper).innerHTML += cardID + tempHTML;
      document.getElementById("keywords_search").innerHTML += searchID + tempHTML;
      document.getElementById("glossary_button_" + keywordUpper).disabled = false;
      document.getElementById("button_label_" + keywordUpper).disabled = false;
    });

    document.getElementById("glossary_button_A").checked = true;
})

.then(() => { 
  let query = "";
  if (window.location.href.includes('?')) {
    query = window.location.href.split('?')[1];  
  }

  switch(query.toLowerCase()) {
    case 'aflux':
      document.getElementById("tab_aflux").checked = true;
      break;  
    case 'restapi':
    default:
      document.getElementById("tab_restapi").checked = true;
      let urlArray = query.split('=');
      if (urlArray.length === 2) {
        urlArray[1] = urlArray[1].toLowerCase();
        let queryKey = urlArray[1].charAt(0).toUpperCase() + urlArray[1].slice(1);
        const documentation = document.getElementById('glossary_button_' + queryKey[0]);
        if (documentation) {
          documentation.checked = true;
        }
        const scrollTarget = document.getElementById(queryKey);
        if (scrollTarget) {
          scrollToTarget(scrollTarget, speed=1500, easing='easeInOutQuint', offset=0);
        }
      }
    }
})

.catch(err => {
  console.log(err);
});

let buttonMemory = '';
document.getElementById("keyword_search_clear").addEventListener("search", function(event) {
  document.getElementById(buttonMemory).checked = true;
});

document.getElementById("keyword_search_clear").addEventListener("click",function() {
  document.getElementById("restapi_search").value="";
  document.getElementById(buttonMemory).checked = true;
});

document.getElementById("restapi_search").addEventListener("keyup",restapiSearch);

let aflux = "";

loadResourceAsync('/API/aflux/v1.1/?help(general),format(html)')
  .then(general => {
    const newDocument = (new DOMParser).parseFromString(general, 'text/html');
    const converted = newDocument.body.innerHTML;
    document.getElementById("aflux_wrapper").innerHTML = converted;
    aflux = converted;
    general.match(/<body>(.*)<\/body>/s)[1];
  });

/*if (document.readyState === 'complete') {
  displayContent();
} else {
  window.addEventListener('load', displayContent);
}*/

buildHeaderFooter('..');

