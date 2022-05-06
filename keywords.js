loadResourceAsync('/API/aapi-schema', {returntype: 'json'})
  .then(schema => {
    schema = schema['AAPI_schema']
    delete schema['__schema^2__']
    const keys = Object.keys(schema).sort((a,b) => {
      return ((a.toLowerCase() > b.toLowerCase())?1:-1);
    });

    let alphabet = String.fromCharCode(...Array(91).keys()).slice(65);
    let phantomHTML = ''; 
    for (let character of alphabet) {
      phantomHTML += '<input type = "radio" class="nav-buttons" id= "gloss_button_' + character + '" name="nav-bar" disabled>' 
      + '<label for="gloss_button_' + character + '" id="bttn_label_' + character + '" disabled>' + character + '</label>' 
      + '<div class="label-content" id="keywords_' + character + '"></div>';
    }
    document.getElementById('nav_bar_restapi').innerHTML += phantomHTML;
    phantomHTML = '';


    document.getElementById('topButton').addEventListener('click', function() {
      document.documentElement.scrollTo({top: 0, behavior: 'smooth'});
      console.log("scroll");
    }, false);

    keys.forEach(keyword => {
      
      if(schema[keyword]["status"] !== "production") return;  
  
      const phantomType = schema[keyword]["type"]?'<li><b>Type:</b> ' + schema[keyword]["type"] + '</li>':'';

      const phantomUnits = schema[keyword]["units"]? '<li><b>Units:</b> ' + schema[keyword]["units"] + '</li>':'';
      
      const phantomExample = schema[keyword]["example"]?'<li><b>Example:</b> ' + schema[keyword]["example"] + '</li>':'';
      
      const phantomSyntax = schema[keyword]["syntax"]?'<li><b>Syntax:</b> <code>' + schema[keyword]["syntax"] + '</code> </li>':'';      

      phantomHTML = 
        '<div class="restapi-keyword-container keyword-' + keyword[0].toUpperCase() + '" id="' + keyword + '">'
         +   '<h2 class="restapi-keyword-styling">' + keyword + '</h2>'
         +   '<dl>' 
         +     '<dt>' + schema[keyword]["title"] + '</dt>' 
         +     '<dd>' 
         +       '<ul>' 
         +         '<li><b>Description:</b> ' + schema[keyword]["description"] + '</li>' 
         +         phantomType
         +         phantomUnits 
         +         phantomExample
         +         phantomSyntax 
         +       '</ul>' 
         +     '</dd>' 
         +     '</dl>' 
         + '</div>';
      document.getElementById("keywords_" + keyword[0].toUpperCase()).innerHTML += phantomHTML;
      document.getElementById("keywords_search").innerHTML += phantomHTML;
      document.getElementById("gloss_button_" + keyword[0].toUpperCase()).disabled = false;
      document.getElementById("bttn_label_" + keyword[0].toUpperCase()).disabled = false;
    });
   document.getElementById("gloss_button_A").checked = true;
});

let buttonMemory = '';
document.getElementById("restapi-search").addEventListener("search", function(event) {
    document.getElementById(buttonMemory).checked = true;
    console.log(buttonMemory);
});

function Search() {
  let radioFound = document.querySelector('input[name="nav-bar"]:checked');
  let input = document.getElementById("restapi-search").value.toLowerCase();
  let containerArray = document.getElementById("keywords_search").children;
  let length = document.getElementById("restapi-search").value.length;
  console.log(containerArray);
  console.log(input);

  if(radioFound.id != "button_search") {
    buttonMemory = radioFound.id;
  }
  
  console.log(buttonMemory);
  
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

buildHeaderFooter('..');
