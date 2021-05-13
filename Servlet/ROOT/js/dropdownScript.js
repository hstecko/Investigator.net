//there are two jQuery version used by this site. Our base html template uses v1 but some of our components use v3
//to solve this versioning issue, we create jquery v3 alias of jq3$
var descriptionJson = {"Top Institutional Holdings":"Top Institutional Holdings Goes Here", 
"Top Retail Holdings":"Top Retail Holdings Goes Here",
"Most Popular This Quarter":"Most Popular This Quarter Goes Here",
"Least Popular This Quarter":"Least Popular This Quarter Goes Here",
"Most Popular This Year":"Most Popular This Year Goes Here",
"Least Popular This Year":"Least Popular This Year Goes Here",
}


//maps options onto a li menu
jq3$("ul.leaderboards").append(jq3$("select").html().replaceAll("option","li"));
var originalMenu = jq3$("ul.leaderboards").clone();
Object.freeze(originalMenu);
console.log("Here")

//opens upon the menu when the button is clicked
jq3$(document).on('click', '.select-menu', function(e) {
    let menu = jq3$(this);
    if(!menu.hasClass('open')) {
        menu.addClass('open');
    }
});


//Handles the translation when a new menu option is selected
jq3$(document).on('click', '.select-menu ul li', function(e) {

    let li = jq3$(this),
        description = jq3$(".hero-content .wrapper p")
        menu = li.parent().parent(),
        select = menu.children('select'),
        selected = select.find('option:selected'),
        index = li.index();
    
    menu.css('--t', index* -41 + 'px');
    selected.attr('selected', false);
    select.find("option:contains("+li.text()+")").attr('selected', true);
    description.text(descriptionJson[li.text()]);
    menu.addClass(index > selected.index() ? 'tilt-down' : 'tilt-up');

    jq3$('div.button').html(li.text() + '<i class="fa fa-angle-down"></i>');
  
    setTimeout(() => {
        menu.removeClass('open tilt-up tilt-down');
    }, 500);
    setTimeout(() => {
        menu.css('--t', 0 + 'px');
        console.log(originalMenu)
        var newMenu = originalMenu.clone();
        newMenu.find("li:contains("+li.text()+")").remove();
        console.log(newMenu)
        newMenu.prepend(li);
        console.log(newMenu)
        jq3$("ul.leaderboards").replaceWith(newMenu);
       // li.parent().find('li').css("display","list-item");
       // li.css("display","none");
    }, 700);
//retrieve original list
//append selected li at top of ul    
//delete existing li

});

//if you click off the element when it's open, it shrinks back up
jq3$(document).click(e => {
    e.stopPropagation();
    if(jq3$('.select-menu').has(e.target).length === 0) {
        jq3$('.select-menu').removeClass('open');
    }
})


/*jq3$( function() {
 
    jq3$( "#selectField" )
      .selectmenu()
      .selectmenu( "menuWidget" )
        .addClass( "overflow" );
 
  } );*/