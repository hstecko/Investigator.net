

// getting all required elements
const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const icon = searchWrapper.querySelector(".icon");
let linkTag = searchWrapper.querySelector("a");
let webLink;

icon.onclick = ()=>{executeSearch()}
loadExistingTags();

// if user press any key and release
inputBox.onkeyup = (e)=>{
    let userData = e.target.value; //user enetered data
    let emptyArray = [];
    if (event.keyCode === 13) {
        createTag(userData);
    }
    if(userData){
        icon.onclick = ()=>{executeSearch()}
        emptyArray = suggestions.filter((data)=>{
            //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
            return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase()); 
        });
        emptyArray = emptyArray.map((data)=>{
            // passing return data inside li tag
            return data = '<li>'+ data +'</li>';
        });
        searchWrapper.classList.add("active"); //show autocomplete box
        showSuggestions(emptyArray);
        let allList = suggBox.querySelectorAll("li");
        for (let i = 0; i < allList.length; i++) {
            //adding onclick attribute in all li tag
            allList[i].setAttribute("onclick", "select(this)");
        }
    }else{
        searchWrapper.classList.remove("active"); //hide autocomplete box
    }
}


function select(element){
    let selectData = element.textContent;
    //inputBox.value = selectData;
    createTag(selectData);
    icon.onclick = ()=>{executeSearch()}
    searchWrapper.classList.remove("active");
}

function showSuggestions(list){
    let listData;
    if(!list.length){
        userValue = inputBox.value;
        listData = '<li>'+ userValue +'</li>';
    }else{
        listData = list.join('');
    }
    suggBox.innerHTML = listData;
}

//Retrieves cookies and requets paramterized url
function executeSearch(){
    cookie = getCookie("institutions")
    cookie = cookie.slice(5,cookie.length);
    webLink = "https://www.google.com/search?q=" + cookie;
    linkTag.setAttribute("href", webLink);
    linkTag.click();
}

function tagClicked(tag){
    setCookie("institutions", getCookie("institutions").replace("-"+createCookieID(suggestions.indexOf(tag.textContent)),""));
    tag.remove();
}

function loadExistingTags(){
    var desiredInstitutions = getDesiredInstitutions()
    for(var i = 0; i < desiredInstitutions.length; i++) {
        var anchor = document.createElement('a');
        var list = document.querySelector("ul.tags");
        var li = document.createElement('li');
        anchor.href = '#';
        anchor.innerText = desiredInstitutions[i];
        anchor.className = "tag";
        li.addEventListener("click", function () {tagClicked(this)});
        li.appendChild(anchor);
        list.appendChild(li);
    }
}

//Add new tag below search bar and embed cookie
function createTag(userData){
    var tagLocation = suggestions.indexOf(userData)
    if(tagLocation != -1){
        var anchor = document.createElement('a');
        var list = document.querySelector("ul.tags");
        var li = document.createElement('li');
        anchor.href = '#';
        anchor.innerText = userData;
        anchor.className = "tag";
        li.addEventListener("click", function () {tagClicked(this)});
        li.appendChild(anchor);
        list.appendChild(li);
        inputBox.value = "";
        setCookie("institutions", getCookie("institutions")+"-"+createCookieID(tagLocation))
    }
}

function createCookieID(index){
    return String.fromCharCode(Math.floor(index/58/58)+65) + String.fromCharCode(Math.floor(index/58)%58+65) + String.fromCharCode(index%58+65);
}

function decodeCookieID(id){
    return suggestions[(id.charCodeAt(0)-65)*58*58 + (id.charCodeAt(1)-65)*58 + (id.charCodeAt(2)-65)];
}

function setCookie(name, value) {
    var desiredAge = 6*30*24*60*60;
    var cookie = name + "=" + value + "; path=" + location.pathname + "; max-age=" + desiredAge;
    document.cookie = cookie;
}

function getCookie(name) {
    // Split cookie string and get all individual name=value pairs in an array
    var cookieArr = document.cookie.split(";");
    
    // Loop through the array elements
    for(var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split("=");
        
        /* Removing whitespace at the beginning of the cookie name
        and compare it with the given string */
        if(name == cookiePair[0].trim()) {
            // Decode the cookie value and return
            return cookiePair[1];
        }
    }
    // Return null if not found
    return null;
}



function getDesiredInstitutions(){
    var cookie = getCookie("institutions") 
    //if there are no saved institutions to load, load a default. 
    var desiredInstitutions = ((cookie == "null") ? "-AAA" : cookie).split("-");
    for(var i = 0; i < desiredInstitutions.length; i++) {
        desiredInstitutions[i] = decodeCookieID(desiredInstitutions[i]);
    }
    console.log(getCookie("institutions"))
    console.log(getCookie("institutions") || "-AAA");
    console.log(desiredInstitutions);
    console.log(desiredInstitutions.slice(1,desiredInstitutions.length));
    return desiredInstitutions.slice(1,desiredInstitutions.length);
}

