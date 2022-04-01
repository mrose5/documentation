loadResourceAsync('/API/aapi-schema', {returntype: 'json'})
  .then(schema => {
    schema = schema['AAPI_schema']
    delete schema['__schema^2__']
    const keys = Object.keys(schema).sort((a,b) => {
      return ((a.toLowerCase() > b.toLowerCase())?1:-1);
    });

    let indexLett = '!';
    let alphabet = String.fromCharCode(...Array(91).keys()).slice(65);
    let phantomHTML = ''; 
    for (let character of alphabet) {
      phantomHTML += '<button class="nav-buttons" id= "gloss_button_' + character + '" disabled>' + character + '</button>';
    }
    document.getElementById('nav_bar_restapi').innerHTML = phantomHTML;
    phantomHTML = '';


    document.getElementById('topButton').addEventListener('click', function() {
      document.getElementById('restapi').scrollTo({top: 0, behavior: "smooth"})
    }, false);

    function showHideCard(indexLett) {
      keys.forEach(keyword => {
        showCard = document.getElementById(keyword);

        if(keyword.charAt(0).toUpperCase() == indexLett) {
          showCard.style.display = 'block';
        } else {
          showCard.style.display = 'hidden';
        }
        });
      console.log(document.getElementById(keyword));
    }


    keys.forEach(keyword => {
      
      if(schema[keyword]["status"] !== "production") return;  
  
      const phantomType = schema[keyword]["type"]?'<li><b>Type:</b> ' + schema[keyword]["type"] + '</li>':'';

      const phantomUnits = schema[keyword]["units"]? '<li><b>Units:</b> ' + schema[keyword]["units"] + '</li>':'';
      
      const phantomExample = schema[keyword]["example"]?'<li><b>Example:</b> ' + schema[keyword]["example"] + '</li>':'';
      
      const phantomSyntax = schema[keyword]["syntax"]?'<li><b>Syntax:</b> <code>' + schema[keyword]["syntax"] + '</code> </li>':'';      

      phantomHTML += 
        '<div class="restapi-keyword-container keyword-' + keyword[0].toLowerCase() + '" id="' + keyword + '">'
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
      

      let showCard;
      if (indexLett != keyword.charAt(0).toUpperCase()) {
         indexLett = keyword.charAt(0).toUpperCase();
         let bttnIndexLett = document.getElementById('gloss_button_' + indexLett);
         bttnIndexLett.disabled = false;
         bttnIndexLett.addEventListener('click', function(evt) {
           let cards = document.getElementsByClassName("restapi-keyword-container");
           for (var i = 0; i < cards.length; i++) {
             showCard = cards.item(i);
             if(showCard.id.charAt(0).toUpperCase() == evt.target.id.slice(-1)) {
               showCard.style.display = 'block';
             } else {
               showCard.style.display = 'none';
             }
           }
        }, false);
      }
    });
  document.getElementById('keyword_card_container').innerHTML = phantomHTML;
});
buildHeaderFooter('..');
