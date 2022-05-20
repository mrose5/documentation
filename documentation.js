loadResourceAsync('/API/aapi-schema', {returntype: 'json'})
  .then(schema => {
    schema = schema['AAPI_schema']
    delete schema['__schema^2__']
    const keys = Object.keys(schema).sort((a,b) => (a.toLowerCase() > b.toLowerCase())?1:-1)
    let alphabet = String.fromCharCode(...Array(91).keys()).slice(65);
    let tempHTML = ''; 
    for (let character of alphabet) {
      tempHTML += '<input type = "radio" class="nav-buttons" id= "glossary_button_' + character + '" name="nav-bar" disabled>' 
      + '<label for="glossary_button_' + character + '" id="button_label_' + character + '" disabled>' + character + '</label>' 
      + '<div class="label-content" id="keywords_' + character + '"></div>';
    }
    document.getElementById('nav_bar_restapi').innerHTML += tempHTML;
    tempHTML = '';


    document.getElementById('top_button_restapi').addEventListener('click', function() {
     scrollToY(0, 4000, 'easeOutSine');
    }, false);

    keys.forEach(keyword => {
      
      if(schema[keyword]["status"] !== "production") return;  

      tempHTML = 
        '<div class="restapi-keyword-container keyword-' + keyword[0].toUpperCase() + '" id="' + keyword + '">'
         +   '<h2 class="restapi-keyword-styling">' + keyword + '</h2>'
         +   '<dl>' 
         +     '<dt>' + schema[keyword]["title"] + '</dt>' 
         +     '<dd>' 
         +       '<ul>' 
         +         '<li><b>Description:</b> ' + schema[keyword]["description"] + '</li>' 
         +         '<li><b>Type:</b> ' + schema[keyword]["type"] + '</li>'
         +         '<li><b>Units:</b> ' + schema[keyword]["units"] + '</li>' 
         +         '<li><b>Example:</b> ' + schema[keyword]["example"] + '</li>'
         +         '<li><b>Syntax:</b> <code>' + schema[keyword]["syntax"] + '</code> </li>' 
         +       '</ul>' 
         +     '</dd>' 
         +     '</dl>' 
         + '</div>';
      document.getElementById("keywords_" + keyword[0].toUpperCase()).innerHTML += tempHTML;
      document.getElementById("keywords_search").innerHTML += tempHTML;
      document.getElementById("glossary_button_" + keyword[0].toUpperCase()).disabled = false;
      document.getElementById("button_label_" + keyword[0].toUpperCase()).disabled = false;
    });
   document.getElementById("glossary_button_A").checked = true;
});

let buttonMemory = '';
document.getElementById("keyword_search_clear").addEventListener("search", function(event) {
    document.getElementById(buttonMemory).checked = true;
});

document.getElementById("keyword_search_clear").addEventListener("click",function() {
  document.getElementById("restapi_search").value="";
  document.getElementById(buttonMemory).checked = true;
});

function Search() {
  let radioFound = document.querySelector('input[name="nav-bar"]:checked');
  let input = document.getElementById("restapi_search").value.toLowerCase();
  let containerArray = document.getElementById("keywords_search").children;
  let length = document.getElementById("restapi_search").value.length;
  console.log(containerArray);
  console.log(input);

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

document.getElementById("restapi_search").addEventListener("keyup",Search);
buildHeaderFooter('..');
